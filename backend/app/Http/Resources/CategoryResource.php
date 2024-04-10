<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_name' => $this->image_name,
            'display_in_column' => $this->display_in_column,
            'image_height' => $this->image_height,
            'url' => $this->url,
            'order' => $this->order,
            'state_id' => $this->state_id,
        ];
    }
}
