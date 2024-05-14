import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DropdownItem from "../DropdownItem";
import logo from "../../../public/images/logos/logo.svg";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import axios_client from "../../helpers/axios";

const Header = () => {
  let navigate = useNavigate();
  const { cart } = useECommerce();
  const [is_open_menu, setIsOpenMenu] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handle_search_products = (data) => {
    const search_query = data.search_query;
    console.log(search_query);
    reset();

    navigate(`/busqueda?search_query=${search_query}`);
  };

  return (
    <>
      <header className="md:block top-0 z-30 sticky flex flex-col bg-white bg-whtie shadow-gray-400 shadow-md border-b w-full">
        <div className="bg-rose-700 h-5 text-white text-xs"></div>

        <div className="mx-auto xl:px-0 p-2 w-full max-w-7xl">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-2">
            <Link to="/" className="inline-block order-1">
              <img src={logo} className="w-36 h-16 object-contain" alt="" />
            </Link>

            <div className="flex justify-end gap-x-4 order-3 md:order-2 w-full md:max-w-md text-gray-600">
              <form
                onSubmit={handleSubmit(handle_search_products)}
                className="flex items-center w-full text-sm"
              >
                <input
                  placeholder="¿Qué estas buscando?"
                  {...register("search_query", { required: true })}
                  className="border-gray-400 py-2 border rounded-full w-full outline-none pe-11 ps-3.5"
                />
                <button
                  type="submit"
                  className="flex justify-center items-center bg-gray-600 rounded-full w-[38px] h-[38px] text-white -ms-[38px]"
                >
                  <MagnifyingGlassIcon className="w-6" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/*<nav className="mx-auto px-2 xl:px-0 w-full max-w-7xl">
          <div className="flex justify-between items-center">
            <div>.</div>

            <div className="relative z-30 flex flex-col w-1/2 md:w-auto">
              <button
                className="md:hidden bg-neutral-100 m-0 p-0.5 border rounded self-end"
                onClick={() => {
                  setIsOpenMenu((current_value) => !current_value);
                }}
              >
                <Bars3Icon className="bg-none w-8 text-gray-500" />
              </button>
              <ul
                className={`${
                  is_open_menu ? "block" : "hidden"
                } md:relative right-0 bottom-0 absolute md:flex flex-wrap items-center bg-white divide-x divide-y md:divide-y-0 text-rose-500 text-xs uppercase transform translate-y-full md:translate-y-0`}
              >
                {menu_items.map((menu_item) => {
                  return (
                    <li
                      key={menu_item.id}
                      className="border-neutral-300 w-full md:w-auto hover:text-rose-300 transition-all duration-300 ease-in-out"
                    >
                      {menu_item.has_subitems ? (
                        <DropdownItem subitems={menu_item.subitems}>
                          <Link
                            to={menu_item.url}
                            className="inline-block px-4 py-2 font-bold"
                          >
                            {menu_item.name}
                          </Link>
                        </DropdownItem>
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
              </ul>
            </div>
          </div>
        </nav>*/}
      </header>
    </>
  );
};

export default Header;
