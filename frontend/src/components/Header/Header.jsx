import React from "react";
import { Link } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";

import logo from "../../assets/logo.webp";
import FlyoutMenu from "./FlyoutMenu";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { cart } = useECommerce();

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
    <>
      <header className="top-0 z-30 md:sticky bg-white shadow-md border-b w-full ">
        <div className="flex flex-wrap justify-between items-center md:px-16 border">
          <div className="m-auto md:m-0 mb-2 logo-container">
            <Link to="/" className="inline-block m-auto">
              <img src={logo} className="w-36 h-16 object-contain" alt="" />
            </Link>
          </div>
          <nav>
            <ul className="flex flex-wrap items-center divide-x divide-y md:divide-y-0 text-purple-500 text-sm uppercase">
              {menu_items.map((menu_item) => {
                return (
                  <li
                    key={menu_item.id}
                    className="border-neutral-300 w-full md:w-auto hover:text-purple-300 transition-all duration-300 ease-in-out"
                  >
                    {menu_item.has_subitems ? (
                      <FlyoutMenu
                        name={menu_item.name}
                        subitems={menu_item.subitems}
                      />
                    ) : (
                      <Link
                        to={menu_item.url}
                        className="inline-block px-4 py-2 font-bold"
                      >
                        {menu_item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="border-neutral-300 w-full md:w-auto hover:text-purple-600 transition-all duration-300 ease-in-out">
                <Link
                  to="carrito-compras"
                  className="inline-block px-4 py-2 font-semibold"
                >
                  <div className="relative">
                    <ShoppingBagIcon className="w-10 text-purple-500" />
                    {cart &&
                      (cart.items.length ? (
                        <div className="top-1/2 left-1/2 absolute flex justify-center items-center bg-white mt-1 rounded-full w-5 h-5 text-purple-600 text-xs transform -translate-x-1/2 -translate-y-1/2">
                          <span
                            className="inline-block font-bold"
                            style={{
                              marginBottom: -1,
                            }}
                          >
                            {cart.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                          </span>
                        </div>
                      ) : (
                        ""
                      ))}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
