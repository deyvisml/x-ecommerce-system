<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderState extends Model
{
    use HasFactory;

    protected $table = 'order_state';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'order_id',
        'state_id2',
        'date',
        'time',
        'creator_id',
        'updater_id',
        'state_id',
    ];

    public function state2()
    {
        return $this->belongsTo(State::class, 'state_id2', 'id');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updater_id', 'id');
    }
}
