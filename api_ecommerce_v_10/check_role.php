<?php
$u = App\Models\User::where('email', 'yordyalejandro13@gmail.com')->with('role')->first();
echo "Name: " . $u->name . PHP_EOL;
echo "Role: " . ($u->role ? $u->role->name : 'none') . PHP_EOL;
echo "company_id: " . $u->company_id . PHP_EOL;
