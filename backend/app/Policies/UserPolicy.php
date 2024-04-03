<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'users-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        try {
            $permission = Permission::where('name', 'users-read-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $model->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'users-read-any')->first();
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
            $permission = Permission::where('name', 'users-create')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function create_seller(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'sellers-create')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return false;
        try {
            $permission = Permission::where('name', 'users-update-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $model->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'users-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function update_seller(User $user, User $model): bool
    {
        try {
            $permission = Permission::where('name', 'sellers-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        try {
            $permission = Permission::where('name', 'users-delete-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $model->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'users-delete-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function delete_seller(User $user, User $model): bool
    {
        try {
            $permission = Permission::where('name', 'sellers-delete-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $model->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'sellers-delete-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }
}