<?php

namespace App\Observers;

use App\Models\OrderState;
use App\Models\OrderStateLog;

class OrderStateObserver
{
    /**
     * Handle the OrderState "created" event.
     */
    public function created(OrderState $orderState): void
    {
        OrderStateLog::create([
            'order_state_id' => $orderState->id,
            'order_id' => $orderState->order_id,
            'state_id2' => $orderState->state_id2,
            'date' => $orderState->date,
            'time' => $orderState->time,
            'creator_id' => $orderState->creator_id,
            'state_id' => $orderState->state_id,
            'updater_id' => $orderState->updater_id,
        ]);
    }

    /**
     * Handle the OrderState "updated" event.
     */
    public function updated(OrderState $orderState): void
    {
        OrderStateLog::create([
            'order_state_id' => $orderState->id,
            'order_id' => $orderState->order_id,
            'state_id2' => $orderState->state_id2,
            'date' => $orderState->date,
            'time' => $orderState->time,
            'creator_id' => $orderState->creator_id,
            'state_id' => $orderState->state_id,
            'updater_id' => $orderState->updater_id,
        ]);
    }

    /**
     * Handle the OrderState "deleted" event.
     */
    public function deleted(OrderState $orderState): void
    {
        //
    }

    /**
     * Handle the OrderState "restored" event.
     */
    public function restored(OrderState $orderState): void
    {
        //
    }

    /**
     * Handle the OrderState "force deleted" event.
     */
    public function forceDeleted(OrderState $orderState): void
    {
        //
    }
}
