import React from "react";

const ModalButton2 = ({ label, setIsModalOpen }) => {
  const handle_click_btn = () => {
    setIsModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_btn}
      className="bg-indigo-100 hover:bg-indigo-200 px-6 py-2 rounded text-indigo-700 text-xs"
    >
      {label}
    </button>
  );
};

export default ModalButton2;
