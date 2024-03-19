import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        className="text-sm"
        autoClose={3000}
      />
    </>
  );
};

export default App;
