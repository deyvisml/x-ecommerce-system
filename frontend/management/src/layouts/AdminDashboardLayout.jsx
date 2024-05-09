import React, { useState, useEffect } from "react";

import AdministratorSidebar from "../components/AdministratorSidebar";
import Header from "../partials/dashboard/Header";
import { Outlet } from "react-router-dom";

function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `Administrador - Florecer Contigo`;
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdministratorSidebar
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

export default AdminDashboardLayout;
