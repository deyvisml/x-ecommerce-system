<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'description',
        'image_url',
        'display_in_column',
        'image_height',
        'order',
        'state_id',
    ];
}
