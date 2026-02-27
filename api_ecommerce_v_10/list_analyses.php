<?php
$a = App\Models\TicketAiAnalysis::all();
echo "Count in DB: " . $a->count() . "\n";
foreach ($a as $x) {
    echo "ID: {$x->id} | Ticket: {$x->ticket_id} | Rating: {$x->staff_rating} | Poor: " . ($x->treated_poorly ? 'YES' : 'NO') . " | Status: {$x->resolved}\n";
}
