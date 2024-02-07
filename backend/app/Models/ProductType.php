<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasFactory;

    protected $table = 'product_types';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'order',
        'category_id',
    ];
}
