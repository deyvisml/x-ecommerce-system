import React from "react";

const OpenModalButton = ({ label, setModalOpen }) => {
  const handle_click_open_modal_btn = () => {
    setModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_open_modal_btn}
      className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
    >
      {label}
    </button>
  );
};

export default OpenModalButton;
