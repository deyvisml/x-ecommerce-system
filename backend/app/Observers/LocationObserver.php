<?php

namespace App\Observers;

use App\Models\Location;
use App\Models\LocationLog;

class LocationObserver
{
    /**
     * Handle the Location "created" event.
     */
    public function created(Location $location): void
    {
        LocationLog::create([
            'location_id' => $location->id,
            'name' => $location->name,
            'delivery_cost' => $location->delivery_cost,
            'region_id' => $location->region_id,
            'creator_id' => $location->creator_id,
            'state_id' => $location->state_id,
            'updater_id' => $location->updater_id,
        ]);
    }

    /**
     * Handle the Location "updated" event.
     */
    public function updated(Location $location): void
    {
        if ($location->wasChanged()) {
            LocationLog::create([
                'location_id' => $location->id,
                'name' => $location->name,
                'delivery_cost' => $location->delivery_cost,
                'region_id' => $location->region_id,
                'creator_id' => $location->creator_id,
                'state_id' => $location->state_id,
                'updater_id' => $location->updater_id,
            ]);
        }
    }

    /**
     * Handle the Location "deleted" event.
     */
    public function deleted(Location $location): void
    {
        //
    }

    /**
     * Handle the Location "restored" event.
     */
    public function restored(Location $location): void
    {
        //
    }

    /**
     * Handle the Location "force deleted" event.
     */
    public function forceDeleted(Location $location): void
    {
        //
    }
}
