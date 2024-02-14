import React from "react";
import { Outlet } from "react-router-dom";

const ContentLayout = () => {
  return (
    <div className="flex-grow mx-2 md:mx-20 lg:mx-40 px-2 py-0">
      <Outlet />
    </div>
  );
};

export default ContentLayout;
