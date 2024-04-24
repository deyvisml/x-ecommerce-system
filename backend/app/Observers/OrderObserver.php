<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\OrderState;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        OrderState::create([
            'order_id' => $order->id,
            'state_id2' => $order->state_id,
            'date' => $order->created_at->toDateString(),
            'time' => $order->created_at->toTimeString(),
            'creator_id' => $order->creator_id,
            'updater_id' => $order->updater_id,
            'state_id' => 1,
        ]);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        if ($order->wasChanged('state_id')) {
            OrderState::updateOrCreate([
                'order_id' => $order->id,
                'state_id2' => $order->state_id,
            ], [
                'date' => $order->updated_at->toDateString(),
                'time' => $order->updated_at->toTimeString(),
                'creator_id' => $order->creator_id,
                'updater_id' => $order->updater_id,
                'state_id' => 1,
            ]);
        }
    }

    /**
     * Handle the Order "updating" event.
     */
    public function updating(Order $order)
    {

    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
