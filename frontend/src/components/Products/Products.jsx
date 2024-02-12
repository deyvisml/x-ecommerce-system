import React from "react";
import { useState, useEffect } from "react";
import { GridLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useParams } from "react-router-dom";
import axios_client from "../../helpers/axios";

import Filter from "./Filter";
import ProductItem from "./ProductItem";

const Products = () => {
  const { category_id } = useParams();

  const [category, setCategory] = useState();
  const [product_types, setProductTypes] = useState();
  const [products, setProducts] = useState();
  const [filter_item_id, setFilterItemId] = useState("");

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_product_types_by_category = async (category_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/product-types?order=asc`
    );

    setProductTypes(data.data);
  };

  const fetch_products_by_category = async (category_id, filter_item_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/products?product_type_id=${filter_item_id}`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    fetch_category(category_id);
    fetch_product_types_by_category(category_id);
  }, []);

  useEffect(() => {
    setProducts();
    setTimeout(() => {
      fetch_products_by_category(category_id, filter_item_id);
    }, 500);
  }, [filter_item_id]);

  return (
    <div className="text-gray-800">
      <div className="mb-3">
        <h3 className="text-2xl font-bold">
          {(category && category.name) || <Skeleton />}
        </h3>
      </div>
      <hr className="mb-2" />
      <div className="flex flex-col items-start mb-3 sm:items-end">
        {
          <Filter
            items={product_types}
            filter_item_id={filter_item_id}
            setFilterItemId={setFilterItemId}
          />
        }
      </div>
      <section className="grid grid-cols-1 gap-4 md:gap-x-3 md:gap-y-4 md:grid-cols-3 lg:grid-cols-5 ">
        {products ? (
          products.map(({ id, name, image_url, price }) => {
            return (
              <ProductItem
                key={id}
                id={id}
                name={name}
                image_url={image_url}
                price={price}
              />
            );
          })
        ) : (
          <div className="col-span-5 text-center h-60 py-14">
            <GridLoader
              className="w-full text-center text-gray-300"
              color="#075985"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
