<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $location_names = [
            "Ancash",
            "Arequipa",
            "Cajamarca",
            "Callao",
            "Cusco",
            "Ica",
            "Junin",
            "La libertad",
            "Lambayeque",
            "Lima",
            "Loreto",
            "Moquegua",
            "Piura",
            "San martin",
            "Tacna",
            "Ucayali",
        ];

        for ($i = 0; $i < count($location_names); $i++) {
            Location::create([
                'id' => $i + 1,
                'name' => $location_names[$i],
                'delivery_cost' => 15,
                'region_id' => $i + 1,
                'state_id'   => 1
            ]);
        }
    }
}
