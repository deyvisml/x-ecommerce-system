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
      className={`relative overflow-hidden group bg-gray-300 shadow-md category ${image_height} `}
    >
      <img
        src={image_url}
        alt=""
        className="z-0 object-cover w-full h-full transition-transform transform group-hover:scale-125"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full opacity-40 bg-gradient-to-t from-gray-800 to-transparent"></div>
      <div className="absolute bottom-0 z-20 m-5 text-white category-information">
        <h4 className="mb-2 text-xl font-semibold">{name}</h4>
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
