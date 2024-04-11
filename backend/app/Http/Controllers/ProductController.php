<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /*public function index(Request $request)
    {
    $product_type_id = $request->query('product_type_id');
    $search_value = $request->query('search_value');
    $in_offer = $request->query('in_offer');
    $order_by_name = $request->query('order_by_name');
    $order_by_direction = $request->query('order_by_direction') ?? 'ASC';
    $limit = $request->query('limit');

    $products = Product::where('state_id', 1);

    if ($product_type_id) {
    $products = $products->where('product_type_id', $product_type_id);
    }
    if ($search_value) {
    $products = $products->where('name', 'LIKE', '%' . $search_value . '%');
    }
    if ($in_offer) {
    $products = $products->where('in_offer', $in_offer);
    }
    if ($order_by_name) {
    if ($order_by_name == "random") {
    $products = $products->inRandomOrder();
    } else {
    $products = $products->orderBy($order_by_name, $order_by_direction);
    }
    }
    if ($limit) {
    $products = $products->limit($limit);
    }

    $products = $products->get();

    return ProductResource::collection($products);
    }*/

    public function index(Request $request)
    {
        $filtering = $request->query('filtering');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Product::query();

        // ------------------ select columns ------------------
        $query->select('products.*');
        foreach (Schema::getColumnListing('product_types') as $column) {
            $query->addSelect('product_types.' . $column . ' as product_types_' . $column);
        }
        foreach (Schema::getColumnListing('categories') as $column) {
            $query->addSelect('categories.' . $column . ' as categories_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('product_types', 'products.product_type_id', '=', 'product_types.id');
        $query->leftJoin('categories', 'products.category_id', '=', 'categories.id');
        $query->leftJoin('states', 'products.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                $query->whereIn($filter['column'], $filter['values']);
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['products.id', 'products.name', 'products.price', 'products.quantity', 'product_types.name', 'categories.name', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }
        if ($sorting) {
            foreach ($sorting as $sort) {
                if ($sort['way'] == 'random') {
                    $query->inRandomOrder();
                } else {
                    $query->orderBy($sort['column'], $sort['way']);
                }
            }
        } else {
            $query->orderBy('products.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $products = $query->paginate($page_size);
        } else {
            $products = $query->get();
        }

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation_rules = [
            'name' => 'required',
            'sku' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:png,jpeg,jpg|max:5120',
            'price' => 'required',
            'discount_rate' => 'required',
            'in_offer' => 'required',
            'quantity' => 'required',
            'in_stock' => 'required',
            'category_id' => 'required',
            'collection_id' => 'required',
            'state_id' => 'required',
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

        // storing image
        $file = $request->file('image');
        $path = $file->store('public/images/products'); // store image with a unique name
        $file_name = basename($path); // get the generated file name

        $user = $request->user();

        Product::create([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'image_name' => $file_name,
            'price' => number_format($request->price, 2),
            'discount_rate' => $request->discount_rate,
            'offer_price' => number_format($request->price * (100 - $request->discount_rate) / 100, 2),
            'in_offer' => $request->boolean('in_offer'),
            'quantity' => $request->quantity,
            'in_stock' => $request->boolean('in_stock'),
            'min_quantity_buy' => 1,
            'max_quantity_buy' => 10,
            'product_type_id' => $request->collection_id,
            'category_id' => $request->category_id,
            'seller_id' => $user->id,
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => "Registro creado exitosamente."];

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $product_id)
    {
        $product = Product::where('id', $product_id)->where('state_id', 1);
        $product = $product->first();

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        //$this->authorize("update_seller", $seller);

        //return response()->json(["xd" => $request->all(), "id" => $id]);

        if (!$product) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'name' => 'required',
            'sku' => 'required',
            'description' => 'required',
            'image' => 'sometimes|nullable|image|mimes:png,jpeg,jpg|max:5120',
            'image_name' => 'required',
            'price' => 'required',
            'discount_rate' => 'required',
            'in_offer' => 'required',
            'quantity' => 'required',
            'in_stock' => 'required',
            'category_id' => 'required',
            'collection_id' => 'required',
            'state_id' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Error de validación.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        $file_name = null;
        if ($request->hasFile("image")) {
            // storing image
            $file = $request->file('image');
            $path = $file->store('public/images/products'); // store image with a unique name
            $file_name = basename($path); // get the generated file name
        } else {
            $file_name = $request->image_name;
        }

        $user = $request->user();

        $product->update([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'image_name' => $file_name,
            'price' => number_format($request->price, 2),
            'discount_rate' => $request->discount_rate,
            'offer_price' => number_format($request->price * (100 - $request->discount_rate) / 100, 2),
            'in_offer' => $request->boolean('in_offer'),
            'quantity' => $request->quantity,
            'in_stock' => $request->boolean('in_stock'),
            'product_type_id' => $request->collection_id,
            'category_id' => $request->category_id,
            'seller_id' => $user->id,
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    public function update_in_stock(Request $request, String $id)
    {
        $product = Product::find($id);
        //$this->authorize("delete_seller", $product);

        if (!$product) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $validation_rules = [
            'in_stock' => 'required',
        ];

        $validation = Validator::make($request->all(), $validation_rules);

        if ($validation->fails()) {
            $response = ['status' => false, 'message' => 'Error de validación.', 'errors' => $validation->errors()];
            return response()->json($response);
        }

        $product->update([
            'in_stock' => $request->in_stock,
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        //$this->authorize("delete_seller", $product);

        if (!$product) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $deleted_state_id = 3;

        $product->update([
            'state_id' => $deleted_state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro eliminado exitosamente.'];

        return response()->json($response);
    }

    public function products_by_category(Request $request, string $category_id)
    {
        $product_type_id = $request->query('product_type_id');
        $exclude_product_id = $request->query('exclude_product_id');
        $order_by_name = $request->query('order_by_name');
        $order_by_direction = $request->query('order_by_direction') ?? 'ASC';
        $limit = $request->query('limit');

        $products = Product::where('category_id', $category_id)->where('state_id', 1);

        if ($product_type_id) {
            $products = $products->where('product_type_id', $product_type_id);
        }
        if ($exclude_product_id) {
            $products = $products->where('id', '<>', $exclude_product_id);
        }
        if ($order_by_name) {
            if ($order_by_name == "random") {
                $products = $products->inRandomOrder();
            } else {
                $products = $products->orderBy($order_by_name, $order_by_direction);
            }
        }
        if ($limit) {
            $products = $products->limit($limit);
        }

        $products = $products->get();

        return ProductResource::collection($products);
    }
}
