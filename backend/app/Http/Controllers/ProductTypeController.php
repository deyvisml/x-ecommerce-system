<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductTypeResource;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filtering = $request->query('filtering');
        $search_query = $request->query('search_query');
        $sorting = $request->query('sorting');
        $limit = $request->query('limit');
        $page_size = $request->query('page_size');

        // ------------------ query ------------------
        $query = ProductType::query();

        // ------------------ select columns ------------------
        $query->select('product_types.*');
        foreach (Schema::getColumnListing('categories') as $column) {
            $query->addSelect('categories.' . $column . ' as categories_' . $column);
        }
        foreach (Schema::getColumnListing('states') as $column) {
            $query->addSelect('states.' . $column . ' as states_' . $column);
        }

        // ------------------ joins ------------------
        $query->leftJoin('categories', 'product_types.category_id', '=', 'categories.id');
        $query->leftJoin('states', 'product_types.state_id', '=', 'states.id');

        // ------------------ getting data ------------------
        if ($filtering) {
            foreach ($filtering as $filter) {
                $query->whereIn($filter['column'], $filter['values']);
            }
        }
        if ($search_query) {
            $query->where(function ($query) use ($search_query) {
                $columns = ['product_types.id', 'product_types.name', 'categories.name', 'states.name'];

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
            $query->orderBy('product_types.id', 'ASC'); // IMPORTANT (solver order), some methods like whereIn loses the "default order" (by id)
        }

        if ($limit) {
            $query->limit($limit);
        }

        // ------------------ form data ------------------
        if ($page_size) {
            $product_types = $query->paginate($page_size);
        } else {
            $product_types = $query->get();
        }

        return ProductTypeResource::collection($product_types);
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

    public function product_types_by_category(Request $request, string $category_id)
    {
        $order = $request->query('order');
        $limit = $request->query('limit');

        $product_types = ProductType::where('category_id', $category_id)->where('state_id', 1)->orderBy('order', 'ASC');

        if ($order) {
            $product_types = $product_types->orderBy('name', $order);
        }

        $product_types = $product_types->get();

        return ProductTypeResource::collection($product_types);
    }
}
