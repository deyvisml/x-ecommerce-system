import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import UploadImageDropzone from "./UploadImageDropzone";
import SwitchInput from "../../../components/SwitchInput";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { token } = useManagement();

  const {
    register,
    control,
    watch,
    setValue,
    setError,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      in_offer: false,
      quantity: 1,
      discount_rate: 0,
      in_stock: true,
      state_id: 1,
    },
    resolver: yupResolver(schema),
  });

  const [categories, setCategories] = useState([]);
  const fetch_categories = async () => {
    try {
      const response = await axios_client(`/api/categories`, {
        method: "get",
        headers: {
          authorization: "Bearer ",
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [collections, setCollections] = useState([]);
  const fetch_collections_by_category = async (category_id) => {
    try {
      const response = await axios_client(`/api/collections`, {
        method: "get",
        params: {
          filtering: [
            {
              column: "collections.category_id",
              values: [category_id],
            },
          ],
        },
        headers: {
          authorization: "Bearer ",
        },
      });

      setCollections(response.data.data);
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
              values: [1, 2, 9],
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

  useEffect(() => {
    (async () => {
      await fetch_categories();
      await fetch_states();
      reset();
    })();
  }, []);

  useEffect(() => {
    if (watch("category_id") !== undefined) {
      fetch_collections_by_category(watch("category_id"));
    }

    setValue("collection_id", "");
  }, [watch("category_id")]);

  const onSubmit = async (data) => {
    console.log(data);

    const form_data = new FormData();

    for (let key in data) {
      if (key == "image") {
        form_data.append(key, data[key][0]);
      } else {
        form_data.append(key, data[key]);
      }
    }

    try {
      const response = await axios_client(`/api/products`, {
        method: "post",
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
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
        reset();
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

  const handle_click_discard_btn = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">
          Añadir Producto
        </h3>
      </div>

      <div className="mt-6">
        <ul className="flex justify-end items-center gap-4">
          <li>
            <button
              type="button"
              onClick={handle_click_discard_btn}
              className="bg-indigo-50 hover:bg-indigo-100 text-gray-400 btn"
            >
              Descartar
            </button>
          </li>
          {/*<li>
            <button
              type="button"
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-500 btn"
            >
              Guardar borrador
            </button>
          </li>*/}
          <li>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
            >
              Publicar producto
            </button>
          </li>
        </ul>
      </div>

      <div className="gap-6 grid grid-cols-3 mt-6">
        <div className="flex flex-col gap-6 col-span-full lg:col-span-2">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              Información del producto
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="name" className="block text-xs">
                  Nombre
                </label>
                <input
                  {...register("name")}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Nombre del producto"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.name && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="sku" className="block text-xs">
                  SKU
                </label>
                <input
                  {...register("sku")}
                  name="sku"
                  id="sku"
                  type="text"
                  placeholder="SKU"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.sku && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.sku.message}
                  </p>
                )}
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="block text-xs">
                  Descripción
                </label>
                <textarea
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                  {...register("description")}
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>
                {errors.description && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Imagen del producto</h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <UploadImageDropzone
                  name={"image"}
                  register={register}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                  schema={schema}
                />
                {errors.image && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full lg:col-span-1">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Precio</h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="price" className="block text-xs">
                  Precio base
                </label>
                <input
                  {...register("price")}
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Precio"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.price && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="discount_rate" className="block text-xs">
                  Descuento (%)
                </label>
                <input
                  {...register("discount_rate")}
                  name="discount_rate"
                  id="discount_rate"
                  type="number"
                  placeholder="Descuento"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.discount_rate && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.discount_rate.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="in_offer" className="block text-base">
                    En oferta
                  </label>

                  <Controller
                    name="in_offer"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.in_offer && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.in_offer.message}
                  </p>
                )}
              </div>

              <hr className="col-span-full" />

              <div className="col-span-full">
                <label htmlFor="quantity" className="block text-xs">
                  Cantidad
                </label>
                <input
                  {...register("quantity")}
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Cantidad"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.quantity && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="in_stock" className="block text-base">
                    En stock
                  </label>

                  <Controller
                    name="in_stock"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.in_stock && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.in_stock.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Organizar</h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="category_id" className="block text-xs">
                  Categoria
                </label>
                <select
                  {...register("category_id")}
                  name="category_id"
                  id="category_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
                >
                  <option value={""}>Seleccionar</option>
                  {categories.map((category, i) => {
                    return (
                      <option key={i} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                {errors.category_id && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="collection_id" className="block text-xs">
                  Colección
                </label>
                <select
                  {...register("collection_id")}
                  name="collection_id"
                  id="collection_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
                >
                  <option value={""}>Seleccionar</option>
                  {collections.map((collection, i) => {
                    return (
                      <option key={i} value={collection.id}>
                        {collection.name}
                      </option>
                    );
                  })}
                </select>
                {errors.collection_id && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {errors.collection_id.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="state_id" className="block text-xs">
                  Estado
                </label>
                <select
                  {...register("state_id")}
                  name="state_id"
                  id="state_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
                >
                  <option value={""}>Seleccionar</option>
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
                    {errors.state_id.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
