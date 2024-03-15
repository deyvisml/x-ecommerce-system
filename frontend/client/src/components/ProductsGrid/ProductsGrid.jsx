import React from "react";
import { useState, useEffect } from "react";
import axios_client from "../../helpers/axios";

import { GridLoader } from "react-spinners";

import ProductItem from "../Products/ProductItem";

const ProductsGrid = ({ products }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-3 md:gap-y-4">
      {products ? (
        products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
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
