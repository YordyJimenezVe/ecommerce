<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('system_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // Who did it
            $table->unsignedBigInteger('company_id')->nullable(); // Related company
            $table->string('action'); // e.g., 'AUTHORIZED_FREE_SHIPPING', 'CHANGED_PAYMENT_CONFIG'
            $table->text('description')->nullable();
            $table->json('metadata')->nullable(); // Store details about the change
            $table->string('ip_address')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_logs');
    }
};
