import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { add_store_schema } from "./add_store_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const AddStoreModal = ({ setDataChanged, is_modal_open, setIsModalOpen }) => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      state_id: 1,
    },
    mode: "all",
    resolver: yupResolver(add_store_schema),
  });

  const { token } = useManagement();

  const [sellers, setSellers] = useState([]);
  const fetch_sellers = async () => {
    try {
      const response = await axios_client(`/api/sellers`, {
        method: "get",
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
          filtering: [
            {
              column: "states.id",
              values: [1, 2, 3],
            },
          ],
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

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    console.log("aa");
    try {
      const response = await axios_client(`/api/stores`, {
        method: "post",
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: t("alerts.titles.created"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });
        setDataChanged(true);
        setIsModalOpen(false);
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
  };

  // watch what are the form errors
  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    fetches_finished == true && (
      <Modal
        title={t("add_store_modal.title")}
        is_open_modal={is_modal_open}
        setIsOpenModal={setIsModalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <div>
              <label htmlFor="store_name" className="block font-semibold">
                {t("general.fields.name2.label")}
              </label>
              <input
                {...register("store_name")}
                name="store_name"
                id="store_name"
                type="text"
                placeholder={t("general.fields.name2.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.store_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.store_name.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="ruc" className="block font-semibold">
                {t("general.fields.ruc.label")}
              </label>
              <input
                {...register("ruc")}
                name="ruc"
                id="ruc"
                type="text"
                maxLength={11}
                placeholder={t("general.fields.ruc.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.ruc && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.ruc.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="business_name" className="block font-semibold">
                {t("general.fields.business_name.label")}
              </label>
              <input
                {...register("business_name")}
                name="business_name"
                id="business_name"
                type="text"
                placeholder={t("general.fields.business_name.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.business_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.business_name.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone_number" className="block font-semibold">
                {t("general.fields.phone_number.label")}
              </label>
              <input
                {...register("phone_number")}
                name="phone_number"
                id="phone_number"
                type="text"
                maxLength={9}
                placeholder={t("general.fields.phone_number.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.phone_number && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.phone_number.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="legal_representative"
                className="block font-semibold"
              >
                {t("general.fields.legal_representative.label")}
              </label>
              <input
                {...register("legal_representative")}
                name="legal_representative"
                id="legal_representative"
                type="text"
                placeholder={t(
                  "general.fields.legal_representative.placeholder"
                )}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.legal_representative && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.legal_representative.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="user_id" className="block font-semibold">
                {t("general.fields.seller.label")}
              </label>
              <select
                {...register("user_id")}
                name="user_id"
                id="user_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={0}>
                  {" "}
                  {t("general.fields.seller.placeholder")}
                </option>
                {sellers.map((seller, i) => {
                  return (
                    <option key={i} value={seller.id}>
                      {seller.first_name} {seller.last_name}
                    </option>
                  );
                })}
              </select>
              {errors.user_id && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.user_id.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="bank_id" className="block font-semibold">
                {t("general.fields.bank.label")}
              </label>
              <select
                {...register("bank_id")}
                name="bank_id"
                id="bank_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={0}>
                  {" "}
                  {t("general.fields.bank.placeholder")}
                </option>
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
                  {t(errors.bank_id.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bank_account_number"
                className="block font-semibold"
              >
                {t("general.fields.bank_account_number.label")}
              </label>
              <input
                {...register("bank_account_number")}
                id="bank_account_number"
                type="text"
                maxLength={25}
                placeholder={t(
                  "general.fields.bank_account_number.placeholder"
                )}
                className="border-slate-200 focus:border-indigo-400 disabled:bg-slate-100 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.bank_account_number && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.bank_account_number.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="state_id" className="block font-semibold">
                {t("general.fields.state.label")}
              </label>
              <select
                {...register("state_id")}
                name="state_id"
                id="state_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0 capitalize"
              >
                <option value={0}>
                  {" "}
                  {t("general.fields.state.placeholder")}
                </option>
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
                  {t(errors.state_id.message)}
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
              {t("general.buttons.cancel")}
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-8 py-2 rounded text-white"
            >
              {t("general.buttons.create")}
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default AddStoreModal;
