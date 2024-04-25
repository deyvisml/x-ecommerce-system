<?php

namespace App\Observers;

use App\Models\ExchangeRate;
use App\Models\ExchangeRateLog;

class ExchangeRateObserver
{
    /**
     * Handle the ExchangeRate "created" event.
     */
    public function created(ExchangeRate $exchangeRate): void
    {
        ExchangeRateLog::create([
            'exchange_rate_id' => $exchangeRate->id,
            'currency' => $exchangeRate->currency,
            'price' => $exchangeRate->price,
            'creator_id' => $exchangeRate->creator_id,
            'state_id' => $exchangeRate->state_id,
            'updater_id' => $exchangeRate->updater_id,
        ]);
    }

    /**
     * Handle the ExchangeRate "updated" event.
     */
    public function updated(ExchangeRate $exchangeRate): void
    {
        if ($exchangeRate->wasChanged()) {
            ExchangeRateLog::create([
                'exchange_rate_id' => $exchangeRate->id,
                'currency' => $exchangeRate->currency,
                'price' => $exchangeRate->price,
                'creator_id' => $exchangeRate->creator_id,
                'state_id' => $exchangeRate->state_id,
                'updater_id' => $exchangeRate->updater_id,
            ]);
        }
    }

    /**
     * Handle the ExchangeRate "deleted" event.
     */
    public function deleted(ExchangeRate $exchangeRate): void
    {
        //
    }

    /**
     * Handle the ExchangeRate "restored" event.
     */
    public function restored(ExchangeRate $exchangeRate): void
    {
        //
    }

    /**
     * Handle the ExchangeRate "force deleted" event.
     */
    public function forceDeleted(ExchangeRate $exchangeRate): void
    {
        //
    }
}
