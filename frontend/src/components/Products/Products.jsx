import React from "react";
import Filter from "./Filter";
import ProductItem from "./ProductItem";

const Products = () => {
  const product_types = [
    {
      id: 1,
      name: "type 1",
    },
    {
      id: 2,
      name: "type 2",
    },
    {
      id: 3,
      name: "type 3",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 4,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 5,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 6,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 7,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
    {
      id: 8,
      name: "Lorem ipsum dolor sit.",
      price: "S/ 40.00",
    },
  ];

  return (
    <div className="text-gray-800">
      <div className="mb-2">
        <h3 className="text-2xl font-bold">Ramo de flores</h3>
      </div>
      <div className="flex flex-col items-start mb-3 sm:items-end">
        <Filter items={product_types} />
      </div>

      <section className="grid grid-cols-1 gap-4 md:gap-x-2 md:gap-y-4 md:grid-cols-3 lg:grid-cols-5 ">
        {products.map(({ id, name, price }) => {
          return <ProductItem key={id} id={id} name={name} price={price} />;
        })}
      </section>
    </div>
  );
};

export default Products;
