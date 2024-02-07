import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Home from "./components/Home";
import ContentLayout from "./components/ContentLayout";
import Products from "./components/Products";
import Product from "./components/Product";

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
        element: <ContentLayout />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
