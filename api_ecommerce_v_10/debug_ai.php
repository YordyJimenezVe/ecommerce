<?php
use App\Models\SupportTicket;
use App\Models\TicketAiAnalysis;
use Illuminate\Support\Facades\Http;

$ticketId = SupportTicket::latest('closed_at')->value('id');
if (!$ticketId) {
    echo "No closed tickets found.\n";
    exit;
}

$ticket = SupportTicket::with('messages')->find($ticketId);
echo "Analyzing Ticket #{$ticket->id}...\n";

$apiKey = env('GEMINI_API_KEY') ?? env('OPENAI_API_KEY');
if (!$apiKey) {
    echo "ERROR: No API Key found in .env\n";
    exit;
}

$conversation = $ticket->messages->map(function ($msg) {
    $role = $msg->is_from_staff ? 'Agente' : 'Cliente';
    return "[{$role}]: {$msg->message}";
})->implode("\n");

$prompt = "Eres un analista de calidad de servicio al cliente para Megarys.\n"
    . "Analiza la siguiente conversación de soporte y responde SOLO con JSON válido con estas claves:\n"
    . "staff_rating (1-5), treated_poorly (bool), poor_treatment_reason (string|null), "
    . "main_issue (string), resolved (string: sí/no/parcialmente), summary (string 2 frases)\n\n"
    . "Conversación:\n{$conversation}";

echo "Prompt sent to AI...\n";
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";
$body = ['contents' => [['parts' => [['text' => $prompt]]]]];

$response = Http::timeout(20)->post($url, $body);

if ($response->failed()) {
    echo "HTTP Error: " . $response->status() . " - " . $response->body() . "\n";
    exit;
}

$raw = $response->json('candidates.0.content.parts.0.text', '{}');
echo "AI Raw Result: {$raw}\n";

$cleanJson = preg_replace('/```json\s*|\s*```/', '', $raw);
$data = json_decode($cleanJson, true);

if (!$data) {
    echo "ERROR: Could not decode JSON. Raw output was: {$raw}\n";
    exit;
}

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

echo "SUCCESS! Result saved to DB.\n";
echo "Treated Poorly: " . ($saved->treated_poorly ? 'YES ⚠️' : 'NO') . "\n";
echo "Reason: " . ($saved->poor_treatment_reason ?? 'None') . "\n";
