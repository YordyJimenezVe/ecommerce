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
        Schema::create('company_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('payment_proof')->nullable(); // Imagen del comprobante
            $table->enum('payment_method', ['transfer', 'cash', 'free'])->default('free');
            $table->text('reason')->nullable(); // Razón si es gratis
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('type', ['initial', 'renewal'])->default('initial');
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->date('membership_expires_at')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_payments');
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('membership_expires_at');
        });
    }
};
