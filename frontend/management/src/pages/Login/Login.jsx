import React from "react";
import { useForm } from "react-hook-form";
import axios_client from "../../helpers/axios";
import { useNavigate } from "react-router-dom";
import useManagement from "../../hooks/useManagement";
import { Link } from "react-router-dom";
import auth_decoration from "../../../public/images/auth-decoration.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./LoginSchema";

const Login = () => {
  let navigate = useNavigate();
  const { set_token, set_user } = useManagement();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios_client(`/api/auth/login`, {
        method: "post",
        data,
      });

      if (!response.data.status) throw new Error(response.data.message);

      const roles = response.data.data.user.roles.map((rol) => rol.name);

      if (!roles.includes("administrator") && !roles.includes("seller"))
        throw new Error("User without a valid role.");

      set_token(response.data.data.token);
      set_user(response.data.data.user);

      roles.includes("administrator")
        ? navigate(`/administrador`)
        : navigate(`/vendedor`);
    } catch (error) {
      toast.error(error.message, { autoClose: 4000 });
    }
  };

  return (
    <div className="bg-neutral-100">
      <div className="flex h-screen">
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="mb-4">
            <Link to="/">
              <img
                src="https://raw.githubusercontent.com/deyvisml/x-ecommerce-system/main/frontend/client/src/assets/logo.png"
                alt=""
                className="w-44"
              />
            </Link>
          </div>
          <div className="bg-white px-4 py-6 rounded w-full max-w-md">
            <h2 className="mb-6 font-bold text-3xl text-slate-800">
              Bienvenido de nuevo! ✨
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
                  Correo Electrónico
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Link to="cambiar-contraseña" className="underline">
                  Olvidaste tu contraseña?
                </Link>
                <button
                  className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded font-bold text-white transition-all duration-200 ease-in-out"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
            </form>

            {/*<hr className="mb-5" />
            <div>
              No tienes una cuenta?{" "}
              <Link to="" className="font-semibold text-rose-500">
                Registrate
              </Link>
            </div>*/}
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

export default Login;
