<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'yordyalejandro13@gmail.com')->first();
try {
    $request = Illuminate\Http\Request::create('/api/admin/tickets/analytics', 'GET');
    $controller = new App\Http\Controllers\Support\SupportTicketController();
    auth()->login($user);
    $response = $controller->analytics($request);
    file_put_contents('test_error.txt', "Status: " . $response->getStatusCode() . "\n" . $response->getContent());
} catch (\Exception $e) {
    file_put_contents('test_error.txt', $e->getMessage() . "\n" . $e->getTraceAsString());
}
echo "Done\n";
