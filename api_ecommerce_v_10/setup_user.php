<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::where('email', 'yordyalejandro13@gmail.com')->first();
if ($user) {
    if (!App\Models\User::where('email', 'yordyalejandro_14@hotmail.com')->exists()) {
        $newUser = $user->replicate();
        $newUser->email = 'yordyalejandro_14@hotmail.com';
        $newUser->save();
        echo "User replicated.\n";
    } else {
        echo "User already exists.\n";
    }
} else {
    echo "Source user not found.\n";
}
