import React, { useState, useEffect, useRef } from "react";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/dist/locale/es";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
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
import UpdateStateOrderModal from "./UpdateStateOrderModal";
import CancelOrderButton from "./CancelOrderButton";

moment.locale("es");

const ViewOrder = () => {
  const { token, is_loading_main_loader, setIsLoadingMainLoader } =
    useManagement();
  const store_id = 6;
  const { order_id } = useParams();

  let navigate = useNavigate();

  const [order, setOrder] = useState();
  const [is_upload_documents_modal_open, setIsUploadDocumentsModalOpen] =
    useState(false);
  const [is_update_state_order_modal, setIsUpdateStateOrderModal] =
    useState(false);
  const [data_changed, setDataChanged] = useState(false);

  const fetch_order = async (order_id) => {
    try {
      const response = await axios_client(
        `/api/stores/${store_id}/orders/${order_id}`,
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

  const [fetches_finished, setFetchesFinished] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoadingMainLoader(true);

      await fetch_order(order_id);
      await fetch_states();
      setFetchesFinished(true);

      setTimeout(() => {
        setIsLoadingMainLoader(false);
      }, 2000);
    })();
  }, []);

  return (
    fetches_finished == true && (
      <>
        <div>
          <h3 className="font-semibold text-2xl text-slate-800">Ver Orden</h3>
        </div>

        <div className="gap-6 grid grid-cols-12 mt-6">
          <div className="col-span-full xl:col-span-3 h-40">
            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
              <div className="flex justify-between font-semibold text-base">
                <h4>Detalles de Envio</h4>
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
                  {order.locations_name}, {order.regions_name}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full xl:col-span-3 h-40">
            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
              <div className="flex justify-between font-semibold text-base">
                <h4>Detalles de Facturación</h4>
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
                  {order.locations_name}, {order.regions_name}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full xl:col-span-3 bg-red-100 h-40">
            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
              <div className="flex justify-between font-semibold text-base">
                <h4>Detalles de Pago</h4>
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
                  Metodo de pago:{" "}
                  <b className="capitalize">{order.payment_method}</b>{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full xl:col-span-3 bg-red-100 h-40">
            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded h-full">
              <div className="flex justify-between font-semibold text-base">
                <h4>Información de Cliente</h4>
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
                  <p className="text-slate-500 uppercase">ID ORDEN</p>
                </div>
              </div>
              <div className="col-span-full xl:col-span-1">
                <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                  <p className="text-black">
                    {moment(order.created_at).format("DD [de] MMM, YYYY")}
                  </p>
                  <p className="text-slate-500 uppercase">FECHA ORDEN</p>
                </div>
              </div>
              <div className="col-span-full xl:col-span-1">
                <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                  <p className="text-black">
                    {moment(order.deliveries_date).format("DD [de] MMM, YYYY")}
                  </p>
                  <p className="text-slate-500 uppercase">FECHA DELIVERY</p>
                </div>
              </div>
              <div className="col-span-full xl:col-span-1">
                <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                  <p className="text-black">
                    {order.delivery_schedules_start_hour.slice(0, -3)}-
                    {order.delivery_schedules_end_hour.slice(0, -3)}
                  </p>
                  <p className="text-slate-500 uppercase">HORA DELIVERY</p>
                </div>
              </div>
              <div className="col-span-full xl:col-span-1">
                <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                  {(() => {
                    let element = null;
                    switch (order.state_id) {
                      case 1:
                        element = (
                          <p className="bg-slate-200 px-2 py-0.5 rounded text-xs capitalize">
                            {order.states_name}
                          </p>
                        );
                        break;
                      case 5:
                        element = (
                          <p className="bg-red-100 px-2 py-0.5 rounded text-red-500 text-xs capitalize">
                            {order.states_name}
                          </p>
                        );
                        break;
                      case 11:
                        element = (
                          <p className="bg-yellow-100 px-2 py-0.5 rounded text-xs text-yellow-600 capitalize">
                            {order.states_name}
                          </p>
                        );
                        break;
                      case 12:
                        element = (
                          <p className="bg-purple-100 px-2 py-0.5 rounded text-purple-600 text-xs capitalize">
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
                  <p className="text-slate-500 uppercase">ESTADO ORDEN</p>
                </div>
              </div>
            </div>

            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <h4 className="font-semibold text-base">Detalles de la Orden</h4>

              <div className="mt-4">
                <div className="overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-slate-300 border-b text-left text-xs uppercase">
                        <th className="px-2 py-3">Nombre</th>
                        <th className="px-2 py-3">Precio Unitario</th>
                        <th className="px-2 py-3">Cantidad</th>
                        <th className="px-2 py-3">Total</th>
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
                                    src={`http://localhost:8000/storage/images/products/${cart_product.product.image_name}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="block text-black">
                                  {cart_product.product.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 py-2.5">
                              {currency(cart_product.product.price, {
                                symbol: "S/ ",
                              }).format()}
                            </td>
                            <td className="px-2 py-2.5">
                              {cart_product.quantity}
                            </td>
                            <td className="px-2 py-2.5">
                              {currency(
                                cart_product.product.price *
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
                    <span className="inline-block w-1/2">Subtotal:</span>
                    <span className="inline-block text-right w-1/2 font-semibold">
                      {currency(order.cart.total_price, {
                        symbol: "S/ ",
                      }).format()}
                    </span>
                  </li>
                  <li>
                    <span className="inline-block w-1/2">Descuento:</span>
                    <span className="inline-block text-right w-1/2 font-semibold">
                      {currency(order.discount, {
                        symbol: "S/ ",
                      }).format()}
                    </span>
                  </li>
                  <li>
                    <span className="inline-block w-1/2">Impuesto:</span>
                    <span className="inline-block text-right w-1/2 font-semibold">
                      {currency(order.tax, {
                        symbol: "S/ ",
                      }).format()}
                    </span>
                  </li>
                  <li>
                    <span className="inline-block w-1/2 font-semibold">
                      Total:
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

            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <div className="flex justify-between">
                <h4 className="font-semibold text-base">
                  Historico del estado de la Orden
                </h4>
                <ModalButton2
                  label={"Actualizar estado"}
                  setIsModalOpen={setIsUpdateStateOrderModal}
                />
              </div>

              <div className="mt-4">
                <ul className="w-full text-sm overflow-y-clip">
                  <li className="relative flex pb-5 pe-2 ps-12">
                    <div className="w-1/2">
                      <p className="font-semibold">Nombre de estado</p>
                      <span className="mt-2">Descripción de estado</span>
                    </div>
                    <span className="text-right w-1/2 text-slate-400">
                      Martes 11:12 AM
                    </span>

                    <div>
                      <span className="top-0 left-0 z-10 absolute border-3 border-slate-300 bg-indigo-600 rounded-full w-4 h-4 -translate-x-1/2"></span>
                      <span className="top-0 left-0 absolute bg-white w-8 h-32 -translate-x-1/2 -translate-y-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <span className="bg-indigo-400 w-[1px] h-full"></span>
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="relative flex pb-5 pe-2 ps-12">
                    <div className="w-1/2">
                      <p className="font-semibold">Nombre de estado</p>
                      <span className="mt-2">Descripción de estado</span>
                    </div>
                    <span className="text-right w-1/2 text-slate-400">
                      Martes 11:12 AM
                    </span>

                    <div>
                      <span className="top-0 left-0 z-10 absolute border-3 border-slate-300 bg-indigo-600 rounded-full w-4 h-4 -translate-x-1/2"></span>
                      <span className="top-0 left-0 absolute bg-white w-8 h-32 -translate-x-1/2 -translate-y-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <span className="bg-indigo-400 w-[1px] h-full"></span>
                        </div>
                      </span>
                    </div>
                  </li>
                  <li className="relative flex pb-5 pe-2 ps-12">
                    <div className="w-1/2">
                      <p className="font-semibold">Nombre de estado</p>
                      <span className="mt-2">Descripción de estado</span>
                    </div>
                    <span className="text-right w-1/2 text-slate-400">
                      Martes 11:12 AM
                    </span>

                    <div>
                      <span className="top-0 left-0 z-10 absolute border-3 border-slate-300 bg-indigo-600 rounded-full w-4 h-4 -translate-x-1/2"></span>
                      <span className="top-0 left-0 absolute bg-white w-8 h-32 -translate-x-1/2 -translate-y-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <span className="bg-indigo-400 w-[1px] h-full"></span>
                        </div>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 col-span-full xl:col-span-3">
            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <div className="flex justify-between">
                <h4 className="font-semibold text-base">Documentos</h4>
                <ModalButton2
                  label={"Subir"}
                  setIsModalOpen={setIsUploadDocumentsModalOpen}
                />
              </div>

              <div className="mt-4">
                <ul className="space-y-3 w-full text-sm">
                  <li className="flex">
                    <span className="w-1/2">Factura</span>
                    <span className="w-1/2">
                      <button className="text-indigo-700">#FAC_0001</button>
                    </span>
                  </li>
                  <li className="flex">
                    <span className="w-1/2">Envio</span>
                    <span className="w-1/2">
                      <button className="text-indigo-700">#ENV_0001</button>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
              <h4 className="font-semibold text-base">Acciones</h4>

              <div className="mt-4">
                <CancelOrderButton />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {is_update_state_order_modal == true && (
            <UpdateStateOrderModal
              setDataChanged={setDataChanged}
              is_modal_open={is_update_state_order_modal}
              setIsModalOpen={setIsUpdateStateOrderModal}
            />
          )}

          {is_upload_documents_modal_open == true && (
            <UploadDocumentsModal
              setDataChanged={setDataChanged}
              is_modal_open={is_upload_documents_modal_open}
              setIsModalOpen={setIsUploadDocumentsModalOpen}
            />
          )}
        </AnimatePresence>
      </>
    )
  );
};

export default ViewOrder;
