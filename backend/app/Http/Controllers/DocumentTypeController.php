<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentTypeResource;
use App\Models\DocumentType;
use Illuminate\Http\Request;


class DocumentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $order = $request->query('order');
        $limit = $request->query('limit');

        $document_types = DocumentType::where('state_id', 1);

        if ($order) {
            $document_types = $document_types->orderBy('name', $order);
        }
        if ($limit) {
            $document_types = $document_types->limit($limit);
        }

        $document_types = $document_types->get();

        return DocumentTypeResource::collection($document_types);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
