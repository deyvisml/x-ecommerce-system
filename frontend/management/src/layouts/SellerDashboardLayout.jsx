import React, { useState } from "react";

import SellerSidebar from "../components/SellerSidebar";
import Header from "../partials/dashboard/Header";
import { Outlet } from "react-router-dom";

function SellerDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
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
  );
}

export default SellerDashboardLayout;
