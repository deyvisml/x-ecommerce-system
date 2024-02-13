import React, { useState } from "react";
import { createContext } from "react";

const ECommerceContext = createContext();

const ECommerceProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
  });

  return (
    <ECommerceContext.Provider value={{ cart, setCart }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export { ECommerceProvider };

export default ECommerceContext;
