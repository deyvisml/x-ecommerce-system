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
            "167_320x320.png",
            "175_320x320.png",
            "428_320x320.png",
            "443_320x320.png",
            "580_320x320.png",
            "634_320x320.png",
            "812_320x320.png",
            "883_320x320.png",
            "900_320x320.png",
            "997_320x320.png",
            "ajuar-bebe-celeste.jpg",
            "ajuar-bebe-rosado.jpg",
            "ajuar-bebe-turquesa.jpg",
            "ajuar-especial-nina-personalizable.jpg",
            "ajuar-especial-nino-personalizable.jpg",
            "arreglo-dino-nina.jpg",
            "arreglo-dino-nino.jpg",
            "arreglo-rubi-12-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "banner2_1707818732.png",
            "bb1_320x320.png",
            "bb2_320x320.png",
            "body-nina-especial-personalizable.jpg",
            "body-nino-especial-personalizable.jpg",
            "caja-coleccion-rubi-12-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "caja-coleccion-rubi-24-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "cartera-de-rosas-love-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "castillo-panales-nina.jpg",
            "castillo-panales-nino.jpg",
            "cesta-peluche-its-a-boy.jpg",
            "cesta-peluche-its-a-girl.jpg",
            "cochecito-panales-nino.jpg",
            "em3_320x320.png",
            "F1_320x320.png",
            "f2_320x320.png",
            "fc1_320x320.png",
            "fc2_320x320.png",
            "fc3_320x320.png",
            "FCLES-SV_320x320.jpg",
            "FCMARG-SV_320x320.jpg",
            "FCRG-SV_320x320.jpg",
            "FCRV-SV_320x320.jpg",
            "FCTULI-SV_320x320.jpg",
            "glam-gold-love-12-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "glam-pink-rosas-y-tulipanes.jpg",
            "glam-silver-globo-12-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "image-2-compressed_320x320.jpg",
            "image-3-compressed_320x320.jpg",
            "luxury-i-love-you-24-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "luxury-i-love-you-rosas-y-girasoles-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "ly1_320x320.png",
            "ly2_320x320.png",
            "pack-bebita-personalizable.jpg",
            "pack-bebito-personalizable.jpg",
            "pecera-aqua-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "ramo-buchon-100-rosas.jpg",
            "ramo-pink-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "ramo-rubi-10-tulipanes.jpg",
            "ramo-rubi-mariposa-12-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "ramo-rubi-mariposa-24-rosas-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "rubi-cupido-gratis-caja-de-chocolates-kisses-hershey-s.jpg",
            "S_320x320.png",
        ];

        for ($i = 0; $i < 200; $i++) {
            $product_type_id = $faker->numberBetween(1, 45);

            Product::create([
                'id' => $i + 1,
                'name' => $faker->sentence(3),
                'description'  => $faker->paragraph(),
                'image_url'     => $image_urls[array_rand($image_urls)],
                'price'     => $faker->randomFloat(2, 20, 80),
                'quantity'     => $faker->numberBetween(0, 30),
                'product_type_id'   => $product_type_id,
                'category_id'   => (int)(($product_type_id - 1) / 5 + 1),
                'state_id'   => 1,
            ]);
        }
    }
}
