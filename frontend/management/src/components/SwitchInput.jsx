import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export default function SwitchInput({ is_switch_enabled, click_switch }) {
  const [enabled, setEnabled] = useState(is_switch_enabled);

  useEffect(() => {
    setEnabled(is_switch_enabled);
  }, [is_switch_enabled]);

  const handle_click_switch = (state) => {
    if (!click_switch) {
      setEnabled(state);
      return;
    }

    click_switch(state);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handle_click_switch}
      className={`${
        enabled ? "bg-indigo-500" : "bg-gray-200"
      } relative flex h-5 w-9 items-center rounded-full transition-colors  `}
    >
      <span
        className={`${
          enabled ? "translate-x-5" : "translate-x-1"
        } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  );
}
