import React from "react";
import axios_client from "../../helpers/axios";

import Category from "./Category";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetch_categories = async () => {
    const { data } = await axios_client("/api/categories", {
      method: "get",
      params: {
        filtering: [
          {
            column: "state_id",
            values: [1],
          },
        ],
      },
    });

    setCategories(data.data);
  };

  useEffect(() => {
    fetch_categories();
  }, []);

  return (
    <div className="text-gray-800">
      <div className="px-5 py-2 text-center">
        <p className="text-2xl">
          ¿De que forma quieres sorprender el dia de hoy?
        </p>
        <div className="relative m-auto mt-5 max-w-xl h-4">
          <div className="flex items-center px-2 w-full h-full">
            <span className="block bg-rose-600 w-full h-0.5"></span>
          </div>
          <p className="top-2.5 left-0 absolute text-rose-600 text-xl -translate-y-1/2">
            ◆
          </p>
          <p className="top-2.5 right-0 absolute text-rose-600 text-xl -translate-y-1/2">
            ◆
          </p>
        </div>
      </div>

      <div className="gap-x-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 h-auto">
        {categories.map((category) => {
          return (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              image_name={category.image_name}
              image_height={category.image_height}
            />
          );
        })}
      </div>

      <div className="relative m-auto mt-5 max-w-xl h-4">
        <div className="flex items-center px-2 w-full h-full">
          <span className="block bg-rose-600 w-full h-0.5"></span>
        </div>
        <p className="top-2.5 left-0 absolute text-rose-600 text-xl -translate-y-1/2">
          ◆
        </p>
        <p className="top-2.5 right-0 absolute text-rose-600 text-xl -translate-y-1/2">
          ◆
        </p>
      </div>
    </div>
  );
};

export default Categories;
