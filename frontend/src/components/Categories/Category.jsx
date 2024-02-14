import React from "react";
import { Link } from "react-router-dom";

const Category = ({
  id,
  name = "Sample category",
  description = "Sample description",
  image_url = "https://inspectiondoc.com/wp-content/uploads/2014/08/sample-icon.png",
  image_height = "h-80",
}) => {
  return (
    <Link
      to={`categorias/${id}/productos`}
      className={`relative h-auto block overflow-hidden group bg-gray-300 shadow-md  `}
    >
      <img
        src={`images/categories/${image_url}`}
        alt=""
        className={`z-0 object-cover w-full ${image_height} transition-transform transform group-hover:scale-125`}
      />
      <div className="top-0 left-0 z-10 absolute bg-gradient-to-t from-gray-800 to-transparent opacity-40 w-full h-full"></div>
      <div className="bottom-0 z-20 absolute m-5 text-white category-information">
        <h4 className="mb-2 font-semibold text-xl">{name}</h4>
        <p className="text-sm">
          {description.length > 100
            ? description.substring(0, 100) + ".."
            : description}
        </p>
      </div>
    </Link>
  );
};

export default Category;
