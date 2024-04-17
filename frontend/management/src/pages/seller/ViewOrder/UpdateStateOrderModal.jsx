import React from "react";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { upload_documents_schema } from "./upload_documents_schema";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";

const UpdateStateOrderModal = ({
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
    defaultValues: {
      document_type_id: "",
      state_id: 1,
    },
    resolver: yupResolver(upload_documents_schema),
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

  const [fetches_finished, setFetchesFinished] = useState(false);
  useEffect(() => {
    (async () => {
      await fetch_document_types();
      setFetchesFinished(true);
    })();
  }, []);

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
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm cursor-default focus:ring-0"
                  value={"Pendiente"}
                  readOnly
                />
                <input
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm cursor-default focus:ring-0"
                  value={"01/02/03"}
                  readOnly
                />
                <input
                  className="border-slate-200 focus:border-slate-200 read-only:bg-slate-100 mt-1 px-2 py-1.5 border rounded w-full text-sm cursor-default focus:ring-0"
                  value={"10:45"}
                  readOnly
                />
              </div>
            </div>

            <hr />

            <div>
              <label htmlFor="document_type_id" className="block font-semibold">
                Nuevo estado
              </label>
              <select
                {...register("document_type_id")}
                id="document_type_id"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={""}>Seleccionar</option>
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
                  {errors.document_type_id.message}
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

export default UpdateStateOrderModal;
