import React, { useState } from "react";
import SwitchInput from "../../../components/SwitchInput";

const SwitchStockInput = ({ state }) => {
  const [is_switch_enabled, setIsSwitchEnabled] = useState(state);

  const handle_click_switch_stock_input = (state) => {
    setIsSwitchEnabled(state);
  };

  return (
    <SwitchInput
      is_switch_enabled={is_switch_enabled}
      click_switch={handle_click_switch_stock_input}
    ></SwitchInput>
  );
};

export default SwitchStockInput;
