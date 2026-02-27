<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Get admin user  
$user = App\Models\User::where('role_id', 1)->first();
echo "Admin: {$user->email} ID:{$user->id}\n";

// Get JWT token
$token = auth('api')->login($user);
echo "Token: {$token}\n";

// Check AI analyses in DB
$aiCount = App\Models\TicketAiAnalysis::count();
echo "\n=== AI Analysis Stats ===\n";
echo "Total AI analyses: {$aiCount}\n";

if ($aiCount > 0) {
    $poorTreatment = App\Models\TicketAiAnalysis::where('treated_poorly', 1)->orWhere('treated_poorly', true)->count();
    $avgRating = round(App\Models\TicketAiAnalysis::avg('staff_rating'), 2);
    echo "Avg staff rating: {$avgRating}/5\n";
    echo "Poor treatment detected: {$poorTreatment}\n";

    $recent = App\Models\TicketAiAnalysis::with('ticket:id,subject')
        ->orderByDesc('analyzed_at')
        ->limit(5)
        ->get(['ticket_id', 'staff_rating', 'treated_poorly', 'resolved', 'summary', 'analyzed_at', 'poor_treatment_reason']);

    echo "\n=== Recent AI Summaries ===\n";
    foreach ($recent as $a) {
        $ticket = $a->ticket ? "#{$a->ticket->id} {$a->ticket->subject}" : "Ticket #{$a->ticket_id}";
        echo "  {$ticket}\n";
        echo "    Rating: {$a->staff_rating}/5 | Resolved: {$a->resolved} | Poor treatment: " . ($a->treated_poorly ? 'YES' : 'no') . "\n";
        echo "    Summary: {$a->summary}\n";
        if ($a->treated_poorly && $a->poor_treatment_reason) {
            echo "    ⚠️ Reason: {$a->poor_treatment_reason}\n";
        }
        echo "\n";
    }
} else {
    echo "\nNo AI analyses found. Checking for closed tickets...\n";
    $closedTickets = App\Models\SupportTicket::where('status', 'closed')->with('messages')->get();
    echo "Closed tickets: " . $closedTickets->count() . "\n";

    if ($closedTickets->count() > 0) {
        echo "Testing AI analysis on first closed ticket...\n";
        $ticket = $closedTickets->first();
        echo "Ticket #{$ticket->id}: {$ticket->subject} ({$ticket->messages->count()} messages)\n";
    }
}

// Test Gemini API key
echo "\n=== Gemini API Key Check ===\n";
$apiKey = env('GEMINI_API_KEY');
echo "Key configured: " . ($apiKey ? 'YES (' . substr($apiKey, 0, 10) . '...)' : 'NO') . "\n";

// Quick API connectivity test
if ($apiKey) {
    echo "Testing Gemini API connectivity...\n";
    try {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
        $body = ['contents' => [['parts' => [['text' => 'Respond with just "OK"']]]]];
        $response = Illuminate\Support\Facades\Http::timeout(10)->post($url, $body);
        $text = $response->json('candidates.0.content.parts.0.text', 'NO RESPONSE');
        echo "API Response: " . trim($text) . "\n";
        echo "Status: " . $response->status() . "\n";
        if ($response->status() !== 200) {
            echo "Error body: " . $response->body() . "\n";
        }
    } catch (Exception $e) {
        echo "ERROR: " . $e->getMessage() . "\n";
    }
}

// Check open tickets for potential test
$allTickets = App\Models\SupportTicket::selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status');
echo "\n=== Ticket Distribution ===\n";
foreach ($allTickets as $status => $count) {
    echo "  {$status}: {$count}\n";
}
