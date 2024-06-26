import React, { useEffect, forwardRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// https://github.com/tailwindlabs/headlessui/issues/1512
const EditSellerButton = forwardRef(
  (
    {
      record,
      setEditSeller,
      is_edit_seller_modal_open,
      setIsEditSellerModalOpen,
    },
    ref
  ) => {
    const { t } = useTranslation();
    useEffect(() => {
      if (!is_edit_seller_modal_open) {
        setEditSeller();
      }
    }, [is_edit_seller_modal_open]);

    const handle_click_edit_store_btn = (record) => {
      setEditSeller(record);
      setIsEditSellerModalOpen(true);
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
        {t("general.buttons.edit")}
      </button>
    );
  }
);

export default EditSellerButton;
