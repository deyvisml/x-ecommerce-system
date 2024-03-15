import React from "react";
import useECommerce from "../../hooks/useECommerce";

import Carousel from "../Carousel";
import Categories from "../Categories";

const Home = () => {
  const { cart } = useECommerce();

  return (
    <>
      <Carousel />
      <div className="mx-2 sm:mx-20 md:mx-48 mb-16 px-2 py-10">
        <Categories />
      </div>
    </>
  );
};

export default Home;
