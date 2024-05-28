import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios_client from "../../helpers/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import auth_decoration from "../../../public/images/others/auth-decoration.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { password_recovery_schema } from "./password_recovery_schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLoader from "../../components/MainLoader";
import Swal from "sweetalert2";

const PasswordRecovery = () => {
  const query_params = new URLSearchParams(location.search);
  const token = query_params.get("t");
  const user_id = query_params.get("user_id");
  const [validationFinished, setValidationFinished] = useState(false);
  const [user, setUser] = useState();

  let navigate = useNavigate();

  console.log(token, user_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(password_recovery_schema) });

  const verifyRecoveryPasswordToken = async (token) => {
    try {
      const response = await axios_client(
        "/api/verify-recovery-password-token",
        {
          method: "post",
          data: {
            token,
            user_id,
          },
        }
      );

      if (!response.data.status) {
        throw new Error(response.data.message);
      }

      setUser(response.data.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message);
      navigate("/");
    }

    setTimeout(() => {
      setValidationFinished(true);
    }, 2000);
  };

  const onSubmit = async (fields) => {
    try {
      const response = await axios_client("/api/recovery-password", {
        method: "post",
        data: {
          password: fields.password,
          password_confirmation: fields.password_confirmation,
          token,
          user_id,
        },
      });

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada!",
        text: response.data.message,
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/");
        }
      });
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  useEffect(() => {
    verifyRecoveryPasswordToken(token);
  }, [token]);

  useEffect(() => {
    document.title = `Recupere su contraseña - Florecer Contigo`;
  }, []);

  return !validationFinished ? (
    <MainLoader />
  ) : (
    <div className="bg-neutral-100">
      <div className="flex h-screen">
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="mb-4">
            <Link to="/">
              <img
                src="https://raw.githubusercontent.com/deyvisml/x-ecommerce-system/main/frontend/client/src/assets/logo.svg"
                alt=""
                className="w-44"
              />
            </Link>
          </div>
          <div className="bg-white px-4 py-6 rounded w-full max-w-md">
            <h2 className="mb-6 font-bold text-3xl text-slate-800">
              ¿Olvidó su contraseña? ✨
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-y-5 w-full text-sm"
            >
              <div>
                <p
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="password"
                >
                  Correo: <span className="font-normal">{user.email}</span>
                </p>
              </div>

              <div>
                <label
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="password"
                >
                  Nueva contraseña
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="password"
                  maxLength={30}
                  id="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="password_confirmation"
                >
                  Confirmación
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="password"
                  maxLength={30}
                  id="password_confirmation"
                  {...register("password_confirmation", { required: true })}
                />
                {errors.password_confirmation && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center">
                <button
                  className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded font-bold text-white transition-all duration-200 ease-in-out"
                  type="submit"
                >
                  Cambiar
                </button>
              </div>
            </form>
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
    </div>
  );
};

export default PasswordRecovery;
