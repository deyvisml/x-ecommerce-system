import React, { useState, useEffect, useRef } from "react";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/dist/locale/es";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import currency from "currency.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  PaperAirplaneIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ModalButton2 from "../../../components/ModalButton2";
import UploadDocumentsModal from "./UploadDocumentsModal";
import { AnimatePresence } from "framer-motion";
import UndoOrderStateModal from "./UndoOrderStateModal";
import UpdateOrderStateModal from "./UpdateOrderStateModal";
import CancelOrderButton from "./CancelOrderButton";
import MainLoader from "../../../components/MainLoader";
import { useTranslation } from "react-i18next";

moment.locale("es");

const ViewOrder = () => {
  const { t } = useTranslation();
  const { token, store } = useManagement();
  const { order_id } = useParams();

  let navigate = useNavigate();

  const [order, setOrder] = useState();
  const [is_upload_documents_modal_open, setIsUploadDocumentsModalOpen] =
    useState(false);
  const [is_undo_order_state_modal_open, setIsUndoOrderStateModalOpen] =
    useState(false);
  const [is_update_order_state_modal_open, setIsUpdateOrderStateModalOpen] =
    useState(false);
  const [data_changed, setDataChanged] = useState(false);

  const fetch_order = async (order_id) => {
    try {
      const response = await axios_client(
        `/api/stores/${store.id}/orders/${order_id}`,
        {
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const order = response.data.data;
      console.log(order);

      setOrder(order);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [order_state_for_history, setOrderStateForHistory] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {},
        headers: {
          authorization: "Bearer ",
        },
      });

      const states = response.data.data;

      const order_state_for_history_ids = [11, 12, 13, 14, 15, 16];
      const aux_order_state_for_history = states.filter((order_state_i) =>
        order_state_for_history_ids.includes(order_state_i.id)
      );
      setOrderStateForHistory(aux_order_state_for_history);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const cancel_order = async (record) => {
    try {
      const state_id = 17; // cancel

      const response = await axios_client(
        `/api/stores/${store.id}/orders/${record.id}/update-state`,
        {
          method: "put",
          data: {
            state_id,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  const [fetches_finished, setFetchesFinished] = useState(false);
  useEffect(() => {
    (async () => {
      await fetch_order(order_id);
      await fetch_states();
      setFetchesFinished(true);
    })();
  }, []);

  useEffect(() => {
    if (data_changed) {
      fetch_order(order_id);

      setDataChanged(false);
    }
  }, [data_changed]);

  return !fetches_finished ? (
    <MainLoader />
  ) : (
    <>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">
          {t("view_order.title")}
        </h3>
      </div>

      <div className="gap-6 grid grid-cols-12 mt-6">
        <div className="col-span-full xl:col-span-3 h-40">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
            <div className="flex justify-between font-semibold text-base">
              <h4>{t("view_order.shipping_details")}</h4>
              <span className="flex justify-center items-center bg-purple-100 rounded w-11 h-11">
                <PaperAirplaneIcon
                  className="w-6 text-purple-600"
                  strokeWidth={2}
                />
              </span>
            </div>

            <div className="space-y-1 mt-0 text-sm capitalize">
              <p className="font-semibold">
                {order.customers_first_name + " " + order.customers_last_name}
              </p>
              <p>{order.deliveries_address}</p>
              <p>
                {order.location_logs_name}, {order.regions_name}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-full xl:col-span-3 h-40">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
            <div className="flex justify-between font-semibold text-base">
              <h4>{t("view_order.billing_details")}</h4>
              <span className="flex justify-center items-center bg-orange-100 rounded w-11 h-11">
                <CreditCardIcon
                  className="w-6 text-orange-600"
                  strokeWidth={2}
                />
              </span>
            </div>

            <div className="space-y-1 mt-0 text-sm capitalize">
              <p className="font-semibold">
                {order.customers_first_name + " " + order.customers_last_name}
              </p>
              <p>{order.deliveries_address}</p>
              <p>
                {order.location_logs_name}, {order.regions_name}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-full xl:col-span-3 bg-red-100 h-40">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
            <div className="flex justify-between font-semibold text-base">
              <h4>{t("view_order.payment_details")}</h4>
              <span className="flex justify-center items-center bg-sky-100 rounded w-11 h-11">
                <CurrencyDollarIcon
                  className="w-6 text-sky-600"
                  strokeWidth={2}
                />
              </span>
            </div>

            <div className="space-y-1 mt-0 text-sm">
              <p className="font-semibold capitalize">
                {order.customers_first_name + " " + order.customers_last_name}
              </p>
              <p>
                {t("view_order.payment_method")}:{" "}
                <b className="capitalize">{order.payment_method}</b>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-full xl:col-span-3 bg-red-100 h-40">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
            <div className="flex justify-between font-semibold text-base">
              <h4>{t("view_order.customer_information")}</h4>
              <span className="flex justify-center items-center bg-yellow-100 rounded w-11 h-11">
                <UserIcon className="w-6 text-yellow-600" strokeWidth={2} />
              </span>
            </div>

            <div className="space-y-1 mt-0 text-sm">
              <p className="font-semibold capitalize">
                {order.customers_first_name + " " + order.customers_last_name}
              </p>
              <p>{order.customers_email}</p>
              <p>{order.customers_phone_number}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full xl:col-span-9">
          <div className="gap-6 grid grid-cols-5 font-semibold text-xs">
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">
                  #{order.id.toString().padStart(4, "0")}
                </p>
                <p className="text-slate-500 uppercase">
                  {t("view_order.order_id")}
                </p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">
                  {moment(order.created_at).format("DD [de] MMM, YYYY")}
                </p>
                <p className="text-slate-500 uppercase">
                  {" "}
                  {t("view_order.order_date")}
                </p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">
                  {moment(order.deliveries_date).format("DD [de] MMM, YYYY")}
                </p>
                <p className="text-slate-500 uppercase">
                  {t("view_order.delivery_date")}
                </p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">
                  {order.delivery_schedule_logs_start_hour.slice(0, -3)}-
                  {order.delivery_schedule_logs_end_hour.slice(0, -3)}
                </p>
                <p className="text-slate-500 uppercase">
                  {t("view_order.delivery_hour")}
                </p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                {(() => {
                  let element = null;
                  switch (order.state_id) {
                    case 11:
                      element = (
                        <p className="bg-purple-100 px-2 py-0.5 rounded text-purple-600 text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    case 12:
                      element = (
                        <p className="bg-yellow-100 px-2 py-0.5 rounded text-xs text-yellow-600 capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    case 13:
                      element = (
                        <p className="bg-green-100 px-2 py-0.5 rounded text-green-600 text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    case 14:
                      element = (
                        <p className="bg-sky-100 px-2 py-0.5 rounded text-sky-500 text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    case 15:
                    case 16:
                      element = (
                        <p className="bg-green-100 px-2 py-0.5 rounded text-green-500 text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    case 5:
                    case 17:
                      element = (
                        <p className="bg-red-100 px-2 py-0.5 rounded text-red-500 text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                    default:
                      element = (
                        <p className="bg-slate-200 px-2 py-0.5 rounded text-xs capitalize">
                          {order.states_name}
                        </p>
                      );
                      break;
                  }

                  return element;
                })()}
                <p className="text-slate-500 uppercase">
                  {t("view_order.order_state")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("view_order.order_details")}
            </h4>

            <div className="mt-4">
              <div className="overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-slate-300 border-b text-left text-xs uppercase">
                      <th className="px-2 py-3">
                        {t("view_order.table.headers.name")}
                      </th>
                      <th className="px-2 py-3">
                        {t("view_order.table.headers.unit_price")}
                      </th>
                      <th className="px-2 py-3">
                        {t("view_order.table.headers.quantity")}
                      </th>
                      <th className="px-2 py-3">
                        {t("view_order.table.headers.total")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart_products.map((cart_product, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-slate-300 border-b text-sm"
                        >
                          <td className="px-2 py-2.5">
                            <div className="flex items-center gap-x-2">
                              <div className="flex justify-center items-center bg-slate-200 p-1 rounded w-[40px] min-w-[40px] h-[40px] min-h-[40px]">
                                <img
                                  src={`${
                                    import.meta.env.VITE_API_URL
                                  }/storage/images/products/small/${
                                    cart_product.product_log.image_name
                                  }`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="block text-black">
                                {cart_product.product_log.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            {currency(cart_product.product_log.price, {
                              symbol: "S/ ",
                            }).format()}
                          </td>
                          <td className="px-2 py-2.5">
                            {cart_product.quantity}
                          </td>
                          <td className="px-2 py-2.5">
                            {currency(
                              cart_product.product_log.price *
                                cart_product.quantity,
                              {
                                symbol: "S/ ",
                              }
                            ).format()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <ul className="block space-y-1 w-48 text-sm">
                <li>
                  <span className="inline-block w-1/2">
                    {t("view_order.subtotal")}:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    {currency(order.cart.total_price, {
                      symbol: "S/ ",
                    }).format()}
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2">
                    {t("view_order.discount")}:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    {currency(order.discount, {
                      symbol: "S/ ",
                    }).format()}
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2">
                    {t("view_order.shipping")}:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    {currency(order.location_logs_delivery_cost, {
                      symbol: "S/ ",
                    }).format()}
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2">
                    {t("view_order.tax")}:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    {currency(order.tax, {
                      symbol: "S/ ",
                    }).format()}
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2 font-semibold">
                    {t("view_order.total")}:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    {currency(order.total_price, {
                      symbol: "S/ ",
                    }).format()}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="gap-6 grid grid-cols-2">
            <div className="border-slate-200 dark:border-slate-700 col-span-full md:col-span-1 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <h4 className="font-semibold text-base">
                {t("view_order.customization")}
              </h4>

              <div className="mt-4 text-sm">...</div>
            </div>

            <div className="border-slate-200 dark:border-slate-700 col-span-full md:col-span-1 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <h4 className="font-semibold text-base">
                {t("view_order.dedication")}
              </h4>

              <div className="mt-4 text-sm">
                {order.no_send_message_card ? (
                  <span className="bg-orange-400 px-3 p-1.5 rounded-md text-white text-xs">
                    {t("view_order.no_dedication")}
                  </span>
                ) : (
                  <div className="flex flex-col gap-y-2">
                    <div>
                      <p>
                        <span className="font-semibold">
                          {t("view_order.purchase_occasion")}:
                        </span>{" "}
                        <span
                          className="px-2 py-1 rounded-md text-xs"
                          style={{
                            color: order.purchase_occasions_text_color,
                            backgroundColor: order.purchase_occasions_bg_color,
                          }}
                        >
                          {order.purchase_occasions_name}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label
                        className="block font-semibold"
                        htmlFor="dedication_message"
                      >
                        {t("view_order.message")}:
                      </label>
                      <textarea
                        className={`focus:bg-gray-50 px-3 py-2 text-sm border border-gray-300 focus:border-blue-600 rounded-md w-full transition-all duration-200 ease-in-out cursor-pointer outline-none`}
                        id="dedication_message"
                        cols="30"
                        rows="5"
                        disabled
                        value={order.dedication_message}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <div className="flex justify-between">
              <h4 className="font-semibold text-base">
                {t("view_order.order_status_history")}
              </h4>
              {order.state_id != 17 && (
                <div className="flex gap-2">
                  <ModalButton2
                    label={t("view_order.undo_state")}
                    setIsModalOpen={setIsUndoOrderStateModalOpen}
                    className="bg-red-100 hover:bg-red-200 px-6 py-2 rounded text-red-700 text-xs"
                  />
                  <ModalButton2
                    label={t("view_order.update_state")}
                    setIsModalOpen={setIsUpdateOrderStateModalOpen}
                    className="bg-indigo-100 hover:bg-indigo-200 px-6 py-2 rounded text-indigo-700 text-xs"
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <ul className="w-full text-sm overflow-y-clip">
                {order_state_for_history.map((order_state_i, i) => {
                  const order_state_done = order.order_state.find(
                    (order_state_j) =>
                      order_state_j.state_id2 == order_state_i.id
                  );

                  return (
                    <li key={i} className="relative flex pb-5 pe-2 ps-12">
                      <div className="w-1/2">
                        <div className="font-semibold capitalize">
                          {order_state_i.name}{" "}
                          {order_state_done && (
                            <p className="font-normal text-xs normal-case">
                              {t("view_order.last_update")}:{" "}
                              <span className="capitalize">
                                {order_state_done.updater.first_name}{" "}
                                {order_state_done.updater.last_name}
                              </span>
                            </p>
                          )}
                        </div>
                        <span className="mt-2 normal-case">
                          {t("view_order.order") + " " + order_state_i.name}
                        </span>
                      </div>
                      <span className="text-right w-1/2 text-slate-400">
                        {order_state_done &&
                          moment(order_state_done?.date).format(
                            "DD [de] MMM, YYYY"
                          )}{" "}
                        {order_state_done &&
                          order_state_done?.time.slice(0, -3)}
                      </span>

                      <div>
                        <span
                          className={`top-0 left-0 z-10 absolute border-3 border-slate-300 ${
                            order_state_done ? "bg-indigo-600" : "bg-slate-400"
                          }  rounded-full w-4 h-4 -translate-x-1/2`}
                        ></span>
                        <span
                          className={`top-0 left-0 absolute bg-white w-8 h-32 -translate-x-1/2 -translate-y-full`}
                          style={{
                            zIndex: order_state_for_history.length - i,
                          }}
                        >
                          <div className="flex justify-center items-center w-full h-full">
                            <span
                              className={`${
                                order_state_done
                                  ? "bg-indigo-500"
                                  : "bg-slate-300"
                              } w-[1px] h-full`}
                            ></span>
                          </div>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full xl:col-span-3">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <div className="flex justify-between">
              <h4 className="font-semibold text-base">
                {t("view_order.documents")}
              </h4>
              {order.state_id != 17 && (
                <ModalButton2
                  label={"Subir"}
                  setIsModalOpen={setIsUploadDocumentsModalOpen}
                  className="bg-indigo-100 hover:bg-indigo-200 px-6 py-2 rounded text-indigo-700 text-xs"
                />
              )}
            </div>

            <div className="mt-4">
              <ul className="space-y-3 w-full text-sm">
                {(() => {
                  const ticket_or_invoice_document = order.order_documents.find(
                    (order_document) =>
                      order_document.kind == "ticket" ||
                      order_document.kind == "invoice"
                  );

                  return (
                    <li className="flex">
                      <span className="w-1/2">
                        {ticket_or_invoice_document
                          ? ticket_or_invoice_document.kind == "ticket"
                            ? "Boleta"
                            : "Factura"
                          : "Boleta / Factura"}
                      </span>
                      <span className="w-1/2">
                        {ticket_or_invoice_document ? (
                          <a
                            href={
                              import.meta.env.VITE_API_URL +
                              `/storage/files/${
                                ticket_or_invoice_document.kind == "ticket"
                                  ? "tickets"
                                  : "invoices"
                              }/${ticket_or_invoice_document.file_name}`
                            }
                            target="_blank"
                            className="text-indigo-700"
                          >
                            {ticket_or_invoice_document.file_name.substring(
                              0,
                              5
                            )}
                            ...
                            {ticket_or_invoice_document.file_name.substring(
                              ticket_or_invoice_document.file_name.length - 6
                            )}
                          </a>
                        ) : (
                          <span className="mb-0 p-0 text-red-500 text-xs">
                            {t("view_order.out_of_stock")}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })()}

                {(() => {
                  const shipping_document = order.order_documents.find(
                    (order_document) => order_document.kind == "shipping"
                  );

                  return (
                    <li className="flex">
                      <span className="w-1/2">{t("view_order.shipping")}</span>
                      <span className="w-1/2">
                        {shipping_document ? (
                          <a
                            href={
                              import.meta.env.VITE_API_URL +
                              `/storage/files/shippings/${shipping_document.file_name}`
                            }
                            target="_blank"
                            className="text-indigo-700"
                          >
                            {shipping_document.file_name.substring(0, 5)}
                            ...
                            {shipping_document.file_name.substring(
                              shipping_document.file_name.length - 6
                            )}
                          </a>
                        ) : (
                          <span className="mb-0 p-0 text-red-500 text-xs">
                            {t("view_order.out_of_stock")}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })()}
              </ul>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">
              {t("view_order.actions")}
            </h4>

            <div className="mt-4">
              {order.state_id != 17 && (
                <CancelOrderButton
                  record={order}
                  setDataChanged={setDataChanged}
                  fn={cancel_order}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {is_undo_order_state_modal_open == true && (
          <UndoOrderStateModal
            record={order}
            setDataChanged={setDataChanged}
            is_modal_open={is_undo_order_state_modal_open}
            setIsModalOpen={setIsUndoOrderStateModalOpen}
          />
        )}

        {is_update_order_state_modal_open == true && (
          <UpdateOrderStateModal
            record={order}
            setDataChanged={setDataChanged}
            is_modal_open={is_update_order_state_modal_open}
            setIsModalOpen={setIsUpdateOrderStateModalOpen}
          />
        )}

        {is_upload_documents_modal_open == true && (
          <UploadDocumentsModal
            record={order}
            setDataChanged={setDataChanged}
            is_modal_open={is_upload_documents_modal_open}
            setIsModalOpen={setIsUploadDocumentsModalOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewOrder;
