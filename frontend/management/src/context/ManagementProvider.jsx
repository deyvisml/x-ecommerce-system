import React, { useState } from "react";
import { createContext } from "react";

const ManagementContext = createContext();

const ManagementProvider = ({ children }) => {
  const [is_loading_main_loader, set_is_loading_main_loader] = useState(false);

  const [token, _set_token] = useState(
    JSON.parse(localStorage.getItem("TOKEN")) || null
  );
  const [user, _set_user] = useState(
    JSON.parse(localStorage.getItem("USER")) || null
  );
  const [role, _set_role] = useState(
    JSON.parse(localStorage.getItem("ROLE")) || null
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

  return (
    <ManagementContext.Provider
      value={{
        is_loading_main_loader,
        set_is_loading_main_loader,
        _set_token,
        user,
        set_user,
        token,
        set_token,
        role,
        set_role,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export { ManagementProvider };

export default ManagementContext;
