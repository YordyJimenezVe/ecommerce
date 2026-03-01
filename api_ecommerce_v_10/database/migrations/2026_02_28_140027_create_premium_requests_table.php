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
        Schema::create('premium_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Quién lo solicita
            $table->string('module'); // ai_studio, support_analytics, multiple
            $table->string('payment_method'); // paypal, transfer, etc.
            $table->string('payment_proof')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency', 10)->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->integer('duration_months')->nullable(); // Llenado por el admin
            $table->text('admin_notes')->nullable(); // Llenado por el admin al aprobar/rechazar
            $table->bigInteger('approved_by')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('premium_requests');
    }
};
