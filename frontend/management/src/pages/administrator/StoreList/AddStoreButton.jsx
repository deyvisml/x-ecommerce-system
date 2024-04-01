import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AddStoreModal from "./AddStoreModal";

const AddStoreButton = ({ setDataChanged }) => {
  const [is_add_store_modal_open, setIsAddStoreModalOpen] = useState(false);

  const handle_click_add_store_btn = () => {
    setIsAddStoreModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handle_click_add_store_btn}
        className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
      >
        Añadir tienda
      </button>

      <AnimatePresence>
        {is_add_store_modal_open == true && (
          <AddStoreModal
            setDataChanged={setDataChanged}
            is_modal_open={is_add_store_modal_open}
            setIsModalOpen={setIsAddStoreModalOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AddStoreButton;
