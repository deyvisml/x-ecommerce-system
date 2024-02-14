import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WhatsappFloatingButton from "../WhatsappFloatingButton";

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
        className="mt-14 text-sm"
        autoClose={2500}
      />
    </div>
  );
}

export default App;
