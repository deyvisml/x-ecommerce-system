import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const SimpleLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default SimpleLayout;
