<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate existing sliders
        DB::table('sliders')->truncate();

        $sliders = [
            [
                'name' => 'Innovative Technology',
                'imagen' => 'sliders/megarys_slider_1.png',
                'url' => 'https://megarys.com/technology',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smart Future',
                'imagen' => 'sliders/megarys_slider_2.png',
                'url' => 'https://megarys.com/future',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Digital Experience',
                'imagen' => 'sliders/megarys_slider_3.png',
                'url' => 'https://megarys.com/experience',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('sliders')->insert($sliders);
    }
}
