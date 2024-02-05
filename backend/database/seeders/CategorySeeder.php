<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $image_heights = array('h-64', 'h-72', 'h-80');

        for($i = 0 ; $i < 10 ; $i++){
            Category::create([
                'name' => $faker->sentence(3),
                'description'  => $faker->paragraph(),
                'image_url'     => 'https://picsum.photos/768/1024/?random',
                'display_in_column'     => $faker->numberBetween(0, 2),
                'image_height'   => $image_heights[array_rand($image_heights)],
                'url'   => '/url',
                'state_id'   => '1',
            ]);
        }
    }
}
