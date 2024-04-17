<?php

namespace App\Http\Controllers;

use App\Models\OrderDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $store_id, string $order_id)
    {
        //$this->authorize("create", OrderDocument::class);

        $validation_rules = [
            'kind' => 'required',
            'file' => 'required|mimes:pdf|max:3000000',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = [
                'status' => false,
                'message' => 'Error de validación.',
                'type_error' => 'validation-error',
                'errors' => $validation->errors(),
            ];

            return response()->json($response);
        }

        // storing file
        $file = $request->file('file');

        $path = null;
        switch ($request->kind) {
            case 'ticket':
                OrderDocument::where('order_id', $order_id)->where('kind', 'invoice')->orWhere('kind', 'ticket')->where('state_id', 1)->update(['state_id' => 3]);
                $path = $file->store('public/files/tickets');
                break;
            case 'invoice':
                OrderDocument::where('order_id', $order_id)->where('kind', 'invoice')->orWhere('kind', 'ticket')->where('state_id', 1)->update(['state_id' => 3]);
                $path = $file->store('public/files/invoices');
                break;
            default:
                OrderDocument::where('order_id', $order_id)->where('kind', 'shipping')->where('state_id', 1)->update(['state_id' => 3]);
                $path = $file->store('public/files/shippings');
                break;
        }

        $file_name = basename($path); // get the generated file name

        OrderDocument::create([
            'order_id' => $order_id,
            'kind' => $request->kind,
            'file_name' => $file_name,
            'state_id' => 1,
        ]);

        $response = ['status' => true, 'message' => "Registro creado exitosamente."];

        return response()->json($response);
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
