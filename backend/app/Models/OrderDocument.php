<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDocument extends Model
{
    use HasFactory;

    protected $table = 'order_documents';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'order_id',
        'kind',
        'file_name',
        'state_id',
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }
}
