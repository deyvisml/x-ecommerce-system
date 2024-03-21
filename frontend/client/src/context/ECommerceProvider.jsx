import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const ECommerceContext = createContext();

const ECommerceProvider = ({ children }) => {
  const [is_loading_main_loader, setIsLoadingMainLoader] = useState(false);

  const [user, _set_user] = useState(
    JSON.parse(localStorage.getItem("USER")) || null
  );
  const [token, _set_token] = useState(
    JSON.parse(localStorage.getItem("TOKEN")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? {
      items: [],
    }
  );
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) ?? { data: {} }
  );

  const set_user = (user) => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }

    _set_user(user);
  };

  const set_token = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("TOKEN");
    }

    _set_token(token);
  };

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
        token,
        user,
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
