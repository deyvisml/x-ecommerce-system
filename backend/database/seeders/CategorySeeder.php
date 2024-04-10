<?php

namespace Database\Seeders;

use App\Models\Category;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $image_heights = array('h-64', 'h-80', 'h-96'); // it's not included 72 because there is problems when it's rendering

        for ($i = 0; $i < 9; $i++) {
            Category::create([
                'id' => $i + 1,
                'name' => $faker->sentence(3),
                'description' => $faker->paragraph(),
                'image_name' => 'https://picsum.photos/768/1024/?random',
                'display_in_column' => $faker->numberBetween(0, 2),
                'image_height' => $image_heights[array_rand($image_heights)],
            ]);
        }
    }
}
