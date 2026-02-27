<?php
use App\Models\SupportTicket;
use App\Models\TicketAiAnalysis;

$latest = SupportTicket::latest('closed_at')->first();
if (!$latest) {
    echo "No closed tickets found.\n";
    exit;
}

echo "--- TICKET #{$latest->id} ---\n";
echo "Status: {$latest->status}\n";
echo "Closed at: {$latest->closed_at}\n";
echo "Messages:\n";
foreach ($latest->messages as $msg) {
    $role = $msg->is_from_staff ? 'STAFF' : 'CLIENT';
    echo "[{$role}]: {$msg->message}\n";
}

$analysis = TicketAiAnalysis::where('ticket_id', $latest->id)->first();
if ($analysis) {
    echo "\n--- AI ANALYSIS ---\n";
    echo "Staff Rating: {$analysis->staff_rating}\n";
    echo "Treated Poorly: " . ($analysis->treated_poorly ? 'YES ⚠️' : 'no') . "\n";
    echo "Reason: {$analysis->poor_treatment_reason}\n";
    echo "Main Issue: {$analysis->main_issue}\n";
    echo "Summary: {$analysis->summary}\n";
} else {
    echo "\nNO AI ANALYSIS FOUND FOR THIS TICKET.\n";
}
