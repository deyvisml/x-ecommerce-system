import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import logo_white from "../../../public/images/logos/logo-white.png";
import { Link } from "react-router-dom";
import {
  LockClosedIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

import StageDone from "./StageDone";

const SellerRegistration = () => {
  const [current_stage, setCurrentStage] = useState(3);
  const [show_stage, setShowStage] = useState();

  const {
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const handle_click_continue_btn = (stage) => {
    switch (stage) {
      case 1:
        // fields to validate
        const email = getValues("email");
        const password = getValues("password");

        // getting a specific scheme
        const schema_stage1 = schema.pick(["email", "password"]);

        schema_stage1
          .validate(
            {
              email,
              password,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            setCurrentStage(current_stage == stage ? stage + 1 : current_stage);
            setShowStage();
            console.log(show_stage);
          })
          .catch((errors) => {
            console.log("debug:", errors);
            errors.inner.forEach(({ message, path }) => {
              console.log(message, path);
              setError(path, { type: "custom", message });
            });
          });
        break;

      case 2:
        // fields to validate
        const first_name = getValues("first_name");
        const last_name = getValues("last_name");
        const phone_number = getValues("phone_number");

        // getting a specific scheme
        const schema_stage2 = schema.pick([
          "first_name",
          "last_name",
          "phone_number",
        ]);

        schema_stage2
          .validate(
            {
              first_name,
              last_name,
              phone_number,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            setCurrentStage(current_stage == stage ? stage + 1 : current_stage);
            setShowStage();
            console.log(show_stage);
          })
          .catch((errors) => {
            console.log("debug:", errors);
            errors.inner.forEach(({ message, path }) => {
              console.log(message, path);
              setError(path, { type: "custom", message });
            });
          });
        break;

      case 3:
        // fields to validate
        const ruc = getValues("ruc");
        const business_name = getValues("business_name");
        const bank = getValues("bank");
        const bank_account_number = getValues("bank_account_number");

        // getting a specific scheme
        const schema_stage3 = schema.pick([
          "ruc",
          "business_name",
          "bank",
          "bank_account_number",
        ]);

        schema_stage3
          .validate(
            {
              ruc,
              business_name,
              bank,
              bank_account_number,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            setCurrentStage(current_stage == stage ? stage + 1 : current_stage);
            setShowStage();
            console.log(show_stage);
          })
          .catch((errors) => {
            console.log("debug:", errors);
            errors.inner.forEach(({ message, path }) => {
              console.log(message, path);
              setError(path, { type: "custom", message });
            });
          });
        break;

      default:
        break;
    }
  };

  const banks = [
    {
      id: 1,
      name: "BCP",
    },
    {
      id: 2,
      name: "Interbank",
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-rose-500 text-white">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-4">
            <Link to="/">
              <img src={logo_white} alt="" className="w-36" />
            </Link>
            <div>
              <p>item</p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-grow justify-center items-center bg-slate-200">
        <div className="bg-white px-8 py-10 rounded-md w-full md:max-w-lg">
          <h2 className="mb-4 font-bold text-2xl text-slate-800">
            Registrar empresa
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="text-slate-800 text-sm"
          >
            {show_stage ? (
              show_stage == 1 ? (
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="email"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
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
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      handle_click_continue_btn(1);
                    }}
                    type="button"
                    className="bg-rose-400 hover:bg-rose-500 mt-2 px-3 py-[9px] rounded font-semibold text-white transition-all duration-200 ease-in-out"
                  >
                    Continuar
                  </button>
                </div>
              ) : show_stage == 2 ? (
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="first_name"
                    >
                      Nombre
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="first_name"
                      id="first_name"
                      {...register("first_name", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="last_name"
                    >
                      Apelildos
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="last_name"
                      id="last_name"
                      {...register("last_name", { required: true })}
                    />
                    {errors.last_name && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="phone_number"
                    >
                      Teléfono
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="phone_number"
                      id="phone_number"
                      {...register("phone_number", { required: true })}
                    />
                    {errors.phone_number && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      handle_click_continue_btn(2);
                    }}
                    type="button"
                    className="bg-rose-400 hover:bg-rose-500 mt-2 px-3 py-[9px] rounded font-semibold text-white transition-all duration-200 ease-in-out"
                  >
                    Continuar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-y-4">
                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="ruc"
                    >
                      RUC
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="ruc"
                      id="ruc"
                      {...register("ruc", { required: true })}
                    />
                    {errors.ruc && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.ruc.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="business_name"
                    >
                      Razón social
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="business_name"
                      id="business_name"
                      {...register("business_name", { required: true })}
                    />
                    {errors.business_name && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.business_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="bank"
                    >
                      Entidad bancaria
                    </label>

                    <select
                      {...register("bank")}
                      id="bank"
                      className={
                        "border-slate-300 focus:border-slate-500 px-2 py-[9px] border rounded w-full outline-none"
                      }
                    >
                      <option value="0">Seleccionar</option>
                      {banks &&
                        banks.map(({ id, name }) => {
                          return (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          );
                        })}
                    </select>

                    {errors.bank && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.bank.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="bank_account_number"
                    >
                      Nº Cuenta interbancaria (CCI)
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="bank_account_number"
                      id="bank_account_number"
                      {...register("bank_account_number", { required: true })}
                    />
                    {errors.bank_account_number && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.bank_account_number.message}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      handle_click_continue_btn(3);
                    }}
                    type="button"
                    className="bg-rose-400 hover:bg-rose-500 mt-2 px-3 py-[9px] rounded font-semibold text-white transition-all duration-200 ease-in-out"
                  >
                    Continuar
                  </button>
                </div>
              )
            ) : (
              <ul>
                <StageDone
                  stage={1}
                  setShowStage={setShowStage}
                  current_stage={current_stage}
                  name={"Datos de acceso"}
                  description={"Información para el inicio de sesión."}
                  icon={
                    <LockClosedIcon className="inline-block w-6 text-rose-600" />
                  }
                />
                <StageDone
                  stage={2}
                  setShowStage={setShowStage}
                  current_stage={current_stage}
                  name={"Datos personales"}
                  description={"Información del representante de la tienda."}
                  icon={<UserIcon className="inline-block w-6 text-rose-600" />}
                />
                <StageDone
                  stage={3}
                  setShowStage={setShowStage}
                  current_stage={current_stage}
                  name={"Datos de la tienda"}
                  description={"Información legal de la tienda."}
                  icon={
                    <BuildingStorefrontIcon className="inline-block w-6 text-rose-600" />
                  }
                />
              </ul>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default SellerRegistration;
