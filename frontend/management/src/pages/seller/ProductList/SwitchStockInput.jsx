import React, { useState } from "react";
import SwitchInput from "../../../components/SwitchInput";

const SwitchStockInput = ({ state }) => {
  const [is_enabled, setIsEnabled] = useState(state);

  const handle_click_switch_stock_input = (state) => {
    // update in_stock using api
    setIsEnabled(state);
  };

  return (
    <SwitchInput
      value={is_enabled}
      onChange={handle_click_switch_stock_input}
    ></SwitchInput>
  );
};

export default SwitchStockInput;
