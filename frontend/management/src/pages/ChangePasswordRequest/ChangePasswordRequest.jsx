import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios_client from "../../helpers/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth_decoration from "../../../public/images/others/auth-decoration.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { change_password_request_schema } from "./change_password_request_schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import MainLoader from "../../components/MainLoader";
import logo from "../../../public/images/logos/logo.svg";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";

const ChangePasswordRequest = () => {
  const { t } = useTranslation();
  const [showLoader, setShowLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(change_password_request_schema) });

  const onSubmit = async (data) => {
    setShowLoader(true);

    try {
      const response = await axios_client("/api/change-password-request", {
        method: "post",
        data: data,
      });

      if (!response.data.status) {
        throw new Error(response.data.message);
      }

      Swal.fire({
        icon: "success",
        title: "Solicitud Recibida!",
        text: response.data.message,
        confirmButtonText: "Continuar",
      });

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 4000,
      });
    }
    setShowLoader(false);
  };

  useEffect(() => {
    document.title = `Cambia tu contraseña - Florecer Contigo`;
  }, []);

  return (
    <div className="bg-neutral-100">
      <div className="flex h-screen">
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="mb-4">
            <Link to="/">
              <img src={logo} alt="" className="w-36 h-16 object-contain" />
            </Link>
          </div>
          <div className="bg-white px-4 py-6 rounded w-full max-w-md">
            <h2 className="mb-6 font-bold text-3xl text-slate-800">
              {t("change_password_request.title")} ✨
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-y-5 w-full text-sm"
            >
              <div>
                <label
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="email"
                >
                  {t("general.fields.email.label")}
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.email.message)}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center">
                <button
                  className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded font-bold text-white transition-all duration-200 ease-in-out"
                  type="submit"
                >
                  {t("general.buttons.change")}
                </button>
              </div>
            </form>
          </div>

          <div className="flex justify-center mt-5 w-full">
            <div className="inline-block w-40 text-xs">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            src="https://preview.cruip.com/mosaic/images/auth-image.jpg"
            alt=""
            className="w-full h-screen object-cover"
          />
        </div>
      </div>

      <div className="lg:block top-1/2 left-1/2 absolute hidden -translate-x-1/2 -translate-y-[160px]">
        <img src={auth_decoration} alt="" className="w-56" />
      </div>
      {showLoader && <MainLoader />}
    </div>
  );
};

export default ChangePasswordRequest;
