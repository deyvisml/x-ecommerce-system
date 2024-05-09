import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart/Cart";
import Search from "./components/Search";
import FullWidthLayout from "./components/FullWidthLayout/FullWidthLayout";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import StoreRegistration from "./pages/StoreRegistration/StoreRegistration";
import GeneralLayout from "./layouts/GeneralLayout";
import SimpleLayout from "./layouts/SimpleLayout/SimpleLayout";
import StoreRegistrationConfirmation from "./pages/StoreRegistrationConfirmation/StoreRegistrationConfirmation";

const Route = () => {
  const router = createBrowserRouter([
    {
      element: <GeneralLayout />,
      children: [
        {
          path: "/",
          element: <App />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              element: <FullWidthLayout />,
              children: [
                {
                  path: "categorias/:category_id/productos",
                  element: <Products />,
                },
                {
                  path: "categorias/:category_id/productos/:product_id",
                  element: <Product />,
                },
                {
                  path: "carrito-compras",
                  element: <Cart />,
                },
                {
                  path: "busqueda",
                  element: <Search />,
                },
                {
                  path: "pedido",
                  loader: () => {
                    const num_items =
                      JSON.parse(localStorage.getItem("CART"))?.items?.length ??
                      0;
                    // if there is no products
                    if (!num_items) return redirect("/");
                    return null;
                  },
                  element: <Order />,
                },
                {
                  path: "orden-exitosa",
                  element: <OrderSuccess />,
                },
              ],
            },
          ],
        },
        {
          element: <SimpleLayout />,
          children: [
            {
              path: "/solicitud-registro-tienda",
              element: <StoreRegistration />,
            },
            {
              path: "/solicitud-registro-tienda/confirmación",
              element: <StoreRegistrationConfirmation />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Route;
