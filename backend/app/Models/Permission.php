<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = "permissions";

    protected $fillable = [
        "name",
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Determine if the permission belongs to the role.
     *
     * @param  mixed $role
     * @return boolean
     */
    public function inRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }
        return !!$role->intersect($this->roles)->count();
    }
}
