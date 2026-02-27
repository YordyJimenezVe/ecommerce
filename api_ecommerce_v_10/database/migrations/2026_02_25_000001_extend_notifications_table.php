<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Who sent it (admin user)
            $table->unsignedBigInteger('sent_by')->nullable()->after('user_id');
            $table->foreign('sent_by')->references('id')->on('users')->onDelete('set null');

            // If notification was sent to a whole company (broadcast)
            $table->unsignedBigInteger('company_id')->nullable()->after('sent_by');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');

            // Extra JSON data (ticket_id, order_id, etc.)
            $table->json('data')->nullable()->after('link');

            // Icon/color for UI
            $table->string('icon')->nullable()->after('type');   // e.g. 'fas fa-bell'
            $table->string('color')->nullable()->after('icon');  // e.g. '#6366f1'
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['sent_by']);
            $table->dropForeign(['company_id']);
            $table->dropColumn(['sent_by', 'company_id', 'data', 'icon', 'color']);
        });
    }
};
