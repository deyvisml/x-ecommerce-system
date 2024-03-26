import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import axios_client from "./helpers/axios";
import App from "./layouts/App";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboardHome from "./pages/administrator/AdminDashboardHome";
import StoreList from "./pages/administrator/StoreList/StoreList";
import SellerDashboard from "./pages/seller/Dashboard";
import useManagement from "./hooks/useManagement";
import ResetPassword from "./pages/ResetPassword";

const Route = () => {
  const { set_token, user, set_user } = useManagement();

  const verify_login = async () => {
    console.log("verify login");
    const token = JSON.parse(localStorage.getItem("TOKEN")); // we use this value insted of state var (token) because token is async, so it doesn't have a value fastly when we set its value.

    if (!token) return null;

    try {
      const response = await axios_client(`/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const roles = response.data.data.user.roles.map((rol) => rol.name);

      if (!roles.includes("administrator") && !roles.includes("seller"))
        throw new Error("User without a valid role.");

      return roles.includes("administrator")
        ? redirect(`/administrador`)
        : redirect(`/vendedor`);
    } catch (error) {
      console.error(error);
      set_token();
      set_user();

      return null;
    }
  };

  /* verify if the user has a specific role */
  const verify_role = async (role) => {
    const token = JSON.parse(localStorage.getItem("TOKEN"));
    console.log("verify role:", role);
    console.log("token:", token);

    if (!token) return redirect(`/`);

    try {
      const response = await axios_client(`/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const roles = response.data.data.user.roles.map((rol) => rol.name);

      if (!roles.includes(role))
        throw new Error("User does not have the role.");

      return null;
    } catch (error) {
      console.error(error);
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
          path: "cambiar-contraseña",
          element: <ResetPassword />,
        },
        {
          element: <DashboardLayout />,
          children: [
            {
              path: "vendedor",
              loader: () => verify_role("seller"),
              element: <SellerDashboard />,
            },
            {
              element: <AdminDashboardLayout />,
              loader: () => verify_role("administrator"),
              children: [
                {
                  path: "administrador",
                  element: <AdminDashboardHome />,
                },
                {
                  path: "administrador/tiendas/listado",
                  element: <StoreList />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Route;
