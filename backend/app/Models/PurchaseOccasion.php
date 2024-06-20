<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOccasion extends Model
{
    use HasFactory;

    protected $table = 'purchase_occasions';

    protected $fillable = [
        'id',
        'name',
        'text_color',
        'bg_color',
        'order',
    ];

    public function dedication_messages()
    {
        $dedication_messages = $this->hasMany(DedicationMessage::class, "purchase_occasion_id", "id");

        return $dedication_messages;
    }
}
