<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Product;
use App\Models\Store;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $image_names = [
            "12-reinas.jpeg",
            "arbol-de-la-vida-rosado.jpeg",
            "arreglo-amor-tulipanes-rojos.jpeg",
            "arreglo-cartera-de-rosas.jpeg",
            "arreglo-cecilia.jpeg",
            "arreglo-con-tulipanes-y-vino-para-mama.jpeg",
            "arreglo-corazon-rosas-y-flores.jpeg",
            "arreglo-florencia.jpeg",
            "arreglo-glam-black-24-rosas-coloridas-gratis-bombones-ferrero-rocher.jpeg",
            "arreglo-glam-gold-36-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "arreglo-glam-gold-feliz-dia-mama-12-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "arreglo-glam-silver-12-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "arreglo-maria.jpeg",
            "arreglo-mateus-rose.jpeg",
            "arreglo-nicole.jpeg",
            "arreglo-primaveral-especial-morado-gratis-bombones-ferrero-rocher.jpeg",
            "arreglo-rosas-y-hortensia-preservada.jpeg",
            "arreglo-rubi-12-rosas.jpeg",
            "arreglo-ternura-tulipanes-variados.jpeg",
            "arreglo-tulipanes-diseno-taza.jpeg",
            "arreglo-tulipanes-te-amo-mama-gratis-bombones-ferrero-rocher.jpeg",
            "bowie-perezoso-bandana-rosada-feliz-dia-mama.jpeg",
            "caja-lazos-hello-kitty-12-rosas-y-chocolates-sorini.jpeg",
            "caja-lazos-hello-kitty-24-rosas-y-chocolates-sorini.jpeg",
            "caja-rosatel-natural-nueva-edicion-con-12-tulipanes.jpeg",
            "caja-rosatel-natural-nueva-edicion-con-15-tulipanes.jpeg",
            "caja-rosatel-natural-nueva-edicion-con-6-tulipanes.jpeg",
            "caja-rosatel-natural-nueva-edicion-con-9-tulipanes.jpeg",
            "caja-aniversario-de-1metro-con-30-rosas-rojas.jpeg",
            "caja-coleccion-rubi-10-tulipanes.jpeg",
            "caja-coleccion-rubi-12-rosas.jpeg",
            "caja-coleccion-rubi-24-rosas.jpeg",
            "caja-coleccion-rubi-6-rosas.jpeg",
            "caja-corazon-rosatel-con-chocolates-cacaosuyo.jpeg",
            "caja-glam-gold-10-tulipanes.jpeg",
            "caja-glam-gold-12-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "caja-glam-gold-24-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "caja-glam-gold-6-rosas.jpeg",
            "caja-hello-kitty-lazos-con-12-rosas.jpeg",
            "caja-hello-kitty-lazos-con-24-rosas.jpeg",
            "caja-natural-12-rosas-rojas-y-chocolates-sorini.jpeg",
            "caja-natural-24-rosas-rojas-y-chocolates-sorini.jpeg",
            "caja-natural-rosatel-con-12-rosas-rojas.jpeg",
            "caja-rosatel-aniversario-30-rosas-y-cacaosuyo.jpeg",
            "caja-rosatel-chocolates-cacaosuyo-10-unids.jpeg",
            "caja-rosatel-natural-6-rosas-rojas.jpeg",
            "caja-rosatel-natural-9-rosas-rojas.jpeg",
            "caja-rosatel-natural-con-24-rosas-rojas.jpeg",
            "cartera-feliz-dia-mama-gratis-bombones-ferrero-rocher.jpeg",
            "cesta-i-love-mom-fucsia-gratis-bombones-ferrero-rocher.jpeg",
            "encanto-tornasol.jpeg",
            "florero-de-tulipanes.jpeg",
            "girasoles-mama-gratis-bombones-ferrero-rocher.jpeg",
            "glam-gold-36-girasoles.jpeg",
            "glam-gold-48-rosas.jpeg",
            "glam-green-primaveral-especial.jpeg",
            "glam-pink-rosas-y-tulipanes.jpeg",
            "hugo-mama.jpeg",
            "jardinera-la-mejor-mama-gratis-bombones-ferrero-rocher.jpeg",
            "luxury-feliz-dia-mama-24-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "luxury-rosas-y-girasoles.jpeg",
            "orquidea-phalaenopsis-maceta-decorativa-gris-gratis-bombones-ferrero-rocher.jpeg",
            "oso-teddy-mama.jpeg",
            "pecera-aqua-gratis-bombones-ferrero-rocher.jpeg",
            "perro-salchicha.jpeg",
            "pinky-tulipanes-gratis-bombones-ferrero-rocher.jpeg",
            "ramo-12-girasoles.jpeg",
            "ramo-buchon-100-rosas.jpeg",
            "ramo-de-flores-y-bowie-para-mama.jpeg",
            "ramo-gerberas-de-colores.jpeg",
            "ramo-girasoles-flores-y-florero.jpeg",
            "ramo-glam-gold-12-tulipanes.jpeg",
            "ramo-pink-i-love-mom-gratis-bombones-ferrero-rocher.jpeg",
            "ramo-rosas-y-girasoles.jpeg",
            "ramo-rubi-10-tulipanes.jpeg",
            "ramo-rubi-mariposa-12-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "ramo-rubi-mariposa-24-rosas-gratis-bombones-ferrero-rocher.jpeg",
            "ramo-tulipanes-variados-y-florero.jpeg",
            "ramo-tulipanes-y-chocolates-ferrero.jpeg",
            "ramo-tulipanes-y-flores.jpeg",
            "ramos-rosas-y-flores-rojas.jpeg",
            "ramos-rosas-y-flores-variadas.jpeg",
            "rosa-encantada-roja.jpeg",
            "rosa-encantada-violeta-y-hugo-mama.jpeg",
            "rosa-encantada-violeta.jpeg",
            "rubi-48-rosas.jpeg",
            "rubi-popurri-especial.jpeg",
            "soma-rosas-preservadas-rosadas-y-torta-zanahoria.jpeg",
            "sombrerera-cuadrada-rosas-preservadas-violetas.jpeg",
            "sombrerera-negra-con-rosas-preservadas-y-flores.jpeg",
            "sombrerera-negra-con-rosas-variadas-y-flores.jpeg",
            "sombrerera-rectangular-rosas-preservadas-rosadas.jpeg",
            "torta-de-limon-y-arandanos.jpeg",
            "torta-de-zanahoria.jpeg",
            "vino-altas-cumbres-rosado-feliz-dia-mama.jpeg",
        ];

        for ($i = 0; $i < 250; $i++) {
            $collection_id = $faker->numberBetween(1, 45);
            $price = $faker->randomFloat(2, 20, 80);
            $store_id = $faker->numberBetween(1, 3);

            Product::create([
                'id' => $i + 1,
                'name' => $faker->sentence(3),
                'description' => $faker->paragraph(),
                'image_names' => $image_names[array_rand($image_names)],
                'price' => $price,
                'offer_price' => $price,
                'quantity' => $faker->numberBetween(0, 30),
                'collection_id' => $collection_id,
                'category_id' => Collection::find($collection_id)->category_id,
                'store_id' => $store_id,
                'creator_id' => Store::find($store_id)->user_id,
                'updater_id' => Store::find($store_id)->user_id,
                'state_id' => 1,
            ]);
        }
    }
}
