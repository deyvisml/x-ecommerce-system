import React, { useState, useEffect, useRef } from "react";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../../components/MainLoader";
import { useTranslation } from "react-i18next";

const EditProduct = () => {
  const { t } = useTranslation();
  const { token } = useManagement();
  const { product_id } = useParams();

  const [showLoader, setShowLoader] = useState(false);

  let navigate = useNavigate();

  const [product, setProduct] = useState();

  const fetch_product = async (product_id) => {
    try {
      const response = await axios_client(`/api/products/${product_id}`, {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const product = response.data.data;

      setProduct(product);

      return {
        name: product.name,
        sku: product.sku,
        description: product.description,
        image_names: product.image_names,
        price: product.price,
        discount_rate: product.discount_rate,
        in_offer: product.in_offer,
        quantity: product.quantity,
        in_stock: product.in_stock,
        is_customizable: product.is_customizable,
        customization_label: product.customization_label,
        category_id: product.category_id,
        collection_id: product.collection_id,
        state_id: product.state_id,
      };
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

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
    defaultValues: async () => {
      return await fetch_product(product_id);
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

  const [collections, setCollections] = useState();
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
              values: [1, 2, 3],
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
    fetch_categories();
    fetch_states();
  }, []);

  useEffect(() => {
    if (product) {
      fetch_collections_by_category(product.category_id);
    }
  }, [product]);

  // very usefull, this allows to succesfuly reset the default values.
  const [reset_form, setResetForm] = useState(true);
  useEffect(() => {
    if (collections && reset_form) {
      reset();
      setResetForm(false);
    }
  }, [collections]);

  const handle_click_discard_btn = () => {
    setResetForm(true);
    fetch_collections_by_category(product.category_id);
  };

  const handle_onchange_category_select = (e) => {
    const category_id = e.target.value;
    fetch_collections_by_category(category_id);

    setValue("collection_id", 0);
  };

  const onSubmit = async (data) => {
    console.log(data);

    setShowLoader(true);

    const form_data = new FormData();

    for (let key in data) {
      if (key == "images") {
        for (let i = 0; i < data[key].length; i++) {
          form_data.append(`images[]`, data[key][i]);
        }
      } else {
        form_data.append(key, data[key]);
      }
    }

    // allows to update with POST method (to send the image "binary"), but at the end makes a PUT method https://stackoverflow.com/questions/64887893/how-to-update-image-with-put-method-in-laravel-rest-api
    form_data.append("_method", "PUT");

    try {
      const response = await axios_client(`/api/products/${product_id}`, {
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
          title: t("alerts.titles.updated"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });

        return navigate("/vendedor/productos/listado");
      } else {
        Swal.fire({
          icon: "error",
          title: t("alerts.titles.error"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }

    setShowLoader(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">
          {t("edit_product.title")}
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
              {t("general.buttons.discard")}
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white btn"
            >
              {t("edit_product.edit_product")}
            </button>
          </li>
        </ul>
      </div>

      <div className="gap-6 grid grid-cols-3 mt-6">
        <div className="flex flex-col gap-6 col-span-full lg:col-span-2">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("edit_product.product_information")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="name" className="block text-xs">
                  {t("general.fields.name3.label")}
                </label>
                <input
                  {...register("name")}
                  name="name"
                  id="name"
                  type="text"
                  placeholder={t("general.fields.name3.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.name && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof t(errors.name.message) === "string"
                      ? t(errors.name.message)
                      : t(errors.name.message.key, errors.name.message.values)}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="sku" className="block text-xs">
                  {t("general.fields.sku.label")}
                </label>
                <input
                  {...register("sku")}
                  name="sku"
                  id="sku"
                  type="text"
                  placeholder={t("general.fields.sku.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.sku && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof t(errors.sku.message) === "string"
                      ? t(errors.sku.message)
                      : t(errors.sku.message.key, errors.sku.message.values)}
                  </p>
                )}
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="block text-xs">
                  {t("general.fields.description.label")}
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
                    {typeof t(errors.description.message) === "string"
                      ? t(errors.description.message)
                      : t(
                          errors.description.message.key,
                          errors.description.message.values
                        )}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("edit_product.product_image")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <UploadImageDropzone
                  name={"images"}
                  register={register}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                  schema={schema}
                />
                {errors.images && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof errors.images.message === "string"
                      ? t(errors.images.message)
                      : t(
                          errors.images.message.key,
                          errors.images.message.values
                        )}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label className="block text-xs">
                  {t("edit_product.current_image")}
                </label>
                <div className="mt-4">
                  {product && (
                    <ul className="flex flex-wrap gap-4">
                      {product.image_names.split(",").map((image_name) => (
                        <li className="border-2 shadow p-2 rounded">
                          <img
                            src={`${
                              import.meta.env.VITE_API_URL
                            }/storage/images/products/large/${image_name}`}
                            className="m-auto w-32 h-32 object-contain"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <input type="hidden" {...register("image_names")} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full lg:col-span-1">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("edit_product.price")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="price" className="block text-xs">
                  {t("general.fields.price.label")}
                </label>
                <input
                  {...register("price")}
                  name="price"
                  id="price"
                  type="number"
                  placeholder={t("general.fields.price.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.price && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.price.message)}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="discount_rate" className="block text-xs">
                  {t("general.fields.discount_rate.label")}
                </label>
                <input
                  {...register("discount_rate")}
                  name="discount_rate"
                  id="discount_rate"
                  type="number"
                  placeholder={t("general.fields.discount_rate.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.discount_rate && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof t(errors.discount_rate.message) === "string"
                      ? t(errors.discount_rate.message)
                      : t(
                          errors.discount_rate.message.key,
                          errors.discount_rate.message.values
                        )}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="in_offer" className="block text-base">
                    {t("general.fields.in_offer.label")}
                  </label>

                  <Controller
                    name="in_offer"
                    defaultValue={false}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.in_offer && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.in_offer.message)}
                  </p>
                )}
              </div>

              <hr className="col-span-full" />

              <div className="col-span-full">
                <label htmlFor="quantity" className="block text-xs">
                  {t("general.fields.quantity.label")}
                </label>
                <input
                  {...register("quantity")}
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder={t("general.fields.discount_rate.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.quantity && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof t(errors.quantity.message) === "string"
                      ? t(errors.quantity.message)
                      : t(
                          errors.quantity.message.key,
                          errors.quantity.message.values
                        )}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="in_stock" className="block text-base">
                    {t("general.fields.in_stock.label")}
                  </label>

                  <Controller
                    name="in_stock"
                    defaultValue={false}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.in_stock && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.in_stock.message)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("edit_product.customization")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="is_customizable" className="block text-base">
                    {t("edit_product.allow_customization")}
                  </label>

                  <Controller
                    name="is_customizable"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.is_customizable && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.is_customizable.message)}
                  </p>
                )}
              </div>
              {watch("is_customizable") == true && (
                <div className="col-span-full">
                  <label
                    htmlFor="customization_label"
                    className="block text-xs"
                  >
                    {t("edit_product.customization_question")}
                  </label>
                  <textarea
                    className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full min-h-[40px] text-sm placeholder-gray-400 focus:ring-0"
                    {...register("customization_label")}
                    maxLength={150}
                    id="customization_label"
                    rows="3"
                  ></textarea>
                  {errors.customization_label && (
                    <p className="pt-1 text-red-500 text-xs ps-1">
                      {t(errors.customization_label.message)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("edit_product.organize")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="category_id" className="block text-xs">
                  {t("general.fields.category.label")}
                </label>
                <select
                  {...register("category_id")}
                  onChange={handle_onchange_category_select}
                  name="category_id"
                  id="category_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
                >
                  <option value={""}>
                    {" "}
                    {t("general.fields.category.placeholder")}
                  </option>
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
                    {t(errors.category_id.message)}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="collection_id" className="block text-xs">
                  {t("general.fields.collection.label")}
                </label>
                <select
                  {...register("collection_id")}
                  name="collection_id"
                  id="collection_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
                >
                  <option value={0}>
                    {" "}
                    {t("general.fields.collection.placeholder")}
                  </option>
                  {collections &&
                    collections.map((collection, i) => {
                      return (
                        <option key={i} value={collection.id}>
                          {collection.name}
                        </option>
                      );
                    })}
                </select>
                {errors.collection_id && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.collection_id.message)}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="state_id" className="block text-xs">
                  {t("general.fields.state.label")}
                </label>
                <select
                  {...register("state_id")}
                  name="state_id"
                  id="state_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm capitalize focus:ring-0"
                >
                  <option value={0}>
                    {" "}
                    {t("general.fields.state.placeholder")}
                  </option>
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
                    {t(errors.state_id.message)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoader && <MainLoader />}
    </form>
  );
};

export default EditProduct;
