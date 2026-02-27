<?php
$emails = ['analista@megarys.com', 'cliente@megarys.com', 'vendedor@megarys.com'];
$users = App\Models\User::whereIn('email', $emails)->get();
foreach ($users as $user) {
    $user->password = '12345678';
    $user->save();
}
echo "Passwords updated successfully.\n";
