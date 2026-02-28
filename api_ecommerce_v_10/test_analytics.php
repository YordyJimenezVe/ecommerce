<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'yordyalejandro13@gmail.com')->first();
if (!$user) {
    echo "User not found\n";
    exit;
}

$roleName = $user->role ? strtolower($user->role->name) : '';
$isSuperAdmin = in_array($roleName, ['super_admin', 'administrador general', 'soporte', 'support']) || strtolower($user->email) === 'yordyalejandro13@gmail.com';
$isCompanyAdmin = strtolower($roleName) === strtolower('ADMINISTRADOR DE EMPRESA');

echo "Role: " . $roleName . "\n";
echo "isSuperAdmin: " . ($isSuperAdmin ? 'true' : 'false') . "\n";
echo "isCompanyAdmin: " . ($isCompanyAdmin ? 'true' : 'false') . "\n";

try {
    $request = Illuminate\Http\Request::create('/api/admin/tickets/analytics', 'GET');
    // We would need to pass this via controller to test, but let's test directly running the controller logic for this user.
    $controller = new App\Http\Controllers\Support\SupportTicketController();

    // Simulate auth
    auth()->login($user);

    $response = $controller->analytics($request);
    echo "Response status: " . $response->getStatusCode() . "\n";
    $content = $response->getContent();
    echo "Response length: " . strlen($content) . "\n";
    if ($response->getStatusCode() >= 400) {
        echo "Response: " . $content . "\n";
    }
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
