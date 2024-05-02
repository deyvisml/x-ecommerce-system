import React, { useState } from "react";
import { createContext } from "react";

const ManagementContext = createContext();

const ManagementProvider = ({ children }) => {
  const [token, _set_token] = useState(
    JSON.parse(localStorage.getItem("TOKEN")) || null
  );
  const [user, _set_user] = useState(
    JSON.parse(localStorage.getItem("USER")) || null
  );
  const [role, _set_role] = useState(
    JSON.parse(localStorage.getItem("ROLE")) || null
  );
  const [store, _set_store] = useState(
    JSON.parse(localStorage.getItem("STORE")) || null
  );

  const set_token = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("TOKEN");
    }

    _set_token(token);
  };

  const set_user = (user) => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }

    _set_user(user);
  };

  const set_role = (role) => {
    if (role) {
      localStorage.setItem("ROLE", JSON.stringify(role));
    } else {
      localStorage.removeItem("ROLE");
    }

    _set_role(role);
  };

  const set_store = (store) => {
    if (store) {
      localStorage.setItem("STORE", JSON.stringify(store));
    } else {
      localStorage.removeItem("STORE");
    }

    _set_store(store);
  };

  return (
    <ManagementContext.Provider
      value={{
        _set_token,
        user,
        set_user,
        token,
        set_token,
        role,
        set_role,
        store,
        set_store,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export { ManagementProvider };

export default ManagementContext;
