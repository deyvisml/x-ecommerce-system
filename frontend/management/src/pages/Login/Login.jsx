import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios_client from "../../helpers/axios";
import { useNavigate } from "react-router-dom";
import useManagement from "../../hooks/useManagement";
import { Link } from "react-router-dom";
import auth_decoration from "../../../public/images/others/auth-decoration.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./LoginSchema";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";
import logo from "../../../public/images/logos/logo.svg";

const Login = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { set_token, set_user, set_role, set_store } = useManagement();

  useEffect(() => {
    set_token();
    set_user();
    set_role();
    set_store();
  }, []);

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

      if (!roles.includes("administrador") && !roles.includes("vendedor"))
        throw new Error("Usuario sin rol valido");

      set_token(response.data.data.token);
      set_user(response.data.data.user);

      return navigate("/escoger-rol");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    document.title = `Iniciar sesión - Florecer Contigo`;
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
              {t("login.title")} ✨
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

              <div>
                <label
                  className="block pb-1 font-semibold text-sm"
                  htmlFor="password"
                >
                  {t("general.fields.password.label")}
                </label>
                <input
                  className="border-slate-300 rounded w-full"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.password.message)}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Link to="cambiar-contraseña" className="underline">
                  {t("login.forgot_password")}
                </Link>
                <button
                  className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded font-bold text-white transition-all duration-200 ease-in-out"
                  type="submit"
                >
                  {t("general.buttons.enter")}
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
    </div>
  );
};

export default Login;
