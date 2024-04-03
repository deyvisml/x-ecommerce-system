import React from "react";

const AddSellerButton = ({ setIsAddStoreModalOpen }) => {
  const handle_click_add_store_btn = () => {
    setIsAddStoreModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_add_store_btn}
      className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
    >
      Añadir tienda
    </button>
  );
};

export default AddSellerButton;
