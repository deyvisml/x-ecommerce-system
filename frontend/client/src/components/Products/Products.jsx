import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import axios_client from "../../helpers/axios";
import Filter from "./Filter";
import OrderBy from "./OrderBy";

import ProductsGrid from "../ProductsGrid";

const Products = () => {
  const { category_id } = useParams();

  const [category, setCategory] = useState();
  const [collections, setCollections] = useState();
  const [order_by, setOrderBy] = useState({
    column: "products.name",
    way: "asc",
  });

  const [collection_id, setFilterItemId] = useState();

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_collections_by_category = async (category_id) => {
    const { data } = await axios_client(`api/collections`, {
      method: "get",
      params: {
        filtering: [
          {
            column: "collections.category_id",
            values: [category_id],
          },
        ],
        sorting: [
          {
            column: "collections.name",
            way: "ASC",
          },
        ],
      },
    });

    setCollections(data.data);
  };

  useEffect(() => {
    fetch_category(category_id);
    fetch_collections_by_category(category_id);
  }, []);

  /* ====== FETCH PRODUCTS ====== */
  const [products, setProducts] = useState();

  const fetch_products_by_category = async (
    category_id,
    collection_id,
    order_by
  ) => {
    const { data } = await axios_client(`api/products`, {
      method: "get",
      params: {
        filtering: [
          {
            column: "products.category_id",
            values: [category_id],
          },
          {
            column: "products.collection_id",
            values: [collection_id],
          },
        ],
        sorting: [
          {
            column: order_by.column,
            way: order_by.way,
          },
        ],
      },
    });

    setProducts(data.data);
  };

  useEffect(() => {
    setProducts();
    setTimeout(() => {
      fetch_products_by_category(category_id, collection_id, order_by);
    }, 1000);
  }, [collection_id, order_by]);
  /* ====== END FETCH PRODUCTS ====== */

  return (
    <div className="mx-auto px-4 max-w-7xl text-gray-800">
      <div className="my-5">
        <h3 className="font-bold text-2xl">
          {(category && category.name) || <Skeleton />}
        </h3>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-between mb-3">
        <OrderBy setOrderBy={setOrderBy} />
        <Filter
          items={collections}
          filter_item_id={collection_id}
          setFilterItemId={setFilterItemId}
        />
      </div>
      <div className="mb-10">
        <ProductsGrid products={products} />
      </div>
    </div>
  );
};

export default Products;
