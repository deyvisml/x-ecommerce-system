<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'products-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can view its all models.
     */
    public function viewAll(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'products-read-all-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles)) {
                return true;
            }

            $permission = Permission::where('name', 'products-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Product $product): bool
    {
        try {
            $permission = Permission::where('name', 'products-read-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $product->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'products-read-any')->first();
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
            $permission = Permission::where('name', 'products-create')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Product $product): bool
    {
        try {
            $permission = Permission::where('name', 'products-update-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $product->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'products-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Product $product): bool
    {
        try {
            $permission = Permission::where('name', 'products-delete-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $product->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'products-delete-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }
}
