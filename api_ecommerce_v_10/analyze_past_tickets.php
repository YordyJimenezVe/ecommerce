require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\SupportTicket;
use App\Models\TicketAiAnalysis;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

$apiKey = env('GEMINI_API_KEY') ?? env('OPENAI_API_KEY');

if (!$apiKey) {
echo "ERROR: GEMINI_API_KEY not configured in .env!\n";
exit;
}

echo "API Key found: " . substr($apiKey, 0, 10) . "...\n\n";

$closedTickets = SupportTicket::where('status', 'closed')
->whereDoesntHave('aiAnalysis')
->with('messages')
->get();

echo "Found {$closedTickets->count()} closed tickets without analysis.\n\n";

if ($closedTickets->isEmpty()) {
echo "Nothing to analyze. Checking if any tickets exist...\n";
$all = SupportTicket::all();
foreach ($all as $t) {
echo "Ticket #{$t->id}: status={$t->status}\n";
}
exit;
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

foreach ($closedTickets as $ticket) {
echo "--- Analyzing Ticket #{$ticket->id} ---\n";

if ($ticket->messages->isEmpty()) {
echo "No messages found. Skipping.\n\n";
continue;
}

$conversation = $ticket->messages->map(function ($msg) {
$role = $msg->is_from_staff ? 'Agente' : 'Cliente';
return "[{$role}]: {$msg->message}";
})->implode("\n");

echo "Conversation:\n{$conversation}\n\n";

$prompt = "Eres un analista de calidad de servicio al cliente para Megarys.\n"
. "Analiza la siguiente conversación de soporte y responde SOLO con JSON válido con estas claves:\n"
. "staff_rating (1-5), treated_poorly (bool), poor_treatment_reason (string|null), "
. "main_issue (string), resolved (string: sí/no/parcialmente), summary (string 2 frases)\n\n"
. "Conversación:\n{$conversation}";

$body = ['contents' => [['parts' => [['text' => $prompt]]]]];

echo "Calling Gemini API...\n";
$response = Http::timeout(20)->post($url, $body);

if ($response->failed()) {
echo "HTTP Error {$response->status()}: " . substr($response->body(), 0, 200) . "\n\n";
if ($response->status() === 429) {
echo "Rate limited! Sleeping 30s...\n";
sleep(30);
}
continue;
}

$raw = $response->json('candidates.0.content.parts.0.text', '{}');
$clean = preg_replace('/```json\s*|\s*```/', '', $raw);
$data = json_decode($clean, true);

if (!$data) {
echo "Failed to parse JSON. Raw: {$raw}\n\n";
continue;
}

echo "AI Result: staff_rating={$data['staff_rating']}, treated_poorly=" . ($data['treated_poorly'] ? 'YES ⚠️' : 'NO') .
"\n";

$saved = TicketAiAnalysis::updateOrCreate(
['ticket_id' => $ticket->id],
[
'staff_rating' => $data['staff_rating'] ?? null,
'treated_poorly' => $data['treated_poorly'] ?? false,
'poor_treatment_reason' => $data['poor_treatment_reason'] ?? null,
'main_issue' => $data['main_issue'] ?? null,
'resolved' => $data['resolved'] ?? null,
'summary' => $data['summary'] ?? null,
'analyzed_at' => now(),
]
);

echo "Saved analysis ID: {$saved->id}\n\n";
sleep(2); // brief pause between tickets to avoid rate limits
}

$count = TicketAiAnalysis::count();
echo "Done. Total analyses in DB: {$count}\n";