import React from "react";
import { useState, useEffect } from "react";
import axios_client from "../../helpers/axios";

import { GridLoader } from "react-spinners";

import ProductItem from "../Products/ProductItem";

const ProductsGrid = ({ category_id, product_type_id }) => {
  const [products, setProducts] = useState();

  const fetch_products_by_category = async (category_id, product_type_id) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/products?product_type_id=${product_type_id}`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    setProducts();
    setTimeout(() => {
      fetch_products_by_category(category_id, product_type_id);
    }, 1000);
  }, [product_type_id]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-x-3 md:gap-y-4 ">
      {products ? (
        products.map(({ id, name, image_url, price }) => {
          return (
            <ProductItem
              key={id}
              category_id={category_id}
              product_id={id}
              name={name}
              image_url={image_url}
              price={price}
            />
          );
        })
      ) : (
        <div className="col-span-5 py-14 h-60 text-center">
          <GridLoader
            className="w-full text-center text-gray-300"
            color="#075985"
          />
        </div>
      )}
    </section>
  );
};

export default ProductsGrid;
