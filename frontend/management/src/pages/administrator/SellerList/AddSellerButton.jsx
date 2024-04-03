import React from "react";

const AddSellerButton = ({ setIsAddSellerModalOpen }) => {
  const handle_click_add_seller_btn = () => {
    setIsAddSellerModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_add_seller_btn}
      className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
    >
      Añadir vendedor
    </button>
  );
};

export default AddSellerButton;
