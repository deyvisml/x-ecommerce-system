<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = "roles";

    // avoid return pivot attributes when we use methods like belongsToMany, etc, very usefull.
    // https://github.com/laravel/framework/issues/745#issuecomment-42994130
    protected $hidden = ['pivot'];

    protected $fillable = [
        "name",
    ];

    public function permissions()
    {
        $active_state_id = 1;
        return $this->belongsToMany(Permission::class)->wherePivot('state_id', $active_state_id);
    }

    public function givePermissionTo(Permission $permission)
    {
        return $this->permissions()->save($permission);
    }

    public function hasPermission(Permission $permission, User $user)
    {
        return $user->hasRoles($permission->roles);
    }

    /**
     * Determine if the role has the given permission.
     *
     * @param  mixed $permission
     * @return boolean
     */
    public function inRole($permission)
    {
        if (is_string($permission)) {
            return $this->permissions->contains('name', $permission);
        }
        return !!$permission->intersect($this->permissions)->count();
    }
}
