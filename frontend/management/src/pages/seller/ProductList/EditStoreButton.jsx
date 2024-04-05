import React, { useEffect, forwardRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// https://github.com/tailwindlabs/headlessui/issues/1512
const EditStoreButton = forwardRef(
  (
    { record, setEditStore, is_edit_store_modal_open, setIsEditStoreModalOpen },
    ref
  ) => {
    useEffect(() => {
      if (!is_edit_store_modal_open) {
        setEditStore();
      }
    }, [is_edit_store_modal_open]);

    const handle_click_edit_store_btn = (record) => {
      setEditStore(record);
      setIsEditStoreModalOpen(true);
    };

    return (
      <button
        ref={ref}
        onClick={() => {
          handle_click_edit_store_btn(record);
        }}
        className={` p-2 hover:bg-slate-100 w-full flex items-center gap-x-1`}
      >
        <PencilSquareIcon className="w-4" />
        Editar
      </button>
    );
  }
);

export default EditStoreButton;
