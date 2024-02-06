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

        for($i = 0 ; $i < 20 ; $i++){
            ProductType::create([
                'id' => $i + 1,
                'name' => $faker->word(),
                'category_id'     => $faker->numberBetween(5, 13),
            ]);
        }
    }
}
