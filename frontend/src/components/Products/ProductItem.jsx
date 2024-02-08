import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image_url, price }) => {
  return (
    <article className="p-2.5 overflow-hidden bg-white border rounded-md shadow shadow-gray-300 group hover:text-purple-700">
      <Link to={`${id}`} className="block">
        <div className="w-full mb-1 overflow-hidden h-52">
          <img
            src={image_url}
            alt=""
            className="object-contain w-full h-full transition-transform transform group-hover:scale-125"
          />
        </div>
        <div className="mb-2 text-center ">
          <p className="mb-1 leading-5 h-11">
            {name.length > 40 ? name.substring(0, 40) + ".." : name}
          </p>
          <p className="text-xl font-semibold">S/ {price}</p>
        </div>
      </Link>
      <button
        onClick={() => {
          alert("Added");
        }}
        className="w-full p-1 py-1.5 font-semibold hover:shadow-lg text-xs text-center text-white uppercase bg-purple-800 rounded-xl"
      >
        Agregar
      </button>
    </article>
  );
};

export default ProductItem;
