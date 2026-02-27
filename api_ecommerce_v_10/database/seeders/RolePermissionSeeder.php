<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Crear Permisos
        $permissions = [
            ['name' => 'Ver Ventas Globales', 'slug' => 'view_global_sales', 'description' => 'Permite ver las ventas de todas las compañías'],
            ['name' => 'Ver Lapsos Globales', 'slug' => 'view_global_lapses', 'description' => 'Permite ver los pagos y vencimientos de todas las compañías'],
            ['name' => 'Gestionar Compañías', 'slug' => 'manage_companies', 'description' => 'Permite crear, editar y eliminar compañías'],
            ['name' => 'Gestionar Usuarios Propios', 'slug' => 'manage_own_users', 'description' => 'Permite crear, editar y eliminar usuarios de su misma compañía'],
            ['name' => 'Gestionar Roles Propios', 'slug' => 'manage_own_roles', 'description' => 'Permite crear y asignar roles dentro de su compañía'],
            ['name' => 'Gestionar Productos', 'slug' => 'manage_products', 'description' => 'Permite gestionar productos del catálogo'],
            ['name' => 'Ver Ventas Propias', 'slug' => 'view_own_sales', 'description' => 'Permite ver las ventas de su compañía'],
        ];

        foreach ($permissions as $perm) {
            Permission::updateOrCreate(['slug' => $perm['slug']], $perm);
        }

        // 2. Obtener / Crear Roles
        $adminGeneral = Role::firstOrCreate(['name' => 'ADMINISTRADOR GENERAL']);
        $adminCompany = Role::firstOrCreate(['name' => 'ADMINISTRADOR DE EMPRESA']);
        $analistaGeneral = Role::firstOrCreate(['name' => 'ANALISTA GENERAL']);
        $vendedor = Role::firstOrCreate(['name' => 'VENDEDOR / STAFF']);
        $cliente = Role::firstOrCreate(['name' => 'CLIENTE']);

        // 3. Asignar Permisos a Roles
        $adminGeneral->permissions()->sync(Permission::all());
        $analistaGeneral->permissions()->sync(Permission::whereIn('slug', ['view_global_sales', 'view_global_lapses'])->pluck('id'));
        $adminCompany->permissions()->sync(Permission::whereIn('slug', ['manage_own_users', 'manage_own_roles', 'manage_products', 'view_own_sales'])->pluck('id'));
        $vendedor->permissions()->sync(Permission::whereIn('slug', ['manage_products', 'view_own_sales'])->pluck('id'));
        // El cliente no tiene permisos de panel de control, por lo que no se le asignan.

        // 4. Crear Usuarios de Prueba
        // Usamos la contraseña default 12345678 (el modelo User la encriptará por su mutator)

        User::firstOrCreate(
            ['email' => 'admin@megarys.com'],
            [
                'name' => 'Admin',
                'surname' => 'General',
                'password' => '12345678',
                'role_id' => $adminGeneral->id,
                'state' => 1
            ]
        );

        User::firstOrCreate(
            ['email' => 'analista@megarys.com'],
            [
                'name' => 'Analista',
                'surname' => 'General',
                'password' => '12345678',
                'role_id' => $analistaGeneral->id,
                'state' => 1
            ]
        );

        User::firstOrCreate(
            ['email' => 'cliente@megarys.com'],
            [
                'name' => 'Cliente',
                'surname' => 'Prueba',
                'password' => '12345678',
                'role_id' => $cliente->id,
                'state' => 1
            ]
        );

        $company = Company::first();
        if ($company) {
            User::firstOrCreate(
                ['email' => 'vendedor@megarys.com'],
                [
                    'name' => 'Vendedor',
                    'surname' => 'Staff',
                    'password' => '12345678',
                    'role_id' => $vendedor->id,
                    'company_id' => $company->id,
                    'state' => 1
                ]
            );
        }
    }
}
