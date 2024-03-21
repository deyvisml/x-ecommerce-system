import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ECommerceProvider } from "./context/ECommerceProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Route from "./Route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ECommerceProvider>
      <PayPalScriptProvider
        options={{
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: import.meta.env.VITE_PAYAPL_CURRENCY,
          components: "buttons",
        }}
      >
        <Route />
      </PayPalScriptProvider>
    </ECommerceProvider>
  </React.StrictMode>
);
