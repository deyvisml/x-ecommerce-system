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

const UploadDocumentsModal = ({
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
    resolver: yupResolver(upload_documents_schema),
  });

  const { token, store } = useManagement();

  const [fetches_finished, setFetchesFinished] = useState(false);
  useEffect(() => {
    (async () => {
      setFetchesFinished(true);
    })();
  }, []);

  const handle_click_cancel_btn = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const form_data = new FormData();

    for (let key in data) {
      if (key == "file") {
        form_data.append(key, data[key][0]);
      } else {
        form_data.append(key, data[key]);
      }
    }

    try {
      const response = await axios_client(
        `/api/stores/${store.id}/orders/${record.id}/order-document`,
        {
          method: "post",
          data: form_data,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Subido!",
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
        title={"Subir documento"}
        is_open_modal={is_modal_open}
        setIsOpenModal={setIsModalOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2 text-slate-600 text-sm">
            <div>
              <label htmlFor="kind" className="block font-semibold">
                Tipo
              </label>
              <select
                {...register("kind")}
                id="kind"
                className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
              >
                <option value={""}>Seleccionar</option>
                <option value={"ticket"}>Boleta</option>
                <option value={"invoice"}>Factura</option>
                <option value={"shipping"}>Envio</option>
              </select>
              {errors.kind && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.kind.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="file" className="block font-semibold">
                Documento
              </label>
              <input
                {...register("file")}
                id="file"
                type="file"
                className="border-slate-200 focus:border-indigo-400 mt-1 p-1.5 border rounded w-full focus:outline-none text-sm outline-none focus:ring-0"
                accept="application/pdf"
              />
              {errors.file && (
                <p className="pt-1 text-red-500 text-xs ps-1">
                  {errors.file.message}
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
              Subir
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default UploadDocumentsModal;
