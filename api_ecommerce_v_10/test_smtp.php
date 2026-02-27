<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    Illuminate\Support\Facades\Mail::raw('This is a test email to verify SMTP configuration to Gmail.', function ($msg) {
        $msg->to('yordyalejandro13@gmail.com')->subject('Test SMTP Laravel to Gmail');
    });
    echo "SUCCESS: Email sent via Laravel Mail facade to Gmail.\n";
} catch (\Exception $e) {
    echo "ERROR Laravel Mail: " . $e->getMessage() . "\n";
}
