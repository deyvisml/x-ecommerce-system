import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ category_id, product_id, name, image_url, price }) => {
  return (
    <article className="bg-white shadow shadow-gray-300 p-2.5 rounded-md hover:text-rose-600 overflow-hidden group">
      <Link
        to={`/categorias/${category_id}/productos/${product_id}`}
        className="block"
      >
        <div className="mb-1 w-full h-52 overflow-hidden">
          <img
            src={`/images/products/${image_url}`}
            alt=""
            className="group-hover:scale-125 w-full h-full transform transition-transform object-contain"
          />
        </div>
        <div className="mb-2 text-center ">
          <p className="mb-1 h-11 leading-5">
            {name.length > 40 ? name.substring(0, 40) + ".." : name}
          </p>
          <p className="font-semibold text-xl">S/ {price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="mx-4">
        <button
          onClick={() => {
            alert("Added");
          }}
          className="inline-block bg-rose-600 hover:shadow-lg py-1.5 p-1 rounded-xl w-full font-semibold text-center text-white text-xs uppercase"
        >
          Agregar
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
