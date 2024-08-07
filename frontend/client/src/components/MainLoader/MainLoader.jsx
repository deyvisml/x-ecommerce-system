import React from "react";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import useECommerce from "../../hooks/useECommerce";

const MainLoader = () => {
  const { is_loading_main_loader } = useECommerce();

  useEffect(() => {
    document.body.style.overflow = is_loading_main_loader ? "hidden" : "auto";
  }, [is_loading_main_loader]);

  return (
    is_loading_main_loader && (
      <div className="z-50 fixed inset-0 bg-black bg-opacity-20">
        <div className="flex justify-center items-center w-full h-full">
          <HashLoader color="#fff" size={80} />
        </div>
      </div>
    )
  );
};

export default MainLoader;
