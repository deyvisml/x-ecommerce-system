import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const QuantityButton = ({
  quantity = 1,
  setQuantity,
  min_quantity = 1,
  max_quantity = 10,
}) => {
  const handle_change_quantity_input = (e) => {
    const new_quantity = e.target.value;

    if (
      new_quantity == "" ||
      (new_quantity >= min_quantity && new_quantity <= max_quantity)
    ) {
      setQuantity(
        new_quantity == "" ? new_quantity : parseInt(new_quantity, 10)
      );
    }
  };

  const handle_change_quantity_button = (increase_decrease_quantity) => {
    const new_quantity = parseInt(quantity + increase_decrease_quantity, 10);
    console.log(new_quantity);

    if (new_quantity >= min_quantity && new_quantity <= max_quantity) {
      setQuantity(new_quantity);
    }
  };

  return (
    <div className="flex gap-x-1 w-auto text-gray-800">
      <button
        onClick={() => handle_change_quantity_button(-1)}
        className="flex items-center justify-center bg-slate-100 border border-gray-400 rounded-full w-8 h-8 font-semibold text-xl overflow-hidden"
      >
        <MinusIcon strokeWidth={3} className="w-4" />
      </button>
      <input
        onChange={handle_change_quantity_input}
        className="border-2 border-gray-600 rounded-full w-12 text-center text-sm outline-none"
        value={quantity}
        type="text"
      />
      <button
        onClick={() => handle_change_quantity_button(+1)}
        className="flex items-center justify-center bg-slate-100 border border-gray-400 rounded-full w-8 h-8 font-semibold text-xl overflow-hidden"
      >
        <PlusIcon strokeWidth={3} className="w-4" />
      </button>
    </div>
  );
};

export default QuantityButton;
