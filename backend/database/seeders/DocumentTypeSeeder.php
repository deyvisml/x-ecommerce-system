<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $document_types_names = [
            "DNI",
            "RUC",
            "Pasaporte",
            "CE - Carnet de Extranjería",
            "CI - Cédula de Identidad",
        ];

        for ($i = 0; $i < count($document_types_names); $i++) {
            DocumentType::create([
                'id' => $i + 1,
                'name' => $document_types_names[$i],
                'state_id'   => 1
            ]);
        }
    }
}
