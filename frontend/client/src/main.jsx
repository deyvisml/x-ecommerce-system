import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ECommerceProvider } from "./context/ECommerceProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Route from "./Route";
import "./i18n/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  </React.StrictMode>
);
