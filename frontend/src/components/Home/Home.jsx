import React from "react";
import useECommerce from "../../hooks/useECommerce";

import Carousel from "../Carousel";
import Categories from "../Categories";

const Home = () => {
  const { hola } = useECommerce();

  console.log(hola);

  return (
    <>
      <Carousel />
      <div className="px-2 py-10 mx-2 mb-16 bg-gray-50 sm:mx-20 md:mx-48">
        <Categories />
      </div>
    </>
  );
};

export default Home;
