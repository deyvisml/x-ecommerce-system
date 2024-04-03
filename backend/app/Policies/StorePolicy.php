<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\Store;
use App\Models\User;

class StorePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'stores-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'stores-read-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'stores-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'stores-create')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'stores-update-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'stores-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'stores-delete-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'stores-delete-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

}
