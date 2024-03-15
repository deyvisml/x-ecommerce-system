import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeProvider from "./utils/dashboard/ThemeContext";
import "./css/index.css";
import "./components/charts/ChartjsConfig";

import App from "./layouts/App";
import Login from "./pages/Login";
import LayoutDashboard from "./layouts/LayoutDashboard";

import AdminDashboard from "./pages/administrator/Dashboard";
import AdminHome from "./pages/administrator/Home";

import SellerDashboard from "./pages/seller/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        element: <LayoutDashboard />,
        children: [
          {
            path: "vendedor",
            element: <SellerDashboard />,
          },
          {
            path: "administrador",
            element: <AdminDashboard />,
            children: [
              {
                index: true,
                element: <AdminHome />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
