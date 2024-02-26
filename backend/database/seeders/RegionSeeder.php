<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $region_names = [
            "ANCASH",
            "AREQUIPA",
            "CAJAMARCA",
            "CALLAO",
            "CUSCO",
            "ICA",
            "JUNIN",
            "LA LIBERTAD",
            "LAMBAYEQUE",
            "LIMA",
            "LORETO",
            "MOQUEGUA",
            "PIURA",
            "SAN MARTIN",
            "TACNA",
            "UCAYALI",
        ];

        for ($i = 0; $i < count($region_names); $i++) {
            Region::create([
                'id' => $i + 1,
                'name' => $region_names[$i],
                'state_id'   => 1
            ]);
        }
    }
}
