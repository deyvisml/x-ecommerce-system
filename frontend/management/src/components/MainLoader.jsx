import React from "react";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";

const MainLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-30">
      <div className="flex justify-center items-center w-full h-full">
        <HashLoader color="#fff" size={80} />
      </div>
    </div>
  );
};

export default MainLoader;
