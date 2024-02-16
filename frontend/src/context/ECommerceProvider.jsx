import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const ECommerceContext = createContext();

const ECommerceProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? {
      items: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ECommerceContext.Provider value={{ cart, setCart }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export { ECommerceProvider };

export default ECommerceContext;
