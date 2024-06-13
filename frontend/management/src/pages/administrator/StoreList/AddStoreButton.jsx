import React from "react";
import { useTranslation } from "react-i18next";

const AddSellerButton = ({ setIsAddStoreModalOpen }) => {
  const { t } = useTranslation();
  const handle_click_add_store_btn = () => {
    setIsAddStoreModalOpen(true);
  };

  return (
    <button
      onClick={handle_click_add_store_btn}
      className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
    >
      {t("store_list.add_store")}
    </button>
  );
};

export default AddSellerButton;
