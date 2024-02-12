import React from "react";
import { Outlet } from "react-router-dom";

const ContentLayout = () => {
  return (
    <div className="px-2 py-10 mx-2 mb-16 md:mx-20 lg:mx-40">
      <Outlet />
    </div>
  );
};

export default ContentLayout;
