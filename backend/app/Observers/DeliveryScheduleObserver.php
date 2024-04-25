<?php

namespace App\Observers;

use App\Models\DeliverySchedule;
use App\Models\DeliveryScheduleLog;

class DeliveryScheduleObserver
{
    /**
     * Handle the DeliverySchedule "created" event.
     */
    public function created(DeliverySchedule $deliverySchedule): void
    {
        DeliveryScheduleLog::create([
            'delivery_schedule_id' => $deliverySchedule->id,
            'start_hour' => $deliverySchedule->start_hour,
            'end_hour' => $deliverySchedule->end_hour,
            'creator_id' => $deliverySchedule->creator_id,
            'state_id' => $deliverySchedule->state_id,
            'updater_id' => $deliverySchedule->updater_id,
        ]);
    }

    /**
     * Handle the DeliverySchedule "updated" event.
     */
    public function updated(DeliverySchedule $deliverySchedule): void
    {
        if ($deliverySchedule->wasChanged()) {
            DeliveryScheduleLog::create([
                'delivery_schedule_id' => $deliverySchedule->id,
                'start_hour' => $deliverySchedule->start_hour,
                'end_hour' => $deliverySchedule->end_hour,
                'creator_id' => $deliverySchedule->creator_id,
                'state_id' => $deliverySchedule->state_id,
                'updater_id' => $deliverySchedule->updater_id,
            ]);
        }
    }

    /**
     * Handle the DeliverySchedule "deleted" event.
     */
    public function deleted(DeliverySchedule $deliverySchedule): void
    {
        //
    }

    /**
     * Handle the DeliverySchedule "restored" event.
     */
    public function restored(DeliverySchedule $deliverySchedule): void
    {
        //
    }

    /**
     * Handle the DeliverySchedule "force deleted" event.
     */
    public function forceDeleted(DeliverySchedule $deliverySchedule): void
    {
        //
    }
}
