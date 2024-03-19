import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import axios_client from "./helpers/axios";
import { ManagementProvider } from "./context/ManagementProvider";
import ThemeProvider from "./utils/dashboard/ThemeContext";
import "./css/index.css";
import "./components/charts/ChartjsConfig";

import App from "./layouts/App";
import Login from "./pages/Login";
import LayoutDashboard from "./layouts/LayoutDashboard";

import AdminDashboard from "./pages/administrator/Dashboard";
import AdminHome from "./pages/administrator/Home";

import SellerDashboard from "./pages/seller/Dashboard";

const verify_login = async () => {
  const token = JSON.parse(localStorage.getItem("TOKEN"));

  try {
    const response = await axios_client(`/api/user`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const roles = response.data.data.user.roles.map((rol) => rol.name);

    if (roles.includes("administrator") || roles.includes("seller")) {
      return roles.includes("administrator")
        ? redirect(`/administrador`)
        : redirect(`/vendedor`);
    }
  } catch (error) {
    return null;
  }
};

const verify_role = async (role) => {
  const token = JSON.parse(localStorage.getItem("TOKEN"));

  try {
    const response = await axios_client(`/api/user`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const roles = response.data.data.user.roles.map((rol) => rol.name);

    if (roles.includes(role)) {
      return null;
    }
  } catch (error) {
    return redirect(`/`);
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: verify_login,
        element: <Login />,
      },
      {
        element: <LayoutDashboard />,
        children: [
          {
            path: "vendedor",
            loader: () => verify_role("seller"),
            element: <SellerDashboard />,
          },
          {
            path: "administrador",
            loader: () => verify_role("administrator"),
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
    <ManagementProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ManagementProvider>
  </React.StrictMode>
);
