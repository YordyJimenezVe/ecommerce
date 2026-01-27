<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->string('payment_proof')->nullable()->after('total');
            $table->string('payment_status')->default('PAID_PENDING')->comment('PAID_PENDING, PAID_APPROVED, PAID_REJECTED')->after('payment_proof');
            $table->text('rejection_reason')->nullable()->after('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn(['payment_proof', 'payment_status', 'rejection_reason']);
        });
    }
};
