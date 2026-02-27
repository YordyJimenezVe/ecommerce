<?php
use App\Models\User;
use App\Http\Controllers\Admin\CompanyController;
use Illuminate\Http\Request;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = User::where('email', 'yordyalejandro13@gmail.com')->first();
if (!$user) {
    echo "User not found\n";
    exit;
}

echo "Testing as user: " . $user->email . "\n";
echo "Role Name: " . ($user->role ? $user->role->name : 'N/A') . "\n";

// Mock AUTH
auth('api')->login($user);

$controller = new CompanyController();
try {
    $response = $controller->index();
    echo "Response Status: " . $response->getStatusCode() . "\n";
    echo "Response Header: " . json_encode($response->headers->all()) . "\n";
    echo "Response Body: " . $response->getContent() . "\n";
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
