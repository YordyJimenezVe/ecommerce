<?php

$req = new Illuminate\Http\Request(['email' => 'yordyalejandro13@gmail.com']);
$res = (new App\Http\Controllers\Auth\PasswordResetController)->sendResetLinkEmail($req);
echo $res->getContent();
