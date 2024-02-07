import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price }) => {
  console.log(id);
  return (
    <article className="overflow-hidden bg-white border rounded-md shadow shadow-gray-300 group hover:text-purple-700">
      <Link to={`${id}`} className="block p-2">
        <div className="w-full mb-1 overflow-hidden h-52">
          <img
            src="https://fastly.picsum.photos/id/990/768/1024.jpg?hmac=FmdIxAjPutGawu1QkxbXL63lY65sO4kJHAcWBV7inYs"
            alt=""
            className="object-contain w-full h-full transition-transform transform group-hover:scale-110"
          />
        </div>
        <div className="mb-2 text-center ">
          <p className="mb-1 leading-5 h-9">{name}.</p>
          <p className="text-xl font-semibold">{price}</p>
        </div>
        <button className="w-full p-1 py-1.5 font-semibold hover:shadow-lg text-xs text-center text-white uppercase bg-purple-800 rounded-xl">
          Agregar
        </button>
      </Link>
    </article>
  );
};

export default ProductItem;
