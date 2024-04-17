import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelOrderButton = forwardRef(({ record, setDataChanged, fn }, ref) => {
  const handle_click_btn = (record) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro?",
      text: "No sera posible revertir esta acción!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fn(record);

          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Cancelado!",
              text: response.data.message,
              confirmButtonText: "Continuar",
            });
            setDataChanged(true);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: response.data.message,
              confirmButtonText: "Continuar",
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
