import React, { useEffect, forwardRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// https://github.com/tailwindlabs/headlessui/issues/1512
const EditRecordButton = forwardRef(
  (
    {
      record,
      setEditRecord,
      is_edit_record_modal_open,
      setIsEditRecordModalOpen,
    },
    ref
  ) => {
    useEffect(() => {
      if (!is_edit_record_modal_open) {
        setEditRecord();
      }
    }, [is_edit_record_modal_open]);

    const handle_click_edit_record_btn = (record) => {
      setEditRecord(record);
      setIsEditRecordModalOpen(true);
    };

    return (
      <button
        ref={ref}
        onClick={() => {
          handle_click_edit_record_btn(record);
        }}
        className={` p-2 hover:bg-slate-100 w-full flex items-center gap-x-1`}
      >
        <PencilSquareIcon className="w-4" />
        Editar
      </button>
    );
  }
);

export default EditRecordButton;
