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
import ResetPassword from "./pages/ResetPassword";
import StoreApplications from "./pages/administrator/StoreApplications/StoreApplications";
import SellerList from "./pages/administrator/SellerList/SellerList";
import ChooseRole from "./pages/ChooseRole";
import SellerDashboardLayout from "./layouts/SellerDashboardLayout";
import SellerDashboardHome from "./pages/seller/SellerDashboardHome";
import ProductList from "./pages/seller/ProductList/ProductList";
import AddProduct from "./pages/seller/AddProduct/AddProduct";
import EditProduct from "./pages/seller/EditProduct/EditProduct";
import OrderList from "./pages/seller/OrderList/OrderList";
import ViewOrder from "./pages/seller/ViewOrder/ViewOrder";
import useManagement from "./hooks/useManagement";

const Route = () => {
  const { store, set_store } = useManagement();

  // this func also check if the user has valid roles like "administrador" / "vendedor"
  const user_is_auth = async () => {
    const token = JSON.parse(localStorage.getItem("TOKEN")); // we use this value insted of state var (token) because token is async, so it doesn't have a value fastly when we set its value.
    console.log("verify user is auth", token);

    try {
      if (!token) throw new Error("There is no a token.");

      const response = await axios_client(`/api/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const roles = response.data.data.user.roles.map((rol) => rol.name);

      if (!roles.includes("administrador") && !roles.includes("vendedor"))
        throw new Error("User without a valid role.");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /* verify if the user has a specific role */
  const user_has_role = async (role_name) => {
    const token = JSON.parse(localStorage.getItem("TOKEN"));
    console.log("verify user has role:", role_name, token, typeof token);

    try {
      if (!token) throw new Error("There is no a token");

      const response = await axios_client(`/api/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const roles = response.data.data.user.roles.map(
        (element) => element.name
      );

      if (!roles.includes(role_name))
        throw new Error("User does not have the role.");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // verify is the user already choose a specific role
  const user_choose_role = (role_name) => {
    console.log("verify user choose role:", role_name);
    const role = JSON.parse(localStorage.getItem("ROLE"));

    if (!role) return false;

    return role.name == role_name;
  };

  // verify is the user already choose a specific role
  const seller_has_set_store = async () => {
    const store = JSON.parse(localStorage.getItem("STORE")); // we use this value insted of state var (token) because token is async, so it doesn't have a value fastly when we set its value.

    return store;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          loader: async () => {
            return (await user_is_auth()) ? redirect("/escoger-rol") : null;
          },
          element: <Login />,
        },
        {
          path: "cambiar-contraseña",
          element: <ResetPassword />,
        },
        {
          path: "escoger-rol",
          loader: async () => ((await user_is_auth()) ? null : redirect("/")),
          element: <ChooseRole />,
        },
        {
          element: <DashboardLayout />,
          loader: async () => ((await user_is_auth()) ? null : redirect("/")),
          children: [
            {
              loader: async () => {
                return (await user_has_role("vendedor")) &&
                  user_choose_role("vendedor") &&
                  seller_has_set_store()
                  ? null
                  : redirect("/");
              },
              element: <SellerDashboardLayout />,
              children: [
                {
                  path: "vendedor",
                  element: <SellerDashboardHome />,
                },
                {
                  path: "vendedor/productos/listado",
                  element: <ProductList />,
                },
                {
                  path: "vendedor/productos/añadir",
                  element: <AddProduct />,
                },
                {
                  path: "vendedor/productos/:product_id/editar",
                  element: <EditProduct />,
                },
                {
                  path: "vendedor/ordenes/listado",
                  element: <OrderList />,
                },
                {
                  path: "vendedor/ordenes/:order_id",
                  element: <ViewOrder />,
                },
              ],
            },
            {
              element: <AdminDashboardLayout />,
              loader: async () =>
                (await user_has_role("administrador")) &&
                user_choose_role("administrador")
                  ? null
                  : redirect("/"),
              children: [
                {
                  path: "administrador",
                  element: <AdminDashboardHome />,
                },
                {
                  path: "administrador/tiendas/listado",
                  element: <StoreList />,
                },
                {
                  path: "administrador/tiendas/solicitudes",
                  element: <StoreApplications />,
                },
                {
                  path: "administrador/tiendas/vendedores",
                  element: <SellerList />,
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
