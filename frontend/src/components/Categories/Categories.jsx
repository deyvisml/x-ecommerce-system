import React from "react";
import axios from "axios";

import Category from "./Category";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch_categories = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/categories?order=asc"
    );
    console.log(response);

    setCategories(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch_categories();
  }, []);

  /*
  const categories = [
    {
      id: "01",
      name: "Ramos de flores",
      description: "Flores frescas para distrutar tu dia",
      image_url:
        "https://www.rosatel.pe/lima/16603/ramo-premium-flores-lilas-y-fucsias.jpg",
      display_in_column: 0,
      height: "h-80",
    },
    {
      id: "02",
      name: "Para ella",
      description: "Put here a description",
      image_url:
        "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_606,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp",
      display_in_column: 0,
      height: "h-96",
    },
    {
      id: "03",
      name: "Arreglos florales",
      description: "Flores frescas para distrutar tu dia",
      image_url:
        "https://static.wixstatic.com/media/a3c153_78a5d714a07d456e8706bd1803304649~mv2.jpg/v1/fill/w_442,h_589,q_90/a3c153_78a5d714a07d456e8706bd1803304649~mv2.jpg",
      display_in_column: 1,
      height: "h-96",
    },
    {
      id: "04",
      name: "Para los chiquitines",
      description: "Flores frescas para distrutar tu dia",
      image_url:
        "https://static.wixstatic.com/media/a3c153_dfcf463db62643038622eae3a8a49f72~mv2.jpg/v1/fit/w_467,h_517,q_90/a3c153_dfcf463db62643038622eae3a8a49f72~mv2.jpg",
      display_in_column: 1,
      height: "h-96",
    },
    {
      id: "05",
      name: "Para los chiquitines",
      description: "Flores frescas para distrutar tu dia",
      image_url:
        "https://static.wixstatic.com/media/a3c153_8ebcdf4b28f141ef9924a3ee58a8099a~mv2.jpg/v1/fit/w_466,h_621,q_90/a3c153_8ebcdf4b28f141ef9924a3ee58a8099a~mv2.jpg",
      display_in_column: 2,
      height: "h-72",
    },
    {
      id: "06",
      name: "Arreglos fúnebres",
      description: "Flores frescas para distrutar tu dia",
      image_url:
        "https://static.wixstatic.com/media/a3c153_dbff3970b37f4d8bb013ece00b3fd41f~mv2.jpg/v1/fit/w_895,h_606,q_90/a3c153_dbff3970b37f4d8bb013ece00b3fd41f~mv2.jpg",
      display_in_column: 2,
      height: "h-96",
    },
  ];*/

  return (
    <section className="text-gray-800">
      <div className="mb-5 header-categories">
        <h3 className="mb-2 text-xl font-bold">Florecer contigo</h3>
        <p>Tienes para ti, el detalle que necesitas segun la ocasión.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 header-content lg:grid-cols-3 h-">
        <div className="flex flex-col gap-4">
          {categories
            .filter((category) => category.display_in_column == 0)
            .map((category) => {
              return (
                <Category
                  key={category.id}
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
                  name={category.name}
                  description={category.description}
                  image_url={category.image_url}
                  image_height={category.image_height}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
