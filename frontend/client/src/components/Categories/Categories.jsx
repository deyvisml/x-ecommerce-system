import React from "react";
import axios_client from "../../helpers/axios";

import Category from "./Category";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetch_categories = async () => {
    const { data } = await axios_client("/api/categories?order=asc");

    setCategories(data.data);
  };

  useEffect(() => {
    fetch_categories();
  }, []);

  return (
    <div className="text-gray-800">
      <div className="mb-5 header-categories">
        <h3 className="mb-2 text-xl font-bold">Florecer contigo</h3>
        <p>Tienes para ti, el detalle que necesitas segun la ocasión.</p>
      </div>

      <div className="grid h-auto grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          {categories
            .filter((category) => category.display_in_column == 0)
            .map((category) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  image_url={category.image_url}
                  image_height={category.image_height}
                />
              );
            })}
        </div>

        <div className="flex flex-col gap-4">
          {categories
            .filter((category) => category.display_in_column == 1)
            .map((category) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  image_url={category.image_url}
                  image_height={category.image_height}
                />
              );
            })}
        </div>

        <div className="flex flex-col gap-4">
          {categories
            .filter((category) => category.display_in_column == 2)
            .map((category) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  image_url={category.image_url}
                  image_height={category.image_height}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
