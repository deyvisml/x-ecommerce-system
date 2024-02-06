<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for($i = 0 ; $i < 20 ; $i++){
            Product::create([
                'id' => $i+1,
                'name' => $faker->sentence(3),
                'description'  => $faker->paragraph(),
                'image_url'     => 'https://picsum.photos/768/1024/?random',
                'price'     => $faker->numberBetween(10, 40),
                'product_type_id'   => 1,
                'category_id'   => 6,
                'state_id'   => 1,
            ]);
        }
    }
}
