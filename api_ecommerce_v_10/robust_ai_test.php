<?php
use App\Models\SupportTicket;
use App\Models\TicketAiAnalysis;
use Illuminate\Support\Facades\Http;

$ticketId = 3;
$ticket = SupportTicket::with('messages')->find($ticketId);
if (!$ticket) {
    echo "Ticket #3 not found.\n";
    exit;
}

echo "Starting robust analysis for Ticket #3...\n";

$apiKey = env('GEMINI_API_KEY');
$conversation = $ticket->messages->map(function ($msg) {
    $role = $msg->is_from_staff ? 'Agente' : 'Cliente';
    return "[{$role}]: {$msg->message}";
})->implode("\n");

$prompt = "Eres un analista de calidad de servicio al cliente para Megarys.\n"
    . "Analiza la siguiente conversación de soporte y responde SOLO con JSON válido con estas claves:\n"
    . "staff_rating (1-5), treated_poorly (bool), poor_treatment_reason (string|null), "
    . "main_issue (string), resolved (string: sí/no/parcialmente), summary (string 2 frases)\n\n"
    . "Conversación:\n{$conversation}";

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
$body = ['contents' => [['parts' => [['text' => $prompt]]]]];

$attempts = 0;
$maxAttempts = 5;
$success = false;

while ($attempts < $maxAttempts && !$success) {
    $attempts++;
    echo "Attempt #{$attempts}...\n";

    $response = Http::timeout(20)->post($url, $body);

    if ($response->successful()) {
        $raw = $response->json('candidates.0.content.parts.0.text', '{}');
        $cleanJson = preg_replace('/```json\s*|\s*```/', '', $raw);
        $data = json_decode($cleanJson, true);

        if ($data) {
            TicketAiAnalysis::updateOrCreate(
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
            echo "SUCCESS on attempt #{$attempts}!\n";
            $success = true;
        } else {
            echo "Failed to decode JSON on attempt #{$attempts}.\n";
        }
    } else {
        echo "HTTP Error {$response->status()} on attempt #{$attempts}.\n";
        if ($response->status() == 429) {
            echo "Rate limit hit. Sleeping 15 seconds...\n";
            sleep(15);
        } else {
            echo "Error: " . $response->body() . "\n";
            break;
        }
    }
}

if (!$success) {
    echo "Final failure after {$attempts} attempts.\n";
}
