import React from "react";

const ModalButton = ({ label, setIsModalOpen }) => {
  const handle_click_btn = () => {
    setIsModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_btn}
      className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
    >
      {label}
    </button>
  );
};

export default ModalButton;
