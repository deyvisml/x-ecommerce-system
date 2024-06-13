import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const CancelOrderButton = forwardRef(({ record, setDataChanged, fn }, ref) => {
  const { t } = useTranslation();
  const handle_click_btn = (record) => {
    Swal.fire({
      icon: "warning",
      title: t("alerts.titles.are_you_sure"),
      text: t("alerts.texts.irreversible_action"),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("alerts.confirmation_button.yes_continue"),
      cancelButtonText: t("alerts.cancel_button.cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fn(record);

          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: t("alerts.titles.canceled"),
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
        handle_click_btn(record);
      }}
      className={` p-2 bg-red-100 hover:bg-red-200 text-sm rounded text-red-600 flex w-full justify-center items-center gap-x-1`}
    >
      <XMarkIcon className="inline-block w-4" strokeWidth={2.5} />
      Cancelar orden
    </button>
  );
});

export default CancelOrderButton;
