import React from "react";
import { useState } from "react";

const QuantityButton = ({ min_quantity = 1, max_quantity = 10 }) => {
  const [quantity, setQuantity] = useState(1);

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
    <div className="flex gap-x-1">
      <button
        onClick={() => handle_change_quantity_button(-1)}
        className="rounded-full border border-gray-400 bg-slate-100 font-semibold flex items-center content-center text-xl  w-8 h-8 overflow-hidden"
      >
        <span className=" w-full pb-1 select-none">-</span>
      </button>
      <input
        onChange={handle_change_quantity_input}
        className="border-2 border-gray-600 outline-none text-sm text-center w-12 rounded-full"
        value={quantity}
        type="text"
      />
      <button
        onClick={() => handle_change_quantity_button(+1)}
        className="rounded-full border border-gray-400 bg-slate-100 font-semibold flex items-center content-center text-xl  w-8 h-8 overflow-hidden"
      >
        <span className=" w-full pb-1 select-none">+</span>
      </button>
    </div>
  );
};

export default QuantityButton;
