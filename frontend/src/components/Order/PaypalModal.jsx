import { Fragment, useState, useEffect } from "react";
import axios_client from "../../helpers/axios";
import { Dialog, Transition } from "@headlessui/react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaXmark } from "react-icons/fa6";
import useECommerce from "../../hooks/useECommerce";

const PaypalModal = ({ is_open_modal, setIsOpenModal, delivery_cost }) => {
  const [usd_exchange_rate, setUsdExchangeRate] = useState();
  const { cart } = useECommerce();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [{ isPending }] = usePayPalScriptReducer();

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

  const createOrder = (data, actions) => {
    let item_total_price = 0;
    const items = [];

    for (const item of cart.items) {
      let {
        product: { name, price, description },
        quantity,
      } = item;

      name = name.length > 127 ? name.slice(0, 125) + ".." : name;
      description =
        description.length > 127
          ? description.slice(0, 20) + ".."
          : description;

      items.push({
        name: name,
        quantity,
        description: description,
        unit_amount: {
          currency_code: "USD",
          value: (price / usd_exchange_rate).toFixed(2),
        },
      });

      item_total_price += (price / usd_exchange_rate).toFixed(2) * quantity;
    }

    item_total_price = item_total_price.toFixed(2);

    return actions.order.create({
      purchase_units: [
        {
          description: `Florecer contigo`,
          amount: {
            currency_code: "USD",
            value:
              Number(item_total_price) +
              Number((delivery_cost / usd_exchange_rate).toFixed(2)),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: item_total_price,
              },
              shipping: {
                currency_code: "USD",
                value: (delivery_cost / usd_exchange_rate).toFixed(2),
              },
            },
          },
          items,
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "NO_SHIPPING",
          },
        },
      },
    });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
    });
  };

  return (
    <Transition appear show={is_open_modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 text-gray-800"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex justify-center items-center p-4 min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white shadow-xl p-4 rounded-lg w-full max-w-lg text-left transform transition-all overflow-hidden align-middle">
                <Dialog.Title as="div" className="flex justify-between">
                  <h4 className="font-semibold">Completar pago</h4>
                  <button
                    onClick={closeModal}
                    className="flex items-center content-center bg-gray-50 p-1 rounded-md text-lg"
                  >
                    <FaXmark />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  {!isPending && (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaypalModal;
