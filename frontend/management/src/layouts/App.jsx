import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
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
      <ScrollRestoration />
    </>
  );
};

export default App;
