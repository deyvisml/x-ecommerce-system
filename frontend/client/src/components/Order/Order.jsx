import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios_client from "../../helpers/axios";
import { useForm } from "react-hook-form";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";
import { PulseLoader } from "react-spinners";
import "./order.css";
import PaypalModal from "./PaypalModal";
import { schema } from "./schema";
import {
  FaRegCreditCard,
  FaPhone,
  FaRegCalendarDays,
  FaRegClock,
} from "react-icons/fa6";
import paypal_method from "../../../public/images/payment-methods/paypal-method.png";
import niubiz_method from "../../../public/images/payment-methods/niubiz-method.jpg";
import Stage from "./Stage";
import useECommerce from "../../hooks/useECommerce";
import { scroller } from "react-scroll";
import currency from "currency.js";
import {
  differenceInMilliseconds,
  parse,
  format,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();
  const { cart, order, setOrder } = useECommerce();
  const [document_types, setDocumentTypes] = useState();
  const [regions, setRegions] = useState();
  const [locations, setLocations] = useState();
  const [delivery_schedules, setDeliverySchedules] = useState();
  const [delivery_cost, setDeliveryCost] = useState();
  const [delivery_schedule, setDeliverySchedule] = useState();

  const {
    register,
    setError,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      document_type: order?.data?.document_type ?? undefined,
      document_number: order?.data?.document_number ?? undefined,
      first_name: order?.data?.first_name ?? undefined,
      last_name: order?.data?.last_name ?? undefined,
      email: order?.data?.email ?? undefined,
      birthdate: order?.data?.birthdate ?? undefined,
      phone_number: order?.data?.phone_number ?? undefined,
      delivery_first_name: order?.data?.delivery_first_name ?? undefined,
      delivery_last_name: order?.data?.delivery_last_name ?? undefined,
      delivery_region: order?.data?.delivery_region ?? undefined,
      delivery_location: order?.data?.delivery_location ?? undefined,
      delivery_address: order?.data?.delivery_address ?? undefined,
      delivery_address_reference:
        order?.data?.delivery_address_reference ?? undefined,
      delivery_date: undefined,
      delivery_schedule: undefined,
      delivery_phone_number: order?.data?.delivery_phone_number ?? undefined,
      payment_method: undefined,
      privacy_policies: true,
      terms_service: true,
      subscribe_newsletter: false,
    },
    resolver: yupResolver(schema),
  });

  const fetch_document_types = async () => {
    const { data } = await axios_client(`api/document-types`);

    setDocumentTypes(data.data);
  };

  const fetch_regions = async () => {
    const { data } = await axios_client(`api/regions`);

    setRegions(data.data);
  };

  const fetch_locations_by_region = async (region_id) => {
    const { data } = await axios_client(`api/regions/${region_id}/locations`);

    setLocations(data.data);
  };

  const fetch_delivery_schedules = async () => {
    const { data } = await axios_client(`api/delivery-schedules`, {
      method: "get",
    });

    let is_today = true;
    if (watch("delivery_date")) {
      is_today = isToday(parseISO(watch("delivery_date")));
      console.log("test1", is_today);
    }

    const min_difference_time = "00:50:00";

    const delivery_schedules = is_today
      ? data.data.filter((delivery_schedule) => {
          return is_start_hour_valid(
            delivery_schedule.start_hour,
            min_difference_time
          );
        })
      : data.data;

    setDeliverySchedules(delivery_schedules);
  };

  const is_start_hour_valid = (start_hour, min_difference_time) => {
    const min_difference_time_parse = parse(
      min_difference_time,
      "HH:mm:ss",
      new Date()
    );

    const min_difference_time_in_milliseconds = differenceInMilliseconds(
      min_difference_time_parse,
      startOfDay(min_difference_time_parse)
    );

    const current_time = new Date();
    const start_hour_parse = parse(start_hour, "HH:mm:ss", new Date());

    const difference_time_in_milliseconds = differenceInMilliseconds(
      start_hour_parse,
      current_time
    );

    return (
      difference_time_in_milliseconds > min_difference_time_in_milliseconds
    );
  };

  useEffect(() => {
    (async () => {
      await fetch_document_types();

      await fetch_regions();

      await fetch_locations_by_region(watch("delivery_region"));

      await fetch_delivery_schedules();

      reset();
    })();
  }, []);

  const total_price_items = cart.items.reduce(
    (acc, item) =>
      acc +
      (item.product.in_offer ? item.product.offer_price : item.product.price) *
        item.quantity,
    0
  );

  const [stage, setStage] = useState(order?.stage ?? 1);

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
        const delivery_schedule = getValues("delivery_schedule");
        const delivery_phone_number = getValues("delivery_phone_number");

        const schema_stage2 = schema.pick([
          "delivery_first_name",
          "delivery_last_name",
          "delivery_region",
          "delivery_location",
          "delivery_address",
          "delivery_address_reference",
          "delivery_date",
          "delivery_schedule",
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
              delivery_schedule,
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
    // update order
    setStage(stage - 1);
  };

  const skip_first_time_stage_effect = useRef(true);
  useEffect(() => {
    setOrder({ ...order });

    if (skip_first_time_stage_effect.current) {
      skip_first_time_stage_effect.current = false;
      return;
    }

    scroller.scrollTo(`stage${stage}`, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -130,
    });

    setValue("payment_method", null); // when stage change so always set null value to payment_method
  }, [stage]);

  const [usd_exchange_rate, setUsdExchangeRate] = useState();
  const fetch_exchange_rate = async (usd_exchange_rate_id) => {
    const { data } = await axios_client(
      `api/exchange-rates/${usd_exchange_rate_id}`
    );

    setUsdExchangeRate(data.data.price);
  };

  useEffect(() => {
    const usd_exchange_rate_id = 1;
    fetch_exchange_rate(usd_exchange_rate_id);
  }, []);

  const usd_total_price_items = cart.items.reduce(
    (acc, item) =>
      acc +
      (
        (item.product.in_offer
          ? item.product.offer_price
          : item.product.price) / usd_exchange_rate
      ).toFixed(2) *
        item.quantity,
    0
  );

  const [is_open_paypal_modal, setIsOpenPaypalModal] = useState(false);
  const [order_id, setOrderId] = useState();

  const onSubmit = async (data) => {
    const usd_delivery_cost = Number(
      (delivery_cost / usd_exchange_rate).toFixed(2)
    );

    const usd_total_price = (usd_total_price_items + usd_delivery_cost).toFixed(
      2
    );

    const response = await axios_client(`api/orders`, {
      method: "post",
      data: {
        ...data,
        cart,
        usd_total_price,
      },
    });

    setOrderId(response.data.data.order_id);

    console.log(order_id); // at this point is undefined because setOrderId is async, but when the modal is open it already has a value.

    // handle which payment method was selected
    switch (data.payment_method) {
      case "paypal":
        setIsOpenPaypalModal(true);
        break;

      default:
        alert("Forma de pago en mantenimineto.");
        break;
    }
  };

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // to avoid undefined values
      if (name) {
        setOrder((previous_order) => {
          const order_copy = cloneDeep(previous_order);
          order_copy.data[name] = value[name];
          return order_copy;
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handle_region_select_onchange = (e) => {
    const region_id = e.target.value;
    setValue("delivery_location", 0);

    fetch_locations_by_region(region_id);
  };

  useEffect(() => {
    if (Number(watch("delivery_location")) && locations) {
      // get location
      const location = locations.find(
        (location) => location["id"] == watch("delivery_location")
      );
      // set delivery cost
      setDeliveryCost(location.delivery_cost);
    } else {
      setDeliveryCost();
    }
  }, [watch("delivery_location"), locations]);

  useEffect(() => {
    if (Number(watch("delivery_schedule")) && delivery_schedules) {
      const delivery_schedule_filter = delivery_schedules.find(
        (element) => element.id == watch("delivery_schedule")
      );
      setDeliverySchedule(delivery_schedule_filter);
    }
  }, [watch("delivery_schedule"), delivery_schedules]);

  useEffect(() => {
    if (watch("delivery_date")) {
      setValue("delivery_schedule", "");
      fetch_delivery_schedules();
    }
  }, [watch("delivery_date")]);

  useEffect(() => {
    document.title = `Orden - Florecer Contigo`;
  }, []);

  return (
    <div className="mx-auto px-4 max-w-7xl order">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col items-start gap-x-10 gap-y-5 lg:gap-y-10 mt-5 mb-12"
      >
        <div className="flex flex-col w-full lg:w-3/5 text-sm">
          <div className="flex flex-col gap-y-2">
            <Stage
              stage={1}
              title={t("order.sections.one.title")}
              description={t("order.sections.one.description")}
              border-gray-300
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 py-3  text-gray-600`}
              >
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="document_type"
                  >
                    {t("general.fields.document_type.label")} <span>*</span>
                  </label>
                  <select
                    {...register("document_type")}
                    id="document_type"
                    className={`${
                      errors.document_type
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } px-2 py-2 border border-gray-300 rounded-md w-full outline-none`}
                  >
                    <option value="0">
                      {t("general.fields.document_type.placeholder")}
                    </option>
                    {document_types &&
                      document_types.map(({ id, name }) => {
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.document_type && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.document_type.message)}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="document_number"
                  >
                    {t("general.fields.document_number.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("document_number")}
                    id="document_number"
                    maxLength={20}
                    placeholder={t(
                      "general.fields.document_number.placeholder"
                    )}
                    className={`${
                      errors.document_number
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600  rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.document_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.document_number.message)}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="first_name"
                  >
                    {t("general.fields.name.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("first_name")}
                    id="first_name"
                    maxLength={50}
                    placeholder={t("general.fields.name.placeholder")}
                    className={`${
                      errors.first_name
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.first_name.message === "string"
                        ? t(errors.first_name.message)
                        : t(
                            errors.first_name.message.key,
                            errors.first_name.message.values
                          )}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="last_name"
                  >
                    {t("general.fields.last_name.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("last_name")}
                    maxLength={50}
                    id="last_name"
                    placeholder={t("general.fields.last_name.placeholder")}
                    className={`${
                      errors.last_name
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.last_name.message === "string"
                        ? t(errors.last_name.message)
                        : t(
                            errors.last_name.message.key,
                            errors.last_name.message.values
                          )}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="email"
                  >
                    {t("general.fields.email.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    id="email"
                    maxLength={100}
                    placeholder={t("general.fields.email.placeholder")}
                    className={`${
                      errors.email ? "border-red-400 focus:border-red-400" : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.email.message)}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="birthdate"
                  >
                    {t("general.fields.birthdate.label")}
                  </label>
                  <input
                    type="date"
                    {...register("birthdate")}
                    max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                    id="birthdate"
                    className={`${
                      errors.birthdate
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.birthdate && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.birthdate.message)}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="phone_number"
                  >
                    {t("general.fields.phone_number.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("phone_number")}
                    maxLength={9}
                    id="phone_number"
                    placeholder={t("general.fields.phone_number.placeholder")}
                    className={`${
                      errors.phone_number
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.phone_number.message)}
                    </p>
                  )}
                </div>

                <div className="flex justify-end md:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_next_btn(1);
                    }}
                    className="bg-rose-500 hover:bg-rose-600 px-10 py-2.5 rounded-md font-bold text-white text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    {t("general.buttons.next")}
                  </button>
                </div>
              </div>
            </Stage>

            <Stage
              stage={2}
              title={t("order.sections.two.title")}
              description={t("order.sections.two.description")}
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-2 py-3 text-gray-600">
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_first_name"
                  >
                    {t("general.fields.name.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_first_name")}
                    id="delivery_first_name"
                    maxLength={50}
                    placeholder={t("general.fields.name.placeholder")}
                    className={`${
                      errors.delivery_first_name
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_first_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.delivery_first_name.message === "string"
                        ? t(errors.delivery_first_name.message)
                        : t(
                            errors.delivery_first_name.message.key,
                            errors.delivery_first_name.message.values
                          )}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_last_name"
                  >
                    {t("general.fields.last_name.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_last_name")}
                    maxLength={100}
                    id="delivery_last_name"
                    placeholder={t("general.fields.last_name.placeholder")}
                    className={`${
                      errors.delivery_last_name
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_last_name && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.delivery_last_name.message === "string"
                        ? t(errors.delivery_last_name.message)
                        : t(
                            errors.delivery_last_name.message.key,
                            errors.delivery_last_name.message.values
                          )}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_region"
                  >
                    {t("general.fields.region.label")} <span>*</span>
                  </label>
                  <select
                    {...register("delivery_region", {
                      onChange: (e) => handle_region_select_onchange(e),
                    })}
                    id="delivery_region"
                    className={`${
                      errors.delivery_region
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } px-2 py-2 border border-gray-300 capitalize rounded-md w-full outline-none`}
                  >
                    <option value={0}>
                      {t("general.fields.region.placeholder")}
                    </option>
                    {regions &&
                      regions.map(({ id, name }) => {
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.delivery_region && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.delivery_region.message)}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_location"
                  >
                    {t("general.fields.location.label")} (
                    {t("general.fields.location.addition")}) <span>*</span>
                  </label>
                  <select
                    {...register("delivery_location")}
                    id="delivery_location"
                    className={`${
                      errors.delivery_location
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } px-2 py-2 border capitalize border-gray-300 rounded-md w-full outline-none`}
                  >
                    <option value="0">
                      {t("general.fields.location.placeholder")}
                    </option>
                    {locations &&
                      locations.map(({ id, name, delivery_cost }) => {
                        return (
                          <option key={id} value={id}>
                            {name} (
                            {currency(delivery_cost, {
                              symbol: "S/ ",
                            }).format()}
                            )
                          </option>
                        );
                      })}
                  </select>
                  {errors.delivery_location && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.delivery_location.message)}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_address"
                  >
                    {t("general.fields.delivery_address.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_address")}
                    id="delivery_address"
                    maxLength={200}
                    placeholder={t(
                      "general.fields.delivery_address.placeholder"
                    )}
                    className={`${
                      errors.delivery_address
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_address && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.delivery_address.message === "string"
                        ? t(errors.delivery_address.message)
                        : t(
                            errors.delivery_address.message.key,
                            errors.delivery_address.message.values
                          )}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_address_reference"
                  >
                    {t("general.fields.delivery_address_reference.label")}
                  </label>
                  <input
                    type="text"
                    {...register("delivery_address_reference")}
                    maxLength={200}
                    id="delivery_address_reference"
                    placeholder={t(
                      "general.fields.delivery_address_reference.placeholder"
                    )}
                    className={`${
                      errors.delivery_address_reference
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_address_reference && (
                    <p className="text-red-500 text-xs ps-2">
                      {typeof errors.delivery_address_reference.message ===
                      "string"
                        ? t(errors.delivery_address_reference.message)
                        : t(
                            errors.delivery_address_reference.message.key,
                            errors.delivery_address_reference.message.values
                          )}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_date"
                  >
                    {t("general.fields.delivery_date.label")} <span>*</span>
                  </label>
                  <input
                    type="date"
                    min={moment().format("YYYY-MM-DD")}
                    {...register("delivery_date")}
                    id="delivery_date"
                    className={`${
                      errors.delivery_date
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_date && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.delivery_date.message)}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_schedule"
                  >
                    {t("general.fields.delivery_schedule.label")} <span>*</span>
                  </label>
                  <select
                    {...register("delivery_schedule")}
                    id="delivery_schedule"
                    className={`${
                      errors.delivery_schedule
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } px-2 py-2 border border-gray-300 rounded-md w-full outline-none`}
                  >
                    <option value="">
                      {t("general.fields.delivery_schedule.placeholder")}
                    </option>
                    {delivery_schedules &&
                      delivery_schedules.map(({ id, start_hour, end_hour }) => {
                        return (
                          <option key={id} value={id}>
                            {start_hour.slice(0, -3)}-{end_hour.slice(0, -3)}
                          </option>
                        );
                      })}
                  </select>
                  {errors.delivery_schedule && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.delivery_schedule.message)}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-gray-500 text-xs"
                    htmlFor="delivery_phone_number"
                  >
                    {t("general.fields.phone_number.label")} <span>*</span>
                  </label>
                  <input
                    type="text"
                    {...register("delivery_phone_number")}
                    id="delivery_phone_number"
                    placeholder={t("general.fields.phone_number.placeholder")}
                    maxLength={9}
                    className={`${
                      errors.delivery_phone_number
                        ? "border-red-400 focus:border-red-400"
                        : ""
                    } focus:bg-gray-50 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                  />
                  {errors.delivery_phone_number && (
                    <p className="text-red-500 text-xs ps-2">
                      {t(errors.delivery_phone_number.message)}
                    </p>
                  )}
                </div>

                <div className="flex justify-between md:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_previous_btn();
                    }}
                    className="border-gray-300 bg-white hover:bg-gray-200 px-10 py-2.5 border rounded-md font-bold text-gray-700 text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    {t("general.buttons.previous")}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handle_click_next_btn(2);
                    }}
                    className="bg-rose-500 hover:bg-rose-600 shadow px-10 py-2.5 rounded-md font-bold text-white text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    {t("general.buttons.next")}
                  </button>
                </div>
              </div>
            </Stage>

            <Stage
              stage={3}
              title={t("order.sections.three.title")}
              description={t("order.sections.three.description")}
              current_stage={stage}
              set_current_stage={setStage}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <ul className="grid grid-cols-1 mt-2 border text-gray-600 text-xs">
                    {/*<li className="flex items-center border-gray-200 border ps-5">
                      <input
                        type="radio"
                        {...register("payment_method")}
                        value="niubiz"
                        id="niubiz"
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="niubiz"
                        className="flex justify-between items-center gap-x-2 py-3 w-full cursor-pointer pe-5 ps-3"
                      >
                        <div className="flex items-center gap-x-4">
                          <span className="flex justify-center items-center bg-rose-200 rounded-full min-w-10 min-h-10">
                            <FaRegCreditCard className="text-2xl text-rose-600" />
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
                    </li>*/}

                    <li className="flex items-center border-gray-200 border ps-5">
                      <input
                        type="radio"
                        {...register("payment_method")}
                        value="paypal"
                        id="paypal-radio"
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="paypal-radio"
                        className="flex justify-between items-center gap-x-2 py-3 w-full cursor-pointer pe-5 ps-3"
                      >
                        <div className="flex items-center gap-x-4">
                          <span className="flex justify-center items-center bg-rose-200 rounded-full min-w-10 min-h-10">
                            <FaRegCreditCard className="text-2xl text-rose-600" />
                          </span>
                          <div>
                            <p className="font-bold uppercase">
                              {t("order.payment_methods.paypal.title")}
                            </p>
                            <p>
                              {t("order.payment_methods.paypal.description")}
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
                      {t(errors.payment_method.message)}
                    </p>
                  )}
                </div>

                <div className="flex justify-between md:col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      handle_click_previous_btn();
                    }}
                    className="border-gray-300 bg-white hover:bg-gray-200 px-10 py-2.5 border rounded-md font-bold text-gray-700 text-xs uppercase transition-all duration-300 ease-in-out"
                  >
                    {t("general.buttons.previous")}
                  </button>
                </div>
              </div>
            </Stage>
          </div>
          <div
            name="my_testt"
            className="lg:flex flex-col gap-y-3 hidden bg-gray-200 mt-10 p-5 rounded-xl text-gray-700 text-xs"
          >
            <p className="font-bold">{t("order.need_help_section.title")}</p>
            <p>{t("order.need_help_section.description")}</p>

            <a
              href="tel:56971359643"
              className="flex items-center gap-x-2 py-1 text-sm"
            >
              <span className="inline-block">
                <FaPhone />
              </span>{" "}
              +56 971359643
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 border-gray-300 bg-gray-50 shadow-lg p-3 border rounded-md w-full lg:w-2/5 text-gray-700 text-sm">
          <div>
            <h5 className="font-bold uppercase">{t("order.summary.title")}</h5>
            <span className="block bg-rose-800 mt-0.5 rounded-full w-10 h-[3px]"></span>
          </div>

          <div className="flex justify-between mt-1 text-gray-500">
            <div className="flex items-center gap-x-2">
              <span>
                <FaRegCalendarDays className="mb-1.5 text-2xl" />
              </span>
              <div>
                <p className="m-0 p-0 text-sm leading-3">
                  {t("order.summary.delivery_date")}:
                </p>
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
                <p className="m-0 p-0 text-sm leading-3">
                  {t("order.summary.delivery_hour")}:
                </p>
                <span className="text-xs">
                  {watch("delivery_schedule") &&
                  delivery_schedules &&
                  delivery_schedule
                    ? delivery_schedule?.start_hour.slice(0, -3) +
                      "-" +
                      delivery_schedule?.end_hour.slice(0, -3)
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <ul>
              {cart.items.length > 0 ? (
                cart.items.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-x-5 py-2"
                    >
                      <div className="relative w-auto">
                        <Link
                          to={`/categorias/${item.product.category_id}/productos/${item.product.id}`}
                        >
                          <img
                            src={`${
                              import.meta.env.VITE_API_URL
                            }/storage/images/products/small/${
                              item.product.image_name
                            }`}
                            alt="product image"
                            className="border rounded-md w-16 h-16 object-contain"
                          />
                        </Link>
                        <div className="top-0 right-0 absolute flex justify-center items-center bg-gray-500 rounded-full w-5 h-5 text-white text-xs transform -translate-y-1/2 translate-x-[5px]">
                          <span className="mb-0.5">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Link
                          to={`/categorias/${item.product.category_id}/productos/${item.product.id}`}
                        >
                          {item.product.name}
                        </Link>
                        <p className="font-semibold text-xs">
                          {t("order.summary.unit_price")}{" "}
                          <span>
                            {currency(
                              item.product.in_offer == true
                                ? item.product.offer_price
                                : item.product.price,
                              {
                                symbol: "S/ ",
                              }
                            ).format()}
                          </span>
                        </p>
                      </div>
                      <div className="text-right w-2/12 sm:w-3/12">
                        <p>
                          {currency(
                            item.product.in_offer == true
                              ? item.quantity * item.product.offer_price
                              : item.quantity * item.product.price,
                            {
                              symbol: "S/ ",
                            }
                          ).format()}
                        </p>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="bg-red-400 py-2 text-center text-white">
                  {t("order.summary.empty_cart")}
                </p>
              )}
            </ul>
          </div>

          <div>
            <label htmlFor="coupon" className="block text-center">
              {t("general.fields.coupon.label")}
            </label>
            <div className="flex gap-x-2 mt-2">
              <input
                type="text"
                name="coupon"
                id="coupon"
                placeholder={t("general.fields.coupon.placeholder")}
                className={` focus:bg-gray-50 w-9/12 px-3 py-2 border border-gray-300 focus:border-blue-600 rounded-md  transition-all duration-200 ease-in-out cursor-pointer outline-none`}
              />
              <button
                type="button"
                className="bg-white hover:bg-rose-50 px-5 py-2.5 border border-rose-600 rounded-md w-3/12 font-bold text-rose-500 text-xs uppercase transition-all duration-300 ease-in-out"
              >
                {t("general.buttons.apply")}
              </button>
            </div>
          </div>

          <ul className="mt-2">
            <li className="flex justify-between items-center py-2.5 border-t text-sm">
              <p>{t("order.summary.subtotal")}</p>
              <p className="font-bold">
                {currency(total_price_items, {
                  symbol: "S/ ",
                }).format()}
              </p>
            </li>
            <li className="flex justify-between items-center py-2.5 border-t text-sm">
              <p>{t("order.summary.shipping")}</p>
              <p className="font-bold">
                {delivery_cost
                  ? currency(delivery_cost, {
                      symbol: "S/ ",
                    }).format()
                  : "-"}
              </p>
            </li>
            <li className="flex justify-between items-center py-2.5 border-t text-sm">
              <p>
                {t("order.summary.total")} ({t("order.summary.included_taxes")})
              </p>
              <p className="font-bold text-xl">
                {currency(total_price_items + (delivery_cost || 0), {
                  symbol: "S/ ",
                }).format()}
              </p>
            </li>
          </ul>

          <ul className="flex flex-col gap-y-2">
            <li>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("privacy_policies")}
                  id="privacy_policies"
                />
                <label
                  htmlFor="privacy_policies"
                  className="cursor-pointer ps-2"
                >
                  {t("general.fields.privacy_policies.label.part1")}{" "}
                  <a href="" className="font-bold text-rose-500">
                    {t("general.fields.privacy_policies.label.part2")}
                  </a>{" "}
                  (*)
                </label>
              </div>
              {errors.privacy_policies && (
                <p className="text-red-500 text-xs">
                  {t(errors.privacy_policies.message)}
                </p>
              )}
            </li>

            <li>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("terms_service")}
                  id="terms_service"
                />
                <label htmlFor="terms_service" className="cursor-pointer ps-2">
                  {t("general.fields.terms_service.label.part1")}{" "}
                  <a href="" className="font-bold text-rose-500">
                    {t("general.fields.terms_service.label.part2")}
                  </a>{" "}
                  (*)
                </label>
              </div>
              {errors.terms_service && (
                <p className="text-red-500 text-xs">
                  {t(errors.terms_service.message)}
                </p>
              )}
            </li>

            <li>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("subscribe_newsletter")}
                  id="subscribe_newsletter"
                />
                <label
                  htmlFor="subscribe_newsletter"
                  className="cursor-pointer ps-2"
                >
                  {t("general.fields.subscribe_newsletter.label")}
                </label>
              </div>
              {errors.subscribe_newsletter && (
                <p className="text-red-500 text-xs">
                  {t(errors.subscribe_newsletter.message)}
                </p>
              )}
            </li>
          </ul>

          <div className="my-5">
            {watch("payment_method") && cart.items.length > 0 && (
              <button
                type="submit"
                className={`${
                  !watch("privacy_policies") || !watch("terms_service")
                    ? "hover: cursor-not-allowed"
                    : ""
                } bg-rose-500 hover:bg-rose-600 px-5 py-2.5 border rounded-md w-full font-semibold text-white uppercase transition-all duration-300 ease-in-out`}
              >
                {!is_open_paypal_modal ? (
                  "Realizar pedido"
                ) : (
                  <PulseLoader color="#fff" margin={2} size={8} />
                )}
              </button>
            )}
          </div>
        </div>
      </form>
      <PaypalModal
        order_id={order_id}
        usd_exchange_rate={usd_exchange_rate}
        delivery_cost={delivery_cost}
        is_open_paypal_modal={is_open_paypal_modal}
        setIsOpenPaypalModal={setIsOpenPaypalModal}
      />
    </div>
  );
};

export default Order;
