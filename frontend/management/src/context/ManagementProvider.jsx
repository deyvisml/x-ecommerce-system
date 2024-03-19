import React, { useState } from "react";
import { createContext } from "react";

const ManagementContext = createContext();

const ManagementProvider = ({ children }) => {
  const [is_loading_main_loader, set_is_loading_main_loader] = useState(false);

  const [user, _set_user] = useState(
    JSON.parse(localStorage.getItem("USER")) || null
  );
  const [token, _set_token] = useState(
    JSON.parse(localStorage.getItem("TOKEN")) || null
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
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export { ManagementProvider };

export default ManagementContext;
