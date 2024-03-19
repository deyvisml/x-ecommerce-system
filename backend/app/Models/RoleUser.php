<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RolUser extends Pivot
{
    protected $table = "role_user";

    protected $fillable = [
        "role_id",
        "user_id",
        "state_id",
    ];
}
