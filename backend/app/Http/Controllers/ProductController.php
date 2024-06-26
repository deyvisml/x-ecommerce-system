<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $options = $request->query("options");
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Product::query();

        // ------------------ select columns ------------------
        $query->select('products.*');
        foreach (Schema::getColumnListing('collections') as $column) {
            $query->addSelect('collections.' . $column . ' as collections_' . $column);
        }
        foreach (Schema::getColumnListing('categories') as $column) {
            $query->addSelect('categories.' . $column . ' as categories_' . $column);
        }
        foreach (Schema::getColumnListing('stores') as $column) {
            $query->addSelect('stores.' . $column . ' as stores_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('collections', 'products.collection_id', '=', 'collections.id');
        $query->leftJoin('categories', 'products.category_id', '=', 'categories.id');
        $query->leftJoin('stores', 'products.store_id', '=', 'stores.id');
        $query->leftJoin('states', 'products.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($excluding) {
            foreach ($excluding as $exclude) {
                if (isset($exclude['values'])) {
                    $query->whereNotIn($exclude['column'], $exclude['values']);
                }
            }
        }
        if ($options) {
            if ($options['only_published'] == "true") {
                $now = Carbon::now();
                $query->where("published_at", "<=", $now);
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['products.id', 'products.name', 'products.price', 'products.quantity', 'collections.name', 'categories.name', 'states.name'];

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

    public function store_products(string $store_id, Request $request)
    {
        $store = Store::find($store_id);
        $this->authorize("viewAll", [Product::class, $store]);

        $filtering = $request->query('filtering');
        $excluding = $request->query('excluding');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = Product::query();

        // ------------------ select columns ------------------
        $query->select('products.*');
        foreach (Schema::getColumnListing('collections') as $column) {
            $query->addSelect('collections.' . $column . ' as collections_' . $column);
        }
        foreach (Schema::getColumnListing('categories') as $column) {
            $query->addSelect('categories.' . $column . ' as categories_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('collections', 'products.collection_id', '=', 'collections.id');
        $query->leftJoin('categories', 'products.category_id', '=', 'categories.id');
        $query->leftJoin('states', 'products.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                if (isset($filter['values'])) {
                    $query->whereIn($filter['column'], $filter['values']);
                }
            }
        }
        if ($excluding) {
            foreach ($excluding as $exclude) {
                if (isset($exclude['values'])) {
                    $query->whereNotIn($exclude['column'], $exclude['values']);
                }
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['products.id', 'products.name', 'products.price', 'products.quantity', 'collections.name', 'categories.name', 'states.name'];

                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            });
        }

        $query->where('products.store_id', $store->id); // IMPORTANT

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
        $this->authorize("create", Product::class);

        $validation_rules = [
            'name' => 'required',
            'sku' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:png,jpeg,jpg|max:5120|dimensions:min_width=800,min_height=800',
            'price' => 'required',
            'discount_rate' => 'required',
            'in_offer' => 'required',
            'is_customizable' => 'required',
            'quantity' => 'required',
            'in_stock' => 'required',
            'category_id' => 'required',
            'collection_id' => 'required',
            'store_id' => 'required',
            'state_id' => 'required',
            'publish_now' => 'required',
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

        // storing image in different sizes
        $file = $request->file('image');

        $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $unique_hash = md5($file_name . '_' . time() . '_' . Str::random(10));

        $full_file_name = $unique_hash . '.jpg';

        $this->resize_and_save_image($file, 800, 800, 'public/storage/images/products/large/', $full_file_name);
        $this->resize_and_save_image($file, 350, 350, 'public/storage/images/products/medium/', $full_file_name);
        $this->resize_and_save_image($file, 150, 150, 'public/storage/images/products/small/', $full_file_name);

        $user = $request->user();

        $published_at = null;
        if ($request->boolean('publish_now')) {
            $published_at = Carbon::now()->format('Y-m-d H:i:s');
        } else {
            $date = $request->date("publish_date")->format('Y-m-d');
            $time = $request->publish_time;

            $published_at = Carbon::createFromFormat('Y-m-d H:i', "$date $time");
        }

        Product::create([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'image_name' => $full_file_name,
            'price' => number_format($request->price, 2),
            'discount_rate' => $request->discount_rate,
            'offer_price' => number_format($request->price * (100 - $request->discount_rate) / 100, 2),
            'in_offer' => $request->boolean('in_offer'),
            'is_customizable' => $request->boolean('is_customizable'),
            'customization_label' => $request->customization_label ?? null,
            'publish_now' => $request->boolean('publish_now'),
            'quantity' => $request->quantity,
            'in_stock' => $request->boolean('in_stock'),
            'min_quantity_buy' => 1,
            'max_quantity_buy' => 10,
            'collection_id' => $request->collection_id,
            'category_id' => $request->category_id,
            'store_id' => $request->store_id,
            'creator_id' => $user->id,
            'updater_id' => $user->id,
            'published_at' => $published_at,
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => "Registro creado exitosamente."];

        return response()->json($response);
    }

    private function resize_and_save_image($file, $width, $height, $path, $file_name)
    {
        // create image manager with desired driver
        $manager = new ImageManager(new Driver());

        // read image from file system
        $image = $manager->read($file);
        $image = $image->resize($width, $height);

        $image->toJpeg()->save(base_path($path . $file_name));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize("view", Product::find($id));

        $query = Product::query();

        // ------------------ select columns ------------------
        $query->select('products.*');
        foreach (Schema::getColumnListing('collections') as $column) {
            $query->addSelect('collections.' . $column . ' as collections_' . $column);
        }
        foreach (Schema::getColumnListing('categories') as $column) {
            $query->addSelect('categories.' . $column . ' as categories_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('collections', 'products.collection_id', '=', 'collections.id');
        $query->leftJoin('categories', 'products.category_id', '=', 'categories.id');
        $query->leftJoin('states', 'products.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        $query->where('products.id', $id);

        $product = $query->first();

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        $this->authorize("update", $product);

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
            'is_customizable' => 'required',
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

        $full_file_name = null;
        if ($request->hasFile("image")) {
            // storing image
            $file = $request->file('image');

            $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $unique_hash = md5($file_name . '_' . time() . '_' . Str::random(10));

            $full_file_name = $unique_hash . '.jpg';

            $this->resize_and_save_image($file, 800, 800, 'public/storage/images/products/large/', $full_file_name);
            $this->resize_and_save_image($file, 350, 350, 'public/storage/images/products/medium/', $full_file_name);
            $this->resize_and_save_image($file, 150, 150, 'public/storage/images/products/small/', $full_file_name);
        } else {
            $full_file_name = $request->image_name;
        }

        $user = $request->user();

        $product->update([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'image_name' => $full_file_name,
            'price' => number_format($request->price, 2),
            'discount_rate' => $request->discount_rate,
            'offer_price' => number_format($request->price * (100 - $request->discount_rate) / 100, 2),
            'in_offer' => $request->boolean('in_offer'),
            'is_customizable' => $request->boolean('is_customizable'),
            'customization_label' => $request->customization_label ?? null,
            'quantity' => $request->quantity,
            'in_stock' => $request->boolean('in_stock'),
            'collection_id' => $request->collection_id,
            'category_id' => $request->category_id,
            'updater_id' => $user->id,
            'state_id' => $request->state_id,
        ]);

        $response = ['status' => true, 'message' => 'Registro actualizado exitosamente.'];

        return response()->json($response);
    }

    public function update_in_stock(Request $request, String $id)
    {
        $product = Product::find($id);
        $this->authorize("update", $product);

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

        $user = $request->user();

        $product->update([
            'in_stock' => $request->in_stock,
            'updater_id' => $user->id,
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
        $this->authorize("delete", $product);

        if (!$product) {
            $response = ['status' => false, 'message' => 'No se encontró ningún registro con el ID proporcionado.'];
            return response()->json($response);
        }

        $deleted_state_id = 3;

        $user = Auth::user();

        $product->update([
            'state_id' => $deleted_state_id,
            'updater_id' => $user->id,
        ]);

        $response = ['status' => true, 'message' => 'Registro eliminado exitosamente.'];

        return response()->json($response);
    }
}
