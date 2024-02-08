<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for($i = 0 ; $i < 45 ; $i++){
            ProductType::create([
                'id' => $i + 1,
                'name' => $faker->word(),
                'order' => 1,
                'category_id'     => (int)(($i) / 5) + 1,
            ]);
        }
    }
}
