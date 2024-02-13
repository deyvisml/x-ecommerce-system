import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../Header";
import Footer from "../Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* for the scroll begin in the top position after a redirection */}
      <ScrollRestoration />
      <ToastContainer
        position="top-right"
        className="mt-14 text-sm"
        autoClose={2500}
      />
    </>
  );
}

export default App;
