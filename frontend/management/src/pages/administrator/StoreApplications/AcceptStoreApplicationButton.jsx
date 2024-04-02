import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import axios_client from "../../../helpers/axios";
import { CheckIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";

const AcceptStoreApplicationButton = forwardRef(
  ({ store, setDataChanged }, ref) => {
    const { token } = useManagement();

    const handle_click_accept_store_application_btn = (record) => {
      Swal.fire({
        icon: "warning",
        title: "¿Estas seguro?",
        text: "La solicitud sera aceptada!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, aceptar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios_client(
              `/api/stores/${record.id}/change-state`,
              {
                method: "put",
                data: {
                  state_id: 1,
                },
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.data.status) {
              Swal.fire({
                icon: "success",
                title: "Aceptado!",
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
          handle_click_accept_store_application_btn(store);
        }}
        className={` p-2 hover:bg-slate-100 flex w-full items-center gap-x-1`}
      >
        <CheckIcon className="w-4" />
        Aceptar
      </button>
    );
  }
);

export default AcceptStoreApplicationButton;
