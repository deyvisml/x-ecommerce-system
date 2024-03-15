import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WhatsappFloatingButton from "../WhatsappFloatingButton";
import MainLoader from "../MainLoader/MainLoader";

import Header from "../Header";
import Footer from "../Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <WhatsappFloatingButton />
      {/* for the scroll begin in the top position after a redirection */}
      <ScrollRestoration />
      <ToastContainer
        position="top-right"
        className="mt-16 text-sm"
        autoClose={2500}
      />
      <MainLoader />
    </div>
  );
}

export default App;
