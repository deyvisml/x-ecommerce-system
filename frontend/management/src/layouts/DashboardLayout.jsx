import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

function DashboardLayout() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return <Outlet />;
}

export default DashboardLayout;
