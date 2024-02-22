import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaRegCreditCard,
  FaPhone,
  FaRegCalendarDays,
  FaRegClock,
} from "react-icons/fa6";
import paypal_method from "../../assets/images/payment-methods/paypal-method.png";
import niubiz_method from "../../assets/images/payment-methods/niubiz-method.jpg";
import Stage from "./Stage";
import useECommerce from "../../hooks/useECommerce";
import { format, parseISO } from "date-fns";

const schema = yup.object({
  document_type: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  document_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive("El campo debe ser positivo")
    .integer()
    .required("El campo es requerido"),
  first_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(50)
    .required("El campo es requerido"),
  last_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(100)
    .required("El campo es requerido"),
  email: yup
    .string()
    .email("Ingrese un correo valido")
    .max(200)
    .required("El campo es requerido"),
  birthdate: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .optional(),
  phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  delivery_first_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(50)
    .required("El campo es requerido"),
  delivery_last_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Ingrese un valor valido")
    .max(100)
    .required("El campo es requerido"),
  delivery_region: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_location: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_address: yup.string().max(300).required("El campo es requerido"),
  delivery_address_reference: yup
    .string()
    .max(300)
    .nullable()
    .transform((value) => (value ? value : null))
    .optional(),
  delivery_date: yup
    .date()
    .typeError("El campo debe ser una fecha")
    .required("El campo es requerido"),
  delivery_hour: yup
    .number()
    .typeError("Eliga una opción valida")
    .required("El campo es requerido"),
  delivery_phone_number: yup
    .number()
    .typeError("El campo debe ser númerico")
    .positive()
    .integer()
    .required("El campo es requerido"),
  payment_method: yup.string().required("El campo es requerido"),
});

const Order = () => {
  const {
    register,
    setError,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const { cart } = useECommerce();

  const total_price_items = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const [stage, setStage] = useState(1);

  const handle_click_next_btn = (current_stage) => {
    switch (current_stage) {
      case 1:
        // fields to validate
        const document_type = getValues("document_type");
        const document_number = getValues("document_number");
        const first_name = getValues("first_name");
        const last_name = getValues("last_name");
        const email = getValues("email");
        const birthdate = getValues("birthdate");
        const phone_number = getValues("phone_number");

        const schema_stage1 = schema.pick([
          "document_type",
          "document_number",
          "first_name",
          "last_name",
          "email",
          "birthdate",
          "phone_number",
        ]);

        schema_stage1
          .validate(
            {
              document_type,
              document_number,
              first_name,
              last_name,
              email,
              birthdate,
              phone_number,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            setStage(stage + 1);
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
        const delivery_first_name = getValues("delivery_first_name");
        const delivery_last_name = getValues("delivery_last_name");
        const delivery_region = getValues("delivery_region");
        const delivery_location = getValues("delivery_location");
        const delivery_address = getValues("delivery_address");
        const delivery_address_reference = getValues(
          "delivery_address_reference"
        );
        const delivery_date = getValues("delivery_date");
        const delivery_hour = getValues("delivery_hour");
        const delivery_phone_number = getValues("delivery_phone_number");

        const schema_stage2 = schema.pick([
          "delivery_first_name",
          "delivery_last_name",
          "delivery_region",
          "delivery_location",
          "delivery_address",
          delivery_address_reference,
          "delivery_date",
          "delivery_hour",
          "delivery_phone_number",
        ]);

        schema_stage2
          .validate(
            {
              delivery_first_name,
              delivery_last_name,
              delivery_region,
              delivery_location,
              delivery_address,
              delivery_address_reference,
              delivery_date,
              delivery_hour,
              delivery_phone_number,
            },
            { abortEarly: false }
          )
          .then((valid) => {
            console.log(valid);
            setStage(stage + 1);
          })
          .catch((errors) => {
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

  const handle_click_previous_btn = () => {
    setStage(stage - 1);
  };

  const onSubmit = (data) => {
    console.log("debug");
    console.log(data);
  };

  const delivery_hours = ["08:00-12:00", "13:00-17:00", "16:00-20:00"];

  console.log("watch ->", watch("delivery_date"));
  console.log("watch ->", watch("delivery_hour"));

  return (
    <div className="mx-auto px-4 max-w-7xl ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row items-start gap-x-10 gap-y-10 mt-5 mb-12"
      >
        <div className="flex flex-col w-full lg:w-3/5 text-sm">
          <div className="flex flex-col gap-y-2 ">
            <Stage
              stage={1}
              title={"Información Personal"}
              description={
                "Datos para tu compra y contacto en caso de alguna consulta."
              }
              border-gray-400
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-3 border text-gray-600`}
              >
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="document_type"
                  >
                    Tipo de documento <span>*</span>
                  </label>
                  <select
                    {...register("document_type")}
                    id="document_type"
                    className={`${
                      errors.document_type
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } px-3.5 py-2 border border-gray-400 rounded-3xl w-full outline-none`}
                  >
                    <option value>Seleccionar</option>
                    <option value="1">DNI</option>
                    <option value="2">RUC</option>
                    <option value="3">Pasaporte</option>
                    <option value="4">CE - Carnet de Extranjería</option>
                    <option value="5">CI - Cédula de Identidad</option>
                  </select>
                  {errors.document_type && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.document_type.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="document_number"
                  >
                    Nro. de documento <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("document_number")}
                    id="document_number"
                    placeholder="Ingresar DNI"
                    className={`${
                      errors.document_number
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.document_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.document_number.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="first_name"
                  >
                    Nombres <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("first_name")}
                    id="first_name"
                    placeholder="Ingresar Nombres"
                    className={`${
                      errors.first_name
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="last_name"
                  >
                    Apellidos <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("last_name")}
                    id="last_name"
                    placeholder="Ingresar Apellidos"
                    className={`${
                      errors.last_name
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="email"
                  >
                    Correo electronico <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    id="email"
                    placeholder="Ingresar Correo electronico"
                    className={`${
                      errors.email ? "border-red-400 focus:border-red-600" : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="birthdate"
                  >
                    Fecha Nacimiento (opcional)
                  </label>
                  <input
                    type="date"
                    {...register("birthdate")}
                    id="birthdate"
                    placeholder="Fecha nacimiento"
                    className={`${
                      errors.birthdate
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.birthdate && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="phone_number"
                  >
                    Celular <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    {...register("phone_number")}
                    id="phone_number"
                    placeholder="Ingresar Celular"
                    className={`${
                      errors.phone_number
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_next_btn(1);
                    }}
                    className="bg-rose-500 hover:bg-rose-600 px-10 py-2.5 border rounded-3xl font-bold text-white text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    siguiente
                  </button>
                </div>
              </div>
            </Stage>

            <Stage
              stage={2}
              title={"Entrega"}
              description={"Información de Delivery."}
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-3 border text-gray-600">
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_first_name"
                  >
                    Nombres <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_first_name")}
                    id="delivery_first_name"
                    placeholder="Ingresar Nombres"
                    className={`${
                      errors.delivery_first_name
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_first_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_first_name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_last_name"
                  >
                    Apellidos <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_last_name")}
                    id="delivery_last_name"
                    placeholder="Ingresar Apellidos"
                    className={`${
                      errors.delivery_last_name
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_last_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_last_name.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_region"
                  >
                    Región <span>*</span>
                  </label>
                  <select
                    {...register("delivery_region")}
                    id="delivery_region"
                    className={`${
                      errors.delivery_region
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } px-3.5 py-2 border border-gray-400 rounded-3xl w-full outline-none`}
                  >
                    <option value>Seleccionar región</option>
                    <option value="1">R1</option>
                    <option value="2">R2</option>
                    <option value="3">R3</option>
                  </select>
                  {errors.delivery_region && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_region.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_location"
                  >
                    Localidad (costo de envio) <span>*</span>
                  </label>
                  <select
                    {...register("delivery_location")}
                    id="delivery_location"
                    className={`${
                      errors.delivery_location
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } px-3.5 py-2 border border-gray-400 rounded-3xl w-full outline-none`}
                  >
                    <option value>Seleccionar localidad</option>
                    <option value="1">L1</option>
                    <option value="2">L2</option>
                    <option value="3">L3</option>
                  </select>
                  {errors.delivery_location && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_location.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_address"
                  >
                    Dirección de entrega <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_address")}
                    id="delivery_address"
                    placeholder="Número de la casa y nombre la calle"
                    className={`${
                      errors.delivery_address
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_address && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_address.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_address_reference"
                  >
                    Referencia <span>(opcional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_address_reference")}
                    id="delivery_address_reference"
                    placeholder="Ingresar Referencia"
                    className={`${
                      errors.delivery_address_reference
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_address_reference && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_address_reference.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_date"
                  >
                    Fecha de entrega <span>*</span>
                  </label>
                  <input
                    type="date"
                    {...register("delivery_date")}
                    id="delivery_date"
                    placeholder="Fecha nacimiento"
                    className={`${
                      errors.delivery_date
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_date && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_date.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_hour"
                  >
                    Hora de entrega <span>*</span>
                  </label>
                  <select
                    {...register("delivery_hour")}
                    id="delivery_hour"
                    className={`${
                      errors.delivery_hour
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } px-3.5 py-2 border border-gray-400 rounded-3xl w-full outline-none`}
                  >
                    <option value="">Seleccionar horario</option>
                    <option value="1">08:00-12:00</option>
                    <option value="2">13:00-17:00</option>
                    <option value="3">16:00-20:00</option>
                  </select>
                  {errors.delivery_hour && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_hour.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_phone_number"
                  >
                    Celular <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_phone_number")}
                    id="delivery_phone_number"
                    placeholder="Ingresar Celular"
                    className={`${
                      errors.delivery_phone_number
                        ? "border-red-400 focus:border-red-600"
                        : ""
                    } focus:bg-gray-50 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_phone_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.delivery_phone_number.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_previous_btn();
                    }}
                    className="bg-white hover:bg-gray-100 shadow px-10 py-2.5 border-2 rounded-3xl font-bold text-gray-700 text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handle_click_next_btn(2);
                    }}
                    className="bg-rose-500 hover:bg-rose-600 shadow px-10 py-2.5 border-2 rounded-3xl font-bold text-white text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    siguiente
                  </button>
                </div>
              </div>
            </Stage>

            <Stage
              stage={3}
              title={"Pago"}
              description={"Seleccionar método de pago."}
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <ul className="grid grid-cols-1 mt-2 border text-gray-600 text-xs">
                    <li className="flex items-center border border-gray-200 ps-5">
                      <input
                        type="radio"
                        {...register("payment_method")}
                        value="niubiz"
                        id="niubiz"
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="niubiz"
                        className="flex items-center justify-between gap-x-2 py-3 w-full cursor-pointer pe-5 ps-3"
                      >
                        <div className="flex items-center gap-x-4">
                          <span className="flex items-center justify-center bg-purple-200 rounded-full min-w-10 min-h-10">
                            <FaRegCreditCard className="text-2xl text-purple-600" />
                          </span>
                          <div>
                            <p className="font-bold uppercase">
                              Pago mediante Niubiz
                            </p>
                            <p>Visa, Mastercard, American Express, Yape</p>
                          </div>
                        </div>
                        <img
                          src={niubiz_method}
                          alt=""
                          className="w-36 h-14 object-contain"
                        />
                      </label>
                    </li>

                    <li className="flex items-center border border-gray-200 ps-5">
                      <input
                        type="radio"
                        {...register("payment_method")}
                        value="paypal"
                        id="paypal"
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="paypal"
                        className="flex items-center justify-between gap-x-2 py-3 w-full cursor-pointer pe-5 ps-3"
                      >
                        <div className="flex items-center gap-x-4">
                          <span className="flex items-center justify-center bg-purple-200 rounded-full min-w-10 min-h-10">
                            <FaRegCreditCard className="text-2xl text-purple-600" />
                          </span>
                          <div>
                            <p className="font-bold uppercase">
                              Pago mediante Paypal
                            </p>
                            <p>
                              Visa, Mastercard, Maestro, American Express,
                              Paypal
                            </p>
                          </div>
                        </div>
                        <img
                          src={paypal_method}
                          alt=""
                          className="w-36 h-14 object-contain"
                        />
                      </label>
                    </li>
                  </ul>
                  {errors.payment_method && (
                    <p className="text-red-500 text-xs ps-2">
                      {errors.payment_method.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_previous_btn();
                    }}
                    className="bg-white hover:bg-gray-100 shadow px-10 py-2.5 border-2 rounded-3xl font-bold text-gray-700 text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    anterior
                  </button>
                  <button type="submit">enviar</button>
                </div>
              </div>
            </Stage>
          </div>
          <div className="md:flex flex-col gap-y-3 bg-gray-200 mt-10 p-5 rounded-xl text-gray-700 text-xs hidden">
            <p className="font-bold">¿Necesitas ayuda?</p>
            <p>
              Contacta con nuestro canal de Atención al cliente en cualquier
              momento.
            </p>

            <a
              href="tel:51975032529"
              className="flex items-center gap-x-2 py-1 text-sm"
            >
              <span className="inline-block">
                <FaPhone />
              </span>{" "}
              +51 975032529
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 bg-white shadow-lg p-3 border border-gray-300 rounded-md w-full lg:w-2/5 text-gray-700 text-sm ">
          <div>
            <h5 className="font-bold uppercase">Resumen de tu pedido</h5>
            <span className="block bg-purple-800 mt-0.5 rounded-full w-10 h-[3px]"></span>
          </div>

          <div className="flex justify-between mt-1 text-gray-500">
            <div className="flex items-center gap-x-2">
              <span>
                <FaRegCalendarDays className="mb-1.5 text-2xl" />
              </span>
              <div>
                <p className="m-0 p-0 text-sm leading-3">Fecha de Delivery:</p>
                <span className="text-xs">
                  {watch("delivery_date")
                    ? format(parseISO(watch("delivery_date")), "dd/MM/yyyy")
                    : "-"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <span>
                <FaRegClock className="mb-1.5 text-2xl" />
              </span>
              <div>
                <p className="m-0 p-0 text-sm leading-3">Hora de Delivery:</p>
                <span className="text-xs">
                  {watch("delivery_hour")
                    ? delivery_hours[watch("delivery_hour") - 1]
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <ul>
              {cart.items.length &&
                cart.items.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-x-5 py-2"
                    >
                      <div className="relative w-auto">
                        <a href="">
                          <img
                            src={`images/products/${item.product.image_url}`}
                            alt="product image"
                            className="border rounded-md w-16 h-16 object-contain"
                          />
                        </a>
                        <span className="top-0 right-0 absolute flex items-center justify-center bg-gray-500 rounded-full w-5 h-5 font-bold text-white text-xs transform -translate-y-1/2 translate-x-[5px]">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <a href="">{item.product.name}</a>
                        <p className="font-bold text-xs">
                          Precio unidario{" "}
                          <span>S/ {item.product.price.toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="text-right w-2/12 sm:w-3/12">
                        <p>
                          S/ {(item.quantity * item.product.price).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div>
            <p className="text-center">¿Tienes un cupón o vale de descuento?</p>
            <div className="flex gap-x-2 mt-2">
              <input
                type="text"
                name="coupon"
                id="document_number"
                placeholder="Ingrese su código."
                className={` focus:bg-gray-50 w-9/12 px-3.5 py-2 border border-gray-400 focus:border-gray-600 rounded-3xl  transition-all duration-200 ease-in-out cursor-pointer outline-none`}
              />
              <button
                type="button"
                className="bg-white hover:bg-rose-50 px-5 py-2.5 border border-rose-600 rounded-3xl w-3/12 font-bold text-rose-500 text-xs uppercase transition-all duration-300 ease-in-out"
              >
                Aplicar
              </button>
            </div>
          </div>

          <ul className="mt-2">
            <li className="flex items-center justify-between py-2.5 border-t text-sm">
              <p>Subtotal</p>
              <p className="font-bold">S/ {total_price_items.toFixed(2)}</p>
            </li>
            <li className="flex items-center justify-between py-2.5 border-t text-sm">
              <p>Transporte</p>
              <p className="font-bold">S/ {12}</p>
            </li>
            <li className="flex items-center justify-between py-2.5 border-t text-sm">
              <p>Total (impuestos inc.)</p>
              <p className="font-bold text-xl">S/ {"1,068.00"}</p>
            </li>
          </ul>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("privacy_policies")}
                id="privacy_policies"
                checked
              />
              <label
                htmlFor="privacy_policies"
                className="py-1 cursor-pointer ps-2"
              >
                He leído y aceptado la{" "}
                <a href="" className="font-bold text-rose-500">
                  Política de Privacidad
                </a>{" "}
                (*)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("terms_service")}
                id="terms_service"
              />
              <label
                htmlFor="terms_service"
                className="py-1 cursor-pointer ps-2"
              >
                Acepto los{" "}
                <a href="" className="font-bold text-rose-500">
                  términos de servicio
                </a>{" "}
                (*)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("subscribe_newsletter")}
                id="subscribe_newsletter"
              />
              <label
                htmlFor="subscribe_newsletter"
                className="py-1 cursor-pointer ps-2"
              >
                Suscribirse a nuestro boletín de noticias.
              </label>
            </div>
          </div>

          <div className="my-5">
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 px-5 py-2.5 border rounded-3xl w-full font-bold text-white uppercase transition-all duration-300 ease-in-out"
            >
              Realizar pedido
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
