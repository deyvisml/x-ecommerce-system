import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/dist/locale/es";
import { yupResolver } from "@hookform/resolvers/yup";
import { undo_order_state_schema } from "./undo_order_state_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";

moment.locale("es");

const UndoOrderStateModal = ({
  record,
  setDataChanged,
  is_modal_open,
  setIsModalOpen,
}) => {
  const {
    register,
    watch,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(undo_order_state_schema),
  });

  const { token, store } = useManagement();

  const [order_state, setOrderState] = useState(record.order_state);

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios_client(
        `api/stores/${store.id}/orders/${record.id}/order-state/${data.order_state_id}/update-state`,
        {
          method: "put",
          data: {
            state_id: 2,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Creado!",
          text: response.data.message,
          confirmButtonText: "Continuar",
        });

        setDataChanged(true);
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message,
          confirmButtonText: "Continuar",
        });

        if (response.data.errors?.email) {
          setError("email", {
            message: "El correo ya esta registrado.",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  return (
    <Modal
      title={"Deshacer estado de la orden"}
      is_open_modal={is_modal_open}
      setIsOpenModal={setIsModalOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-2 text-slate-600 text-sm">
          <div>
            <label htmlFor="order_state_id" className="block font-semibold">
              Estado
            </label>
            <select
              {...register("order_state_id")}
              id="order_state_id"
              className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
            >
              <option value={""}>Seleccionar</option>
              {order_state.map((order_state_i, i) => {
                return (
                  <option key={i} value={order_state_i.id}>
                    {order_state_i.state2.name}
                  </option>
                );
              })}
            </select>
            {errors.order_state_id && (
              <p className="pt-1 text-red-500 text-xs ps-1">
                {errors.order_state_id.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-end items-center gap-2 mt-4 text-sm footer">
          <button
            onClick={handle_click_cancel_btn}
            type="button"
            className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 px-8 py-2 rounded text-white"
          >
            Deshacer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UndoOrderStateModal;
