import "./App.css";
import { Outlet } from "react-router-dom";
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
    </div>
  );
}

export default App;
