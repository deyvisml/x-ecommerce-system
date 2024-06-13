import React from "react";
import { Link } from "react-router-dom";
import logo_white from "../../../public/images/logos/logo-white.svg";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";

const Header = () => {
  return (
    <header className="bg-rose-500 text-white">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <img src={logo_white} alt="" className="h-16" />
          </Link>
          <div className="flex items-center gap-x-3">
            <div className="min-w-40">
              <LocaleSwitcher />
            </div>
            <ul>
              <li className="">
                <Link to="#" className="block p-1">
                  <QuestionMarkCircleIcon className="w-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
