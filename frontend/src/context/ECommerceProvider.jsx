import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const ECommerceContext = createContext();

const ECommerceProvider = ({ children }) => {
  const [is_loading_main_loader, setIsLoadingMainLoader] = useState(false);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? {
      items: [],
    }
  );
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) ?? { data: {} }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <ECommerceContext.Provider
      value={{
        cart,
        setCart,
        order,
        setOrder,
        is_loading_main_loader,
        setIsLoadingMainLoader,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};

export { ECommerceProvider };

export default ECommerceContext;
