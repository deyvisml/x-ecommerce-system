<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStateChange extends Model
{
    use HasFactory;

    protected $table = 'order_state_changes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'order_id',
        'state_id2',
        'date',
        'time',
        'state_id',
    ];

    public function state2()
    {
        return $this->belongsTo(State::class, 'state_id2', 'id');
    }
}
