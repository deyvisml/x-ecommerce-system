import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios_client from "../../helpers/axios";
import { motion, AnimatePresence } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { schema } from "./schema";
import { schema_with_token } from "./schema_with_token";

import { Link } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";
import {
  LockClosedIcon,
  UserIcon,
  BuildingStorefrontIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import Stage from "./Stage";

const StoreRegistration = () => {
  let navigate = useNavigate();
  const { token } = useECommerce();
  console.log("token", token);
  const [store_registration, setStoreRegistration] = useState(
    JSON.parse(localStorage.getItem("STORE_REGISTRATION")) || {
      data: {},
      completed_stages: [],
    }
  );
  const [show_stage, setShowStage] = useState();
  const [completed_stages, setCompletedStages] = useState(
    new Set(token ? null : store_registration.completed_stages)
  );
  const {
    watch,
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: store_registration?.data?.email ?? undefined,
      password: undefined,
      first_name: store_registration?.data?.first_name ?? undefined,
      last_name: store_registration?.data?.last_name ?? undefined,
      phone_number: store_registration?.data?.phone_number ?? undefined,
      store_name: store_registration?.data?.store_name ?? undefined,
      ruc: store_registration?.data?.ruc ?? undefined,
      business_name: store_registration?.data?.business_name ?? undefined,
      bank: store_registration?.data?.bank ?? undefined,
      bank_account_number:
        store_registration?.data?.bank_account_number ?? undefined,
    },
    resolver: yupResolver(token ? schema_with_token : schema),
  });

  const validate_stage_fields = (stage) => {
    switch (stage) {
      case 1:
        // fields to validate
        const email = getValues("email");
        const password = getValues("password");

        // getting a specific scheme
        const schema_stage1 = schema.pick(["email", "password"]);

        return schema_stage1
          .validate(
            {
              email,
              password,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            return { with_errors: false };
          })
          .catch((errors) => {
            console.log("errors:", errors);
            return { with_errors: true, errors };
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

        return schema_stage2
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
            return { with_errors: false };
          })
          .catch((errors) => {
            console.log("errors:", errors);
            return { with_errors: true, errors };
          });
        break;

      case 3:
        // fields to validate
        const store_name = getValues("store_name");
        const ruc = getValues("ruc");
        const business_name = getValues("business_name");
        const bank = getValues("bank");
        const bank_account_number = getValues("bank_account_number");

        // getting a specific scheme
        const schema_stage3 = schema.pick([
          "store_name",
          "ruc",
          "business_name",
          "bank",
          "bank_account_number",
        ]);

        return schema_stage3
          .validate(
            {
              store_name,
              ruc,
              business_name,
              bank,
              bank_account_number,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            return { with_errors: false };
          })
          .catch((errors) => {
            console.log("errors:", errors);
            return { with_errors: true, errors };
          });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "STORE_REGISTRATION",
      JSON.stringify(store_registration)
    );
  }, [store_registration]);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // to avoid undefined values
      console.log(name);
      if (name) {
        setStoreRegistration((current_store_registration) => {
          const new_store_registration = cloneDeep(current_store_registration);
          new_store_registration.data[name] = value[name];
          return new_store_registration;
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handle_click_continue_btn = async (stage) => {
    const validation = await validate_stage_fields(stage);

    if (validation.with_errors) {
      validation.errors.inner.forEach(({ message, path }) => {
        console.log(message, path);
        setError(path, { type: "custom", message });
      });
    } else {
      setCompletedStages((current_completed_stages) => {
        const new_completed_stages = cloneDeep(current_completed_stages);
        new_completed_stages.add(stage);

        setStoreRegistration((current_store_registration) => {
          const new_store_registration = cloneDeep(current_store_registration);
          const new_completed_stages_copy = cloneDeep(new_completed_stages);
          new_completed_stages_copy.delete(1); // to always not save in LocalStorage that the first stage is save (for security)

          new_store_registration.completed_stages = [
            ...new_completed_stages_copy,
          ];
          return new_store_registration;
        });

        return new_completed_stages;
      });
      setShowStage();
    }
  };

  const handle_click_return_btn = async (stage) => {
    const validation = await validate_stage_fields(stage);

    if (validation.with_errors) {
      // removing the stage from completed stages set

      setCompletedStages((current_completed_stages) => {
        const new_completed_stages = cloneDeep(current_completed_stages);
        new_completed_stages.delete(stage);

        setStoreRegistration((current_store_registration) => {
          const new_store_registration = cloneDeep(current_store_registration);
          const new_completed_stages_copy = cloneDeep(new_completed_stages);
          new_completed_stages_copy.delete(1); // to always not save in LocalStorage that the first stage is save (for security)

          new_store_registration.completed_stages = [
            ...new_completed_stages_copy,
          ];
          return new_store_registration;
        });

        return new_completed_stages;
      });
    }

    setShowStage();
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

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios_client(
        token
          ? `/api/stores/seller-store-registration-auth`
          : `/api/stores/seller-store-registration`,
        {
          method: "post",
          data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.status) {
        if (response.data.type_error == "email-error") {
          setShowStage(1);
        }
        throw new Error(response.data.message);
      }

      navigate(`confirmación`);
    } catch (error) {
      console.error(error);
      toast.error(error.message, { autoClose: 5000 });
    }
  };

  return (
    <main className="flex flex-grow justify-center items-center bg-slate-200">
      <div className="w-full md:max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="text-slate-800 text-sm"
        >
          <AnimatePresence mode="wait">
            {show_stage ? (
              show_stage == 1 ? (
                <motion.div
                  key="stage1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-y-4 bg-white px-8 py-10 rounded-md"
                >
                  <div>
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => handle_click_return_btn(1)}
                        type="button"
                        className="hover:bg-blue-100 px-3 py-2 rounded text-blue-600 transition-all duration-300 ease-in-out"
                      >
                        <ArrowLeftIcon className="w-4" />
                      </button>
                      <h4 className="font-semibold text-base">
                        Datos de acceso
                      </h4>
                    </div>
                    <hr />
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="email"
                    >
                      Correo electrónico
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
                </motion.div>
              ) : show_stage == 2 ? (
                <motion.div
                  key="stage2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-y-4 bg-white px-8 py-10 rounded-md"
                >
                  <div>
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => handle_click_return_btn(2)}
                        type="button"
                        className="hover:bg-blue-100 px-3 py-2 rounded text-blue-600 transition-all duration-300 ease-in-out"
                      >
                        <ArrowLeftIcon className="w-4" />
                      </button>
                      <h4 className="font-semibold text-base">
                        Datos personales
                      </h4>
                    </div>
                    <hr />
                  </div>

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
                </motion.div>
              ) : (
                <motion.div
                  key="stage3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-y-4 bg-white px-8 py-10 rounded-md"
                >
                  <div>
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() => handle_click_return_btn(3)}
                        type="button"
                        className="hover:bg-blue-100 px-3 py-2 rounded text-blue-600 transition-all duration-300 ease-in-out"
                      >
                        <ArrowLeftIcon className="w-4" />
                      </button>
                      <h4 className="font-semibold text-base">
                        Datos de la tienda
                      </h4>
                    </div>
                    <hr />
                  </div>

                  <div>
                    <label
                      className="block pb-1 font-semibold text-sm"
                      htmlFor="store_name"
                    >
                      Nombre
                    </label>
                    <input
                      className="border-slate-300 focus:border-slate-500 px-3 py-2 border rounded w-full outline-none"
                      type="store_name"
                      id="store_name"
                      {...register("store_name", { required: true })}
                    />
                    {errors.store_name && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {errors.store_name.message}
                      </p>
                    )}
                  </div>

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
                </motion.div>
              )
            ) : (
              <motion.div
                key="stages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
                className="bg-white px-8 py-10 rounded-md"
              >
                <h2 className="mb-4 font-bold text-2xl text-slate-800">
                  Solicitud registro de tienda
                </h2>
                <ul>
                  {!token && (
                    <>
                      <Stage
                        stage={1}
                        completed_stages={completed_stages}
                        setShowStage={setShowStage}
                        name={"Datos de acceso"}
                        description={"Información para el inicio de sesión."}
                        icon={
                          <LockClosedIcon className="inline-block w-6 text-rose-600" />
                        }
                      />
                      <Stage
                        stage={2}
                        completed_stages={completed_stages}
                        setShowStage={setShowStage}
                        name={"Datos personales"}
                        description={
                          "Información del representante de la tienda."
                        }
                        icon={
                          <UserIcon className="inline-block w-6 text-rose-600" />
                        }
                      />
                    </>
                  )}
                  <Stage
                    stage={3}
                    completed_stages={completed_stages}
                    setShowStage={setShowStage}
                    name={"Datos de la tienda"}
                    description={"Información legal de la tienda."}
                    icon={
                      <BuildingStorefrontIcon className="inline-block w-6 text-rose-600" />
                    }
                  />
                </ul>
                {completed_stages.size == (token ? 1 : 3) && (
                  <button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 mt-2 px-3 py-[9px] rounded w-full font-semibold text-sm text-white transition-all duration-200 ease-in-out"
                  >
                    Solicitar registro
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </main>
  );
};

export default StoreRegistration;
