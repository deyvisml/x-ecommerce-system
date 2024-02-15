import React from "react";
import { Outlet } from "react-router-dom";

const FullWidthLayout = () => {
  return (
    <div className="flex-grow ">
      <Outlet />
    </div>
  );
};

export default FullWidthLayout;
