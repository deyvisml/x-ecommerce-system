import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "../partials/dashboard/SidebarLinkGroup";
import logo_white from "../../public/images/logos/logo-white.png";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios_client from "../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../hooks/useManagement";
import { useNavigate } from "react-router-dom";

function SellerSidebar({ sidebarOpen, setSidebarOpen }) {
  let navigate = useNavigate();
  const { token, store, set_store, setIsLoadingMainLoader } = useManagement();

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const [stores, setStores] = useState([]);

  const fetch_stores = async () => {
    try {
      const response = await axios_client("api/my-stores", {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setStores(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const on_change_store_select = (record) => {
    setIsLoadingMainLoader(true);
    set_store(record);
    navigate("/vendedor");
  };

  useEffect(() => {
    if (store) {
      setTimeout(() => {
        setIsLoadingMainLoader(false);
      }, 1000);
    }
  }, [store]);

  useEffect(() => {
    fetch_stores();
  }, []);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 sm:px-2 pr-3">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={logo_white} className="w-36" alt="" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {stores.length > 1 && (
            <div>
              <h3 className="pl-3 font-semibold text-slate-500 text-xs uppercase">
                <span
                  className="lg:block hidden lg:sidebar-expanded:hidden 2xl:hidden w-6 text-center"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                  Tiendas
                </span>
              </h3>

              <Listbox
                value={store}
                onChange={on_change_store_select}
                as={"div"}
                className="lg:sidebar-expanded:block 2xl:block lg:hidden mx-3"
              >
                <div className="relative mt-2">
                  <Listbox.Button className="relative focus-visible:border-indigo-500 bg-white shadow-md py-2 pr-10 pl-3 rounded-md w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block text-xs truncate">{store.name}</span>
                    <span className="right-0 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
                      <ChevronUpDownIcon
                        className="w-4 h-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-10 absolute bg-white shadow-lg mt-1 py-1 rounded-md w-full max-h-60 text-base sm:text-sm overflow-auto ring-1 ring-black/5 focus:outline-none">
                      {stores.map((store_i, i) => (
                        <Listbox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-pointer text-xs py-2 pl-8 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={store_i}
                        >
                          <span className={`block truncate`}>
                            {store_i.name}
                          </span>
                          {store_i.id == store.id ? (
                            <span className="left-0 absolute inset-y-0 flex items-center pl-2 text-amber-600">
                              <CheckIcon
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {/* Pages group */}
          <div>
            <h3 className="pl-3 font-semibold text-slate-500 text-xs uppercase">
              <span
                className="lg:block hidden lg:sidebar-expanded:hidden 2xl:hidden w-6 text-center"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                Páginas
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname === "/" ||
                                  pathname.includes("dashboard")
                                    ? "text-indigo-500"
                                    : "text-slate-400"
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === "/" ||
                                  pathname.includes("dashboard")
                                    ? "text-indigo-600"
                                    : "text-slate-600"
                                }`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname === "/" ||
                                  pathname.includes("dashboard")
                                    ? "text-indigo-200"
                                    : "text-slate-400"
                                }`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ml-3 font-medium text-sm duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Main
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/analytics"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/dashboard/fintech"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Fintech
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Products */}
              <SidebarLinkGroup
                activecondition={pathname.includes("productos")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes("ecommerce")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={`fill-current ${
                                  pathname.includes("productos")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                cx="18.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${
                                  pathname.includes("utility")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${
                                  pathname.includes("productos")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                cx="18.5"
                                cy="18.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current ${
                                  pathname.includes("productos")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                cx="5.5"
                                cy="18.5"
                                r="4.5"
                              />
                            </svg>
                            <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ml-3 font-medium text-sm duration-200">
                              Productos
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/vendedor/productos/listado"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Listado de Productos
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Orders */}
              <SidebarLinkGroup activecondition={pathname.includes("ordenes")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes("community")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes("ordenes")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("ordenes")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M1 1h22v23H1z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("ordenes")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                              />
                            </svg>
                            <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ml-3 font-medium text-sm duration-200">
                              Ordenes
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/vendedor/ordenes/listado"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Listado de Ordenes
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Customers */}
              <SidebarLinkGroup activecondition={pathname.includes("clientes")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes("community")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="w-6 h-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current ${
                                  pathname.includes("community")
                                    ? "text-indigo-500"
                                    : "text-slate-600"
                                }`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current ${
                                  pathname.includes("community")
                                    ? "text-indigo-300"
                                    : "text-slate-400"
                                }`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ml-3 font-medium text-sm duration-200">
                              Clientes
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex ml-2 shrink-0">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block 2xl:block lg:hidden">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/vendedor/clientes/listado"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-indigo-500"
                                  : "text-slate-400 hover:text-slate-200")
                              }
                            >
                              <span className="lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 font-medium text-sm duration-200">
                                Listado de Clientes
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="lg:inline-flex justify-end hidden 2xl:hidden mt-auto pt-3">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerSidebar;
