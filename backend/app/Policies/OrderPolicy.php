<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\Permission;
use App\Models\Store;
use App\Models\User;

class OrderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    public function viewAll(User $user, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'orders-read-all-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'orders-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Order $order): bool
    {

    }

    public function view_store_order(User $user, Order $order, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'orders-read-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id && $order->store_id == $store->id) {
                return true;
            }

            $permission = Permission::where('name', 'orders-read-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles) && $order->store_id == $store->id;
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Order $order, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'orders-update-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id && $order->store_id == $store->id) {
                return true;
            }

            $permission = Permission::where('name', 'orders-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles) && $order->store_id == $store->id;
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Order $order, Store $store): bool
    {
        try {
            $permission = Permission::where('name', 'orders-delete-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $store->user_id == $user->id && $order->store_id == $store->id) {
                return true;
            }

            $permission = Permission::where('name', 'orders-delete-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles) && $order->store_id == $store->id;
        } catch (\Throwable $e) {
            return false;
        }
    }
}
