<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTenantFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Nullable because SuperAdmin and Customers might not belong to a "company" in the B2B sense
            // or SuperAdmin is global.
            $table->unsignedBigInteger('company_id')->nullable()->after('id');
            $table->string('role')->default('customer')->after('email'); // super_admin, company_admin, employee, customer

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn(['company_id', 'role']);
        });
    }
}
