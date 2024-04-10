import React from "react";
import { Switch } from "@headlessui/react";

export default function SwitchInput({ value, onChange }) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={`${
        value ? "bg-indigo-500" : "bg-gray-200"
      } relative flex h-5 w-9 items-center rounded-full transition-colors  `}
    >
      <span
        className={`${
          value ? "translate-x-5" : "translate-x-1"
        } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  );
}
