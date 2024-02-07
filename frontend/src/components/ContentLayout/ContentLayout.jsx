import React from "react";
import { Outlet } from "react-router-dom";

const ContentLayout = () => {
  return (
    <div className="px-2 py-10 mx-2 mb-16 bg-gray-50 md:mx-20 lg:mx-48">
      <Outlet />
    </div>
  );
};

export default ContentLayout;
