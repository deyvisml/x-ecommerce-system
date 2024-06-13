import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { seller_schema } from "./seller_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const AddSellerModal = ({ setDataChanged, is_modal_open, setIsModalOpen }) => {
  const { t } = useTranslation();
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
    defaultValues: {
      document_type_id: 0,
      state_id: 1,
    },
    resolver: yupResolver(seller_schema),
  });

  const { token } = useManagement();

  const [document_types, setDocumentTypes] = useState([]);
  const fetch_document_types = async () => {
    try {
      const response = await axios_client(`/api/document-types`, {
        method: "get",
        headers: {
          authorization: "Bearer ",
        },
      });
      setDocumentTypes(response.data.data);
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
      await fetch_document_types();
      await fetch_states();
      setFetchesFinished(true);
    })();
  }, []);

  useEffect(() => {
    if (watch("document_type_id") == 0) {
      setValue("document_number", "");
      clearErrors("document_number");
    }
  }, [watch("document_type_id")]);

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios_client(`/api/sellers`, {
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
        title={t("add_seller_modal.title")}
        is_open_modal={is_modal_open}
        setIsOpenModal={setIsModalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <div>
              <label htmlFor="email" className="block font-semibold">
                {t("general.fields.email.label")}
              </label>
              <input
                {...register("email")}
                name="email"
                id="email"
                type="text"
                placeholder={t("general.fields.email.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.email && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.email.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold">
                {t("general.fields.password.label")}
              </label>
              <input
                {...register("password")}
                name="password"
                id="password"
                type="password"
                placeholder={t("general.fields.password.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.password && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.password.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="first_name" className="block font-semibold">
                {t("general.fields.name.label")}
              </label>
              <input
                {...register("first_name")}
                name="first_name"
                id="first_name"
                type="text"
                placeholder={t("general.fields.name.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.first_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.first_name.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block font-semibold">
                {t("general.fields.last_name.label")}
              </label>
              <input
                {...register("last_name")}
                name="last_name"
                id="last_name"
                type="last_name"
                placeholder={t("general.fields.last_name.placeholder")}
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.last_name && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.last_name.message)}
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
              <label htmlFor="document_type_id" className="block font-semibold">
                {t("general.fields.document_type.label")}
              </label>
              <select
                {...register("document_type_id")}
                name="document_type_id"
                id="document_type_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={0}>
                  {t("general.fields.document_type.placeholder")}
                </option>
                {document_types.map((document_type, i) => {
                  return (
                    <option key={i} value={document_type.id}>
                      {document_type.name}
                    </option>
                  );
                })}
              </select>
              {errors.document_type_id && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.document_type_id.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="document_number" className="block font-semibold">
                {t("general.fields.document_number.label")}
              </label>
              <input
                disabled={watch("document_type_id") == 0}
                {...register("document_number")}
                name="document_number"
                id="document_number"
                type="text"
                placeholder={t("general.fields.document_number.placeholder")}
                className="border-slate-200 focus:border-indigo-400 disabled:bg-slate-100 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              />
              {errors.document_number && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {t(errors.document_number.message)}
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
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-8 py-2 rounded text-white"
            >
              Crear
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default AddSellerModal;
