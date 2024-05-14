import React from "react";
import { Link } from "react-router-dom";

const Category = ({
  id,
  name = "Sample category",
  description = "Sample description",
  image_name = "https://inspectiondoc.com/wp-content/uploads/2014/08/sample-icon.png",
  image_height = "h-80",
}) => {
  return (
    <Link
      to={`categorias/${id}/productos`}
      className={`relative h-auto block bg-white  overflow-hidden text-center group`}
    >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={`${
            import.meta.env.VITE_API_URL
          }/storage/images/categories/${image_name}`}
          alt=""
          className={`object-cover w-full h-56 sm:h-80 shadow-md transition-transform  group-hover:scale-125`}
        />
        <div className="group-hover:block hidden">
          <div className="top-0 left-0 z-10 absolute bg-gradient-to-t from-gray-800 to-transparent opacity-70 w-full h-full"></div>
          <div className="top-1/2 left-1/2 z-20 absolute p-2 w-full -translate-x-1/2 -translate-y-1/2">
            <p className="text-white">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-bold">{name}</p>
      </div>
    </Link>
  );
};

export default Category;
