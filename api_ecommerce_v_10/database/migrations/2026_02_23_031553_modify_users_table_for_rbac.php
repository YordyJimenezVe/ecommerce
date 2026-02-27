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
        // Migrate existing customers to 'CLIENTE' role
        $clienteRole = \Illuminate\Support\Facades\DB::table('roles')->where('name', 'CLIENTE')->first();
        if (!$clienteRole) {
            $clienteRoleId = \Illuminate\Support\Facades\DB::table('roles')->insertGetId([
                'name' => 'CLIENTE',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            $clienteRoleId = $clienteRole->id;
        }

        \Illuminate\Support\Facades\DB::table('users')
            ->whereNull('role_id')
            ->update(['role_id' => $clienteRoleId]);

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'type_user')) {
                $table->dropColumn('type_user');
            }
            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('customer');
            $table->tinyInteger('type_user')->unsigned()->default(1);
            $table->dropForeign(['role_id']);
        });
    }
};
