<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductLog;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        ProductLog::create([
            'product_id' => $product->product_id,
            'name' => $product->name,
            'sku' => $product->sku,
            'description' => $product->description,
            'image_name' => $product->image_name,
            'price' => $product->price,
            'discount_rate' => $product->discount_rate,
            'offer_price' => $product->offer_price,
            'in_offer' => $product->in_offer,
            'quantity' => $product->quantity,
            'in_stock' => $product->in_stock,
            'min_quantity_buy' => $product->min_quantity_buy,
            'max_quantity_buy' => $product->max_quantity_buy,
            'collection_id' => $product->collection_id,
            'category_id' => $product->category_id,
            'store_id' => $product->store_id,
            'creator_id' => $product->creator_id,
            'state_id' => $product->state_id,
            'updater_id' => $product->updater_id,
        ]);
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        if ($product->wasChanged()) {
            ProductLog::create([
                'product_id' => $product->product_id,
                'name' => $product->name,
                'sku' => $product->sku,
                'description' => $product->description,
                'image_name' => $product->image_name,
                'price' => $product->price,
                'discount_rate' => $product->discount_rate,
                'offer_price' => $product->offer_price,
                'in_offer' => $product->in_offer,
                'quantity' => $product->quantity,
                'in_stock' => $product->in_stock,
                'min_quantity_buy' => $product->min_quantity_buy,
                'max_quantity_buy' => $product->max_quantity_buy,
                'collection_id' => $product->collection_id,
                'category_id' => $product->category_id,
                'store_id' => $product->store_id,
                'creator_id' => $product->creator_id,
                'state_id' => $product->state_id,
                'updater_id' => $product->updater_id,
            ]);
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
