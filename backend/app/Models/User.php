<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'document_type_id',
        'document_number',
        'first_name',
        'last_name',
        'email',
        'birthdate',
        'phone_number',
        'password',
        'remember_token',
        'address_id',
        'subscribe_newsletter',
        'state_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    /* ************** ACL ************** */

    public function roles()
    {
        // updated: where pivot allows to only get the "active" roles
        return $this->belongsToMany(Role::class, "role_user")->wherePivot('state_id', 1);
    }

    public function assignRole(Role $role)
    {
        return $this->roles()->save($role);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains("name", $role);
        }

        // fixed: intersect only works with collections, and also $this->roles not return roles with a right form (attributes) so the better way is to work with ids.
        return !!collect([$role->id])->intersect($this->roles()->pluck('roles.id'))->count();
    }
}
