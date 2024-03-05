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
  const [product_types, setProductTypes] = useState();
  const [order_by, setOrderBy] = useState({
    name: "",
    direction: "",
  });

  const [product_type_id, setFilterItemId] = useState("");

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_product_types_by_category = async (category_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/product-types?order=asc`
    );

    const all_type = { id: "", name: "todos" };
    setProductTypes([all_type, ...data.data]);
  };

  useEffect(() => {
    fetch_category(category_id);
    fetch_product_types_by_category(category_id);
  }, []);

  /* ====== FETCH PRODUCTS ====== */
  const [products, setProducts] = useState();

  const fetch_products_by_category = async (
    category_id,
    product_type_id,
    order_by
  ) => {
    console.log("debug", order_by);
    const { data } = await axios_client(
      `api/categories/${category_id}/products?product_type_id=${product_type_id}&order_by_name=${order_by.name}&order_by_direction=${order_by.direction}`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    setProducts();
    setTimeout(() => {
      fetch_products_by_category(category_id, product_type_id, order_by);
    }, 1000);
  }, [product_type_id, order_by]);
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
          items={product_types}
          filter_item_id={product_type_id}
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
