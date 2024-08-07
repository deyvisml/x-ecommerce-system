import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import axios_client from "../../../helpers/axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import { useTranslation } from "react-i18next";

const DeleteStoreButton = forwardRef(({ record, setDataChanged }, ref) => {
  const { t } = useTranslation();
  const { token } = useManagement();

  const handle_click_delete_store_btn = (record) => {
    Swal.fire({
      icon: "warning",
      title: t("alerts.titles.are_you_sure"),
      text: t("alerts.texts.record_delete"),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("alerts.confirmation_button.yes_delete"),
      cancelButtonText: t("alerts.cancel_button.cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios_client(`/api/stores/${record.id}`, {
            method: "delete",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: t("alerts.titles.deleted"),
              text: response.data.message,
              confirmButtonText: t("alerts.confirmation_button.continue"),
            });
            setDataChanged(true);
          } else {
            Swal.fire({
              icon: "error",
              title: t("alerts.titles.error"),
              text: response.data.message,
              confirmButtonText: t("alerts.confirmation_button.continue"),
            });
          }
        } catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.message ?? error.message, {
            autoClose: 5000,
          });
        }
      }
    });
  };

  return (
    <button
      ref={ref}
      onClick={() => {
        handle_click_delete_store_btn(record);
      }}
      className={` p-2 hover:bg-slate-100 flex w-full items-center gap-x-1`}
    >
      <TrashIcon className="w-4" />
      {t("general.buttons.delete")}
    </button>
  );
});

export default DeleteStoreButton;
