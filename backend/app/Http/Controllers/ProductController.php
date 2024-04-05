<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
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
    }

    public function index2(Request $request)
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
