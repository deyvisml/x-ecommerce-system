import React from "react";
import { createContext } from "react";

const ECommerceContext = createContext();

const ECommerceProvider = ({ children }) => {
  const var_to_past = "value";

  return (
    <ECommerceContext.Provider value={{ var_to_past }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export { ECommerceProvider };

export default ECommerceContext;
