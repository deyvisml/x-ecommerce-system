import React from "react";
import { Link } from "react-router-dom";
import logo_white from "../../../public/images/logos/logo-white.png";

const Header = () => {
  return (
    <header className="bg-rose-500 text-white">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <img src={logo_white} alt="" className="w-36" />
          </Link>
          <div>
            <p>item</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
