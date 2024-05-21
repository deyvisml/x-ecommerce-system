import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "../../components/Footer";

const SimpleLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SimpleLayout;
