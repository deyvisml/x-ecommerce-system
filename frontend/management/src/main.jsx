import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ManagementProvider } from "./context/ManagementProvider";
import ThemeProvider from "./utils/dashboard/ThemeContext";
import "./css/index.css";
import "./components/charts/ChartjsConfig";
import Route from "./Route";
import "./i18n/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
    <ManagementProvider>
      <ThemeProvider>
        <Route />
      </ThemeProvider>
    </ManagementProvider>
  </Suspense>
);
