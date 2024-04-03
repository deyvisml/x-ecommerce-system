<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
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
        $active_state_id = 1;
        return $this->belongsToMany(Role::class, "role_user")->wherePivot('state_id', $active_state_id);
    }

    public function assignRole(Role $role)
    {
        return $this->roles()->save($role);
    }

    /**
     * verify is the user has a role, recieved $roles because you can sent many roles (collection) to check if any of them "belongs" to the user
     */
    public function hasRoles($roles)
    {
        if (is_string($roles)) {
            return $this->roles->contains("name", $roles);
        }

        // $role must be a collection
        if (!($roles instanceof Collection)) {
            $roles = collect([$roles]);
        }

        return !!$roles->intersect($this->roles)->count();
    }
}
