import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLoader from "../components/MainLoader";

const App = () => {
  useEffect(() => {
    document.title = `Gestión - Florecer Contigo`;
  }, []);

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
