import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { add_product_schema } from "./add_product_schema";
import UploadImageDropzone from "./UploadImageDropzone";
import SwitchInput from "../../../components/SwitchInput";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
import moment from "moment";
import { format } from "date-fns";
import MainLoader from "../../../components/MainLoader";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();
  const { token, store } = useManagement();
  const [showLoader, setShowLoader] = useState(false);

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
      is_customizable: false,
      state_id: 1,
      publish_now: true,
    },
    resolver: yupResolver(add_product_schema),
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
              values: [1, 2],
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
    if (watch("category_id") > 0) {
      fetch_collections_by_category(watch("category_id"));
    }

    setValue("collection_id", 0);
  }, [watch("category_id")]);

  const onSubmit = async (data) => {
    console.log(data);

    setShowLoader(true);

    const form_data = new FormData();

    for (let key in data) {
      if (key == "images") {
        for (let i = 0; i < data[key].length; i++) {
          form_data.append(`images[]`, data[key][i]);
        }
      } else if (key == "publish_date") {
        form_data.append(
          key,
          format(new Date(data[key]), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
        );
      } else {
        form_data.append(key, data[key]);
      }
    }

    form_data.append("store_id", store.id);

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
          title: t("alerts.titles.created"),
          text: response.data.message,
          confirmButtonText: t("alerts.confirmation_button.continue"),
        });
        reset();
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

  const handle_click_discard_btn = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">
          {t("add_product.title")}
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
              {t("add_product.publish_product")}
            </button>
          </li>
        </ul>
      </div>

      <div className="gap-6 grid grid-cols-3 mt-6">
        <div className="flex flex-col gap-6 col-span-full lg:col-span-2">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("add_product.product_information")}
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
                    {t(errors.name.message)}
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
                    {t(errors.sku.message)}
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
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>
                {errors.description && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.description.message)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("add_product.product_image")}
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
                  schema={add_product_schema}
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
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full lg:col-span-1">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {" "}
              {t("add_product.price")}
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
                    {typeof errors.discount_rate.message === "string"
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
                  placeholder={t("general.fields.quantity.placeholder")}
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                />
                {errors.quantity && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {typeof errors.quantity.message === "string"
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
              {t("add_product.customization")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="is_customizable" className="block text-base">
                    {t("add_product.allow_customization")}
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
                    {t("add_product.customization_question")}
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
              {" "}
              {t("add_product.organize")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
              <div className="col-span-full">
                <label htmlFor="category_id" className="block text-xs">
                  {t("general.fields.category.label")}
                </label>
                <select
                  {...register("category_id")}
                  name="category_id"
                  id="category_id"
                  className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm focus:ring-0"
                >
                  <option value={0}>
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
                    {t(errors.collection_id.message)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {" "}
              {t("add_product.publication")}
            </h4>

            <div className="gap-4 grid grid-cols-2 mt-4">
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

              <div className="col-span-full">
                <div className="flex justify-between">
                  <label htmlFor="publish_now" className="block text-base">
                    {t("general.fields.publish_now.label")}
                  </label>

                  <Controller
                    name="publish_now"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SwitchInput value={value} onChange={onChange} />
                    )}
                  />
                </div>
                {errors.publish_now && (
                  <p className="pt-1 text-red-500 text-xs ps-1">
                    {t(errors.publish_now.message)}
                  </p>
                )}
              </div>

              {!watch("publish_now") && (
                <>
                  <div className="col-span-1">
                    <label htmlFor="publish_date" className="block text-xs">
                      {t("general.fields.publish_date.label")}
                    </label>
                    <input
                      {...register("publish_date")}
                      id="publish_date"
                      type="date"
                      min={moment().format("YYYY-MM-DD")}
                      className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                    />
                    {errors.publish_date && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {t(errors.publish_date.message)}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="publish_time" className="block text-xs">
                      {t("general.fields.publish_time.label")}
                    </label>
                    <input
                      {...register("publish_time")}
                      id="publish_time"
                      type="time"
                      className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-1.5 rounded w-full text-sm placeholder-gray-400 focus:ring-0"
                    />
                    {errors.publish_time && (
                      <p className="pt-1 text-red-500 text-xs ps-1">
                        {t(errors.publish_time.message)}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLoader && <MainLoader />}
    </form>
  );
};

export default AddProduct;
