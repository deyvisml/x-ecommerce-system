<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\OrderState;
use App\Models\Permission;
use App\Models\Store;
use App\Models\User;

class OrderStatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, OrderState $orderState): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        try {
            $permission = Permission::where('name', 'order-state-create')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, OrderState $orderState, Store $store, Order $order): bool
    {
        try {
            $permission = Permission::where('name', 'order-state-update-own')->first();
            $roles = $permission->roles;

            if ($user->hasRoles($roles) && $orderState->order_id == $order->id && $order->store_id == $store->id && $store->user_id == $user->id) {
                return true;
            }

            $permission = Permission::where('name', 'order-state-update-any')->first();
            $roles = $permission->roles;

            return $user->hasRoles($roles);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, OrderState $orderState): bool
    {
        //
    }
}
