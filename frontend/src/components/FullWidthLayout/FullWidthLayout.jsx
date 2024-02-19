import React from "react";
import { Outlet } from "react-router-dom";

const FullWidthLayout = () => {
  return (
    <div className="flex-grow ">
      {/* flex grow takes all the space without content and fill it to cover all the height*/}
      <Outlet />
    </div>
  );
};

export default FullWidthLayout;
