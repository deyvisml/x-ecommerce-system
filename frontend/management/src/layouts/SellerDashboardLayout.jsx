import React, { useState, useEffect } from "react";
import axios_client from "../helpers/axios";

import SellerSidebar from "../components/SellerSidebar";
import Header from "../partials/dashboard/Header";
import { Outlet } from "react-router-dom";
import useManagement from "../hooks/useManagement";

function SellerDashboardLayout() {
  const { token, store, set_store } = useManagement();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetch_seller_stores = async () => {
    try {
      if (!token) throw new Error("There is no a token.");

      const response = await axios_client(`/api/my-stores`, {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const stores = response.data.data;

      return stores;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!store) {
      (async () => {
        const stores = await fetch_seller_stores();

        if (stores.length >= 1) {
          set_store(stores[0]);
        } else {
          alert("La cuenta no cuenta con ninguna tienda activa.");
          set_token();
        }
      })();
    }
  }, []);

  useEffect(() => {
    document.title = `Vendedor - Florecer Contigo`;
  }, []);

  return (
    store && (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SellerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    )
  );
}

export default SellerDashboardLayout;
