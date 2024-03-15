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

  const clear_cart = () => {
    localStorage.removeItem("cart");
    setCart({
      items: [],
    });
  };

  const clear_order = () => {
    localStorage.removeItem("order");
    setOrder({ data: {} });
  };

  return (
    <ECommerceContext.Provider
      value={{
        cart,
        setCart,
        order,
        setOrder,
        is_loading_main_loader,
        setIsLoadingMainLoader,
        clear_cart,
        clear_order,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};

export { ECommerceProvider };

export default ECommerceContext;
