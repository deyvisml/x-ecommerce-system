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

        $image_urls = [
            'Fotoscuadradas-2023-08-29T123925.453_640x640.png', 
            'Fotoscuadradas-2023-09-01T161042.193_640x640.png', 
            'Fotoscuadradas-2023-08-29T125921.799_640x640.png',
            'Fotoscuadradas-2023-09-06T155138.288_640x640.png',
        ];

        for($i = 0 ; $i < 200 ; $i++){
            $product_type_id = $faker->numberBetween(1, 45);

            Product::create([
                'id' => $i+1,
                'name' => $faker->sentence(3),
                'description'  => $faker->paragraph(),
                'image_url'     => 'https://floresparatucasa.com/cdn/shop/files/' . $image_urls[array_rand($image_urls)],
                'price'     => $faker->numberBetween(10, 40),
                'product_type_id'   => $product_type_id,
                'category_id'   => (int)(($product_type_id - 1) / 5 + 1),
                'state_id'   => 1,
            ]);
        }
    }
}
