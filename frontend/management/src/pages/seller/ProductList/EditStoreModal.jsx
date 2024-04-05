import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { edit_store_schema } from "./edit_store_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";

const EditStoreModal = ({
  record,
  setDataChanged,
  is_modal_open,
  setIsModalOpen,
}) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      store_name: record?.name ?? undefined,
      ruc: record?.ruc ?? undefined,
      business_name: record?.business_name ?? undefined,
      legal_representative: record?.legal_representative ?? undefined,
      seller_id: record?.user_id ?? undefined,
      bank_id: record?.bank_id ?? undefined,
      bank_account_number: record?.bank_account_number ?? undefined,
      state_id: record?.state_id ?? undefined,
    },
    resolver: yupResolver(edit_store_schema),
  });

  const { token } = useManagement();

  const [sellers, setSellers] = useState([]);
  const fetch_sellers = async () => {
    try {
      const response = await axios_client(`/api/sellers`, {
        method: "get",
        params: {
          role_user_state_id: "",
        },
        headers: {
          authorization: "Bearer ",
        },
      });
      setSellers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [banks, setBanks] = useState([]);
  const fetch_banks = async () => {
    try {
      const response = await axios_client(`/api/banks`, {
        method: "get",
        params: {
          state_id: 1,
        },
        headers: {
          authorization: "Bearer ",
        },
      });
      setBanks(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [states, setStates] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {
          filtering: { id: [1, 2, 3] },
        },
        headers: {
          authorization: "Bearer ",
        },
      });
      setStates(response.data.data);
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
      await fetch_sellers();
      await fetch_banks();
      await fetch_states();
      setFetchesFinished(true);
    })();
  }, []);

  useEffect(() => {
    if (watch("bank_id") == 0) {
      setValue("bank_account_number", "");
      clearErrors("bank_account_number");
    }
  }, [watch("bank_id")]);

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios_client(`/api/stores/${record.id}`, {
        method: "put",
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Actualizado!",
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
        title={"Editar tienda"}
        is_open_modal={is_modal_open}
        setIsOpenModal={setIsModalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <div>
              <label htmlFor="store_name" className="block font-semibold">
                Nombre
              </label>
              <input
                {...register("store_name")}
                name="store_name"
                id="store_name"
                type="text"
                placeholder="Nombre"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.store_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.store_name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="ruc" className="block font-semibold">
                RUC
              </label>
              <input
                {...register("ruc")}
                name="ruc"
                id="ruc"
                type="text"
                placeholder="ruc"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.ruc && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.ruc.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="business_name" className="block font-semibold">
                Razón social
              </label>
              <input
                {...register("business_name")}
                name="business_name"
                id="business_name"
                type="text"
                placeholder="Razón social"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.business_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.business_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="legal_representative"
                className="block font-semibold"
              >
                Representante Legal
              </label>
              <input
                {...register("legal_representative")}
                name="legal_representative"
                id="legal_representative"
                type="text"
                placeholder="Nombres y Apellidos"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.legal_representative && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.legal_representative.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="seller_id" className="block font-semibold">
                Vendedor
              </label>
              <select
                {...register("seller_id")}
                name="seller_id"
                id="seller_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={0}>Seleccionar</option>
                {sellers.map((seller, i) => {
                  return (
                    <option key={i} value={seller.id}>
                      {seller.first_name} {seller.last_name}
                    </option>
                  );
                })}
              </select>
              {errors.seller_id && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.seller_id.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="bank_id" className="block font-semibold">
                Banco
              </label>
              <select
                {...register("bank_id")}
                name="bank_id"
                id="bank_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={0}>Seleccionar</option>
                {banks.map((bank, i) => {
                  return (
                    <option key={i} value={bank.id}>
                      {bank.name}
                    </option>
                  );
                })}
              </select>
              {errors.bank_id && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.bank_id.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bank_account_number"
                className="block font-semibold"
              >
                Cuenta bancaria
              </label>
              <input
                {...register("bank_account_number")}
                disabled={watch("bank_id") == 0}
                name="bank_account_number"
                id="bank_account_number"
                type="text"
                placeholder="Cuenta bancaria"
                className="border-slate-200 focus:border-indigo-400 disabled:bg-slate-100 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.bank_account_number && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.bank_account_number.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="state_id" className="block font-semibold">
                Estado
              </label>
              <select
                {...register("state_id")}
                name="state_id"
                id="state_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0 capitalize"
              >
                <option value={0}>Seleccionar</option>
                {states.map((state, i) => {
                  return (
                    <option key={i} value={state.id}>
                      {state.name}
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
              Editar
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default EditStoreModal;
