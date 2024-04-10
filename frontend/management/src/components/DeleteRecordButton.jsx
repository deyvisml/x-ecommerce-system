import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteRecordButton = forwardRef(
  ({ record, setDataChanged, fn_delete_record }, ref) => {
    const handle_click_delete_record_btn = (record) => {
      Swal.fire({
        icon: "warning",
        title: "¿Estas seguro?",
        text: "No sera posible revertir esta acción!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fn_delete_record(record);

            if (response.data.status) {
              Swal.fire({
                icon: "success",
                title: "Eliminado!",
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
          handle_click_delete_record_btn(record);
        }}
        className={` p-2 hover:bg-slate-100 flex w-full items-center gap-x-1`}
      >
        <TrashIcon className="w-4" />
        Borrar
      </button>
    );
  }
);

export default DeleteRecordButton;
