import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";

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
    </>
  );
}

export default App;
