import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios_client from "../../helpers/axios";

import Filter from "./Filter";
import ProductItem from "./ProductItem";

const Products = () => {
  const { category_id } = useParams();

  const [product_types, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);

  const fetch_product_types_by_category = async (category_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/product-types?order=asc`
    );

    setProductTypes(data.data);
  };

  const fetch_products_by_category = async (category_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/products`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    fetch_product_types_by_category(category_id);
    fetch_products_by_category(category_id);
  }, []);

  return (
    <div className="text-gray-800">
      <div className="mb-2">
        <h3 className="text-2xl font-bold">Ramo de flores</h3>
      </div>
      <div className="flex flex-col items-start mb-3 sm:items-end">
        <Filter items={product_types} />
      </div>

      <section className="grid grid-cols-1 gap-4 md:gap-x-3 md:gap-y-4 md:grid-cols-3 lg:grid-cols-5 ">
        {products.map(({ id, name, image_url, price }) => {
          return (
            <ProductItem
              key={id}
              id={id}
              name={name}
              image_url={image_url}
              price={price}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Products;
