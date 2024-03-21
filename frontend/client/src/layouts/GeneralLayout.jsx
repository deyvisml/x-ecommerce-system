import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLoader from "../components/MainLoader/MainLoader";

const GeneralLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        className="mt-16 text-sm"
        autoClose={2500}
      />
      <MainLoader />
      {/* for the scroll begin in the top position after a redirection */}
      <ScrollRestoration />
    </>
  );
};

export default GeneralLayout;
