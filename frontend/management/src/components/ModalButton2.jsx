import React from "react";

const ModalButton2 = ({ label, setIsModalOpen, className }) => {
  const handle_click_btn = () => {
    setIsModalOpen(true);
  };

  return (
    <button onClick={handle_click_btn} className={className}>
      {label}
    </button>
  );
};

export default ModalButton2;
