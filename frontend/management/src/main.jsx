import React from "react";
import ReactDOM from "react-dom/client";
import { ManagementProvider } from "./context/ManagementProvider";
import ThemeProvider from "./utils/dashboard/ThemeContext";
import "./css/index.css";
import "./components/charts/ChartjsConfig";
import App from "./Route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ManagementProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ManagementProvider>
  </React.StrictMode>
);
