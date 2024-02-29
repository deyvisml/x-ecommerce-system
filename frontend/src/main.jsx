import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ECommerceProvider } from "./context/ECommerceProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from "./components/App";
import Home from "./components/Home";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart/Cart";
import FullWidthLayout from "./components/FullWidthLayout/FullWidthLayout";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";

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
          {
            path: "pedido",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ECommerceProvider>
      <PayPalScriptProvider
        options={{
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: import.meta.env.VITE_PAYAPL_CURRENCY,
          components: "buttons",
        }}
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </ECommerceProvider>
  </React.StrictMode>
);
