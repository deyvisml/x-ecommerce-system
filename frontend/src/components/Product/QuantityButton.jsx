import React from "react";

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
    <div className="flex gap-x-1 w-auto">
      <button
        onClick={() => handle_change_quantity_button(-1)}
        className="flex items-center content-center bg-slate-100 border border-gray-400 rounded-full w-8 h-8 font-semibold text-xl overflow-hidden"
      >
        <span className="pt-0.5 w-full select-none ">-</span>
      </button>
      <input
        onChange={handle_change_quantity_input}
        className="border-2 border-gray-600 rounded-full w-12 text-center text-sm outline-none"
        value={quantity}
        type="text"
      />
      <button
        onClick={() => handle_change_quantity_button(+1)}
        className="flex items-center content-center bg-slate-100 border border-gray-400 rounded-full w-8 h-8 font-semibold text-xl overflow-hidden"
      >
        <span className="pt-0.5 w-full select-none ">+</span>
      </button>
    </div>
  );
};

export default QuantityButton;
