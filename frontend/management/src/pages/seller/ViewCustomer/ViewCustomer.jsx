import React, { useState, useEffect, useRef } from "react";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/dist/locale/es";
import useManagement from "../../../hooks/useManagement";
import { useParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import CustomerOrderList from "./CustomerOrderList";
import MainLoader from "../../../components/MainLoader";

moment.locale("es");

const ViewCustomer = () => {
  const { token, store } = useManagement();
  const { customer_id } = useParams();

  const [customer, setCustomer] = useState();
  const [data_changed, setDataChanged] = useState(false);

  const fetch_customer = async (store_id, customer_id) => {
    try {
      const response = await axios_client(
        `/api/stores/${store_id}/customers/${customer_id}`,
        {
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const customer = response.data.data;
      console.log(customer);

      setCustomer(customer);
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
      await fetch_customer(store.id, customer_id);
      setFetchesFinished(true);
    })();
  }, []);

  useEffect(() => {
    if (data_changed) {
      fetch_customer(customer_id);

      setDataChanged(false);
    }
  }, [data_changed]);

  return !fetches_finished || !customer ? (
    <MainLoader />
  ) : (
    <>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">Ver Cliente</h3>
      </div>

      <div className="gap-6 grid grid-cols-12 mt-6">
        <div className="flex flex-col gap-6 col-span-full xl:col-span-3">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Perfil</h4>

            <div className="mt-4 text-sm">
              <div>
                <div className="flex justify-center items-center bg-slate-500 m-auto rounded-md w-28 h-28">
                  <UserIcon className="w-20 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <ul className="flex flex-col gap-y-2 text-xs">
                  <li>
                    <strong className="block">ID</strong>
                    <span>{customer.id}</span>
                  </li>
                  <li>
                    <strong className="block">Nombres</strong>
                    <span className="capitalize">
                      {customer.first_name} {customer.last_name}
                    </span>
                  </li>
                  <li>
                    <strong className="block">Email</strong>
                    <span>{customer.email}</span>
                  </li>
                  <li>
                    <strong className="block">Teléfono</strong>
                    <span>{customer.phone_number}</span>
                  </li>
                  <li>
                    <strong className="block">Dirección</strong>
                    <span>{customer.addresses_name}</span>
                  </li>
                  <li>
                    <strong className="block">Estado</strong>
                    {(() => {
                      let value = undefined;

                      switch (customer.state_id) {
                        case 1:
                          value = (
                            <span className="inline-block bg-green-100 px-2 py-1 rounded text-green-600 text-xs capitalize">
                              {customer.states_name}
                            </span>
                          );
                          break;
                        case 2:
                        case 4:
                          value = (
                            <span className="inline-block bg-yellow-100 px-2 py-1 rounded text-xs text-yellow-600 capitalize">
                              {customer.states_name}
                            </span>
                          );
                          break;
                        case 3:
                          value = (
                            <span className="inline-block bg-red-100 px-2 py-1 rounded text-red-500 text-xs capitalize">
                              {customer.states_name}
                            </span>
                          );
                          break;

                        default:
                          value = (
                            <span className="inline-block bg-slate-200 px-2 py-1 rounded text-xs capitalize">
                              {customer.states_name}
                            </span>
                          );
                          break;
                      }

                      return value;
                    })()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 col-span-full xl:col-span-9">
          <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
            <h4 className="font-semibold text-base">Ordenes realizadas</h4>

            <div className="mt-4">
              <CustomerOrderList customer={customer} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;
