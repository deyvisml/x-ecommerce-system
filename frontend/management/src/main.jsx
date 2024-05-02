import React from "react";
import ReactDOM from "react-dom/client";
import { ManagementProvider } from "./context/ManagementProvider";
import ThemeProvider from "./utils/dashboard/ThemeContext";
import "./css/index.css";
import "./components/charts/ChartjsConfig";
import Route from "./Route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ManagementProvider>
    <ThemeProvider>
      <Route />
    </ThemeProvider>
  </ManagementProvider>
);
