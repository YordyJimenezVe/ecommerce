<?php

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CompanyTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 1. Create Test Company
        $company = Company::create([
            'name' => 'Tech Solutions Inc.',
            'slug' => 'tech-solutions',
            'email_contact' => 'admin@techsolutions.com',
            'description' => 'A leading provider of tech gadgets and software.',
            'status' => 'active'
        ]);

        // 2. Create Company Admin
        User::create([
            'name' => 'Admin Tech',
            'email' => 'admin@techsolutions.com',
            'password' => Hash::make('password'),
            'role' => 'company_admin',
            'company_id' => $company->id,
            'email_verified_at' => now(),
        ]);

        // 3. Create Employee
        User::create([
            'name' => 'Employee John',
            'email' => 'john@techsolutions.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'company_id' => $company->id,
            'email_verified_at' => now(),
        ]);

        $this->command->info('Test Company and Users created successfully.');
    }
}
