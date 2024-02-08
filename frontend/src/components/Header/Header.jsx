import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import FlyoutMenu from "./FlyoutMenu";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const menu_items = [
    {
      id: "01",
      name: "Inicio",
      url: "/",
      has_subitems: false,
      subitems: [],
    },
    {
      id: "02",
      name: "Nuestros Productos",
      url: "/index",
      has_subitems: true,
      subitems: [
        {
          id: "01",
          name: "Cat 1",
          url: "/url",
        },
        {
          id: "02",
          name: "Cat 2",
          url: "/url",
        },
        {
          id: "03",
          name: "Cat 3",
          url: "/url",
        },
      ],
    },
    {
      id: "03",
      name: "Promociones",
      url: "/index",
      has_subitems: false,
      subitems: [],
    },
    {
      id: "04",
      name: "¡Descubre el detalle perfecto!",
      url: "/index",
      has_subitems: false,
      subitems: [],
    },
    {
      id: "05",
      name: "¡Arma tu detalle!",
      url: "/index",
      has_subitems: false,
      subitems: [],
    },
    {
      id: "06",
      name: "Preguntas frecuentes",
      url: "/index",
      has_subitems: false,
      subitems: [],
    },
  ];

  return (
    <header className="border-b-4 border-purple-600">
      <div className="flex flex-wrap items-center justify-between border md:px-16 bg-neutral-50">
        <div className="m-auto mb-2 bg-neutral-50 md:m-0 logo-container">
          <Link to="/" className="inline-block m-auto">
            <img src={logo} className="object-contain h-16 w-36" alt="" />
          </Link>
        </div>
        <nav>
          <ul className="flex flex-wrap items-center text-sm text-purple-500 divide-x divide-y md:divide-y-0">
            {menu_items.map((menu_item) => {
              return (
                <li
                  key={menu_item.id}
                  className="w-full transition-all duration-300 ease-in-out md:w-auto border-neutral-300 hover:text-purple-800"
                >
                  {menu_item.has_subitems ? (
                    <FlyoutMenu
                      name={menu_item.name}
                      subitems={menu_item.subitems}
                    />
                  ) : (
                    <Link
                      to={menu_item.url}
                      className="inline-block px-4 py-2 font-semibold"
                    >
                      {menu_item.name}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="w-full transition-all duration-300 ease-in-out md:w-auto border-neutral-300 hover:text-purple-700">
              <Link to="#" className="inline-block px-4 py-2 font-semibold">
                <div className="relative">
                  <ShoppingBagIcon className="w-10 text-purple-800" />
                  <div className="absolute flex items-center justify-center w-5 h-5 mt-1 text-xs text-purple-800 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2">
                    <span
                      className="inline-block font-bold"
                      style={{
                        marginBottom: 1.5,
                      }}
                    >
                      2
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
