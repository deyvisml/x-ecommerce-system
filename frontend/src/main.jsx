import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ECommerceProvider } from "./context/ECommerceProvider";

import App from "./components/App";
import Home from "./components/Home";
import CenterLayout from "./components/CenterLayout";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart/Cart";
import FullWidthLayout from "./components/FullWidthLayout/FullWidthLayout";

const router = createBrowserRouter([
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
        ],
      },
      {
        element: <FullWidthLayout />,
        children: [
          {
            path: "carrito-compras",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ECommerceProvider>
      <RouterProvider router={router} />
    </ECommerceProvider>
  </React.StrictMode>
);
