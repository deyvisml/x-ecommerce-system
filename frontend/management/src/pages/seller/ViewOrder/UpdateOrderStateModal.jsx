import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/dist/locale/es";
import { yupResolver } from "@hookform/resolvers/yup";
import { update_order_state_schema } from "./update_order_state_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";

moment.locale("es");

const UpdateOrderStateModal = ({
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
    resolver: yupResolver(update_order_state_schema),
  });

  const store_id = 6;
  const { token } = useManagement();

  const [current_state_order_change, setCurrentStateOrderChange] = useState(
    (val) => {
      return record.order_state_changes.find(
        (order_state_change) => order_state_change.state_id2 == record.state_id
      );
    }
  );

  console.log("aaa", current_state_order_change);

  const [order_states, setOrderStates] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {},
        headers: {
          authorization: "Bearer ",
        },
      });

      const states = response.data.data;

      const order_states_ids = [13, 14, 15, 16];
      const aux_order_states = states.filter((order_state) =>
        order_states_ids.includes(order_state.id)
      );
      setOrderStates(aux_order_states);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [fetches_finished, setFetchesFinished] = useState(false);
  useEffect(() => {
    (async () => {
      await fetch_states();
      setFetchesFinished(true);
    })();
  }, []);

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios_client(
        `/api/stores/${store_id}/orders/${record.id}/order-state-changes`,
        {
          method: "post",
          data,
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
    fetches_finished == true && (
      <Modal
        title={"Actualizar estado de la orden"}
        is_open_modal={is_modal_open}
        setIsOpenModal={setIsModalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <div>
              <label className="block font-semibold">Estado actual</label>
              <div className="gap-2 grid grid-cols-3">
                <input
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm capitalize cursor-default focus:ring-0"
                  value={current_state_order_change.state2.name}
                  readOnly
                />
                <input
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm cursor-default focus:ring-0"
                  value={moment(current_state_order_change.date).format(
                    "DD-MM-YYYY"
                  )}
                  readOnly
                />
                <input
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm cursor-default focus:ring-0"
                  value={current_state_order_change.time.slice(0, -3)}
                  readOnly
                />
              </div>
            </div>

            <hr />

            <div>
              <label htmlFor="state_id" className="block font-semibold">
                Estado
              </label>
              <select
                {...register("state_id")}
                id="state_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
              >
                <option value={""}>Seleccionar</option>
                {order_states.map((state, i) => {
                  return (
                    <option key={i} value={state.id}>
                      {i + 1}. {state.name}
                    </option>
                  );
                })}
              </select>
              {errors.state_id && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.state_id.message}
                </p>
              )}
            </div>

            <div className="gap-2 grid grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="date" className="block font-semibold">
                  Fecha
                </label>
                <input
                  {...register("date")}
                  id="date"
                  type="date"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
                />
                {errors.date && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label htmlFor="time" className="block font-semibold">
                  Hora
                </label>
                <input
                  {...register("time")}
                  id="time"
                  type="time"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
                />
                {errors.time && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.time.message}
                  </p>
                )}
              </div>
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
              Actualizar
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default UpdateOrderStateModal;
