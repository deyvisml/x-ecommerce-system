import React, { useState, useEffect, useRef } from "react";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useManagement from "../../../hooks/useManagement";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  PaperAirplaneIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ViewOrder = () => {
  const { token } = useManagement();
  const { order_id } = useParams();

  let navigate = useNavigate();

  const [product, setProduct] = useState();

  const fetch_order = async (order_id) => {
    try {
      const response = await axios_client(`/api/orders/${order_id}`, {
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
        image_name: product.image_name,
        price: product.price,
        discount_rate: product.discount_rate,
        in_offer: product.in_offer,
        quantity: product.quantity,
        in_stock: product.in_stock,
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
    //fetch_order(order_id);
    fetch_states();
  }, []);

  return (
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

            <div className="space-y-1 mt-0 text-sm">
              <p className="font-semibold">Deyvis Mamani Lacuta</p>
              <p>Jr las mercedes Nº501</p>
              <p>Puno, Perú</p>
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

            <div className="space-y-1 mt-0 text-sm">
              <p className="font-semibold">Deyvis Mamani Lacuta</p>
              <p>Jr las mercedes Nº501</p>
              <p>Puno, Perú</p>
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
              <p className="font-semibold">Deyvis Mamani Lacuta</p>
              <p>
                Metodo de pago: <b>Paypal</b>{" "}
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
              <p className="font-semibold">Deyvis Mamani Lacuta</p>
              <p>deyvisml@gmail.com</p>
              <p>+51 975032529</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full lg:col-span-9">
          <div className="gap-6 grid grid-cols-5 font-semibold text-xs">
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">#TWT5015100366</p>
                <p className="text-slate-500 uppercase">ID ORDEN</p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">02 Nov, 2023</p>
                <p className="text-slate-500 uppercase">FECHA ORDEN</p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">09 Nov, 2023</p>
                <p className="text-slate-500 uppercase">FECHA DELIVERY</p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="text-black">S/ 843.49</p>
                <p className="text-slate-500 uppercase">MONTO ORDEN</p>
              </div>
            </div>
            <div className="col-span-full xl:col-span-1">
              <div className="flex flex-col justify-center items-center space-y-0.5 border-slate-200 bg-white shadow-lg p-5 border rounded-sm h-[88px]">
                <p className="bg-slate-200 px-2 py-0.5 rounded text-xs capitalize">
                  Enviado
                </p>
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
                    <tr className="border-slate-300 border-b text-sm">
                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-x-2">
                          <div className="flex justify-center items-center bg-slate-200 p-1 rounded w-[40px] min-w-[40px] h-[40px] min-h-[40px]">
                            <img
                              src={`http://localhost:8000/storage/images/products/${"FCRG-SV_320x320.jpg"}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="block text-black">Product A</span>
                        </div>
                      </td>
                      <td className="px-2 py-2.5">S/ 123</td>
                      <td className="px-2 py-2.5">456</td>
                      <td className="px-2 py-2.5">S/ 789</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <ul className="block space-y-1 w-48 text-sm">
                <li>
                  <span className="inline-block w-1/2">Subtotal:</span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    S/ 321
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2">Descuento:</span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    S/ 654
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2">Impuesto:</span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    S/ 0
                  </span>
                </li>
                <li>
                  <span className="inline-block w-1/2 font-semibold">
                    Total:
                  </span>
                  <span className="inline-block text-right w-1/2 font-semibold">
                    S/ 9876
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Historico de la Orden</h4>
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

        <div className="flex flex-col gap-6 col-span-full lg:col-span-3">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Documentos</h4>

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

            <div className="gap-4 grid grid-cols-2 mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
