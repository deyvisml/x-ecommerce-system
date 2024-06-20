<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DedicationMessage extends Model
{
    use HasFactory;

    protected $table = 'dedication_messages';

    protected $fillable = [
        'id',
        'name',
        'message',
        'order',
        'purchase_occasion_id',
    ];
}
