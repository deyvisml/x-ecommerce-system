import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaXmark } from "react-icons/fa6";
import useECommerce from "../../hooks/useECommerce";

const PaypalModal = ({ is_open_modal, setIsOpenModal, delivery_cost }) => {
  const { cart } = useECommerce();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    let item_total_price = 0;
    const items = [];

    for (const item of cart.items) {
      let {
        product: { name, price, description },
        quantity,
      } = item;

      name = name.length > 127 ? name.slice(0, 125) + "..." : name;
      description =
        description.length > 127
          ? description.slice(0, 20) + "..."
          : description;

      items.push({
        name: name,
        quantity,
        description: description,
        unit_amount: {
          currency_code: "USD",
          value: price,
        },
      });

      item_total_price += price * quantity;
    }

    item_total_price = item_total_price.toFixed(2);

    return actions.order.create({
      purchase_units: [
        {
          description: `Florecer contigo`,
          amount: {
            currency_code: "USD",
            value: Number(item_total_price) + Number(delivery_cost),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: item_total_price,
              },
              shipping: {
                currency_code: "USD",
                value: delivery_cost,
              },
            },
          },
          items,
        },
      ],
    });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
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

/*
const init_paypal_button = (items) => {
  const container = document.querySelector("#paypal-button-container");
  container.innerHTML = "";
  let cantidad = 1;
  paypal
    .Buttons({
      style: {
        shape: "rect",
        color: "",
        layout: "vertical",
        label: "pay",
      },
      createOrder: function (data, actions) {
        let total_price = 0;
        const items = [];
        for (const item of items) {
          let { title, product_description, sku, discounted_price, quantity } =
            item;
          discounted_price /= 100;
          items.push({
            name: title,
            description: "sss",
            sku: sku,
            unit_amount: {
              currency_code: "USD",
              value: discounted_price,
            },
            quantity: quantity,
          });
          total_price += discounted_price * quantity;
        }
        total_price = total_price.toFixed(2);
        return actions.order.create({
          purchase_units: [
            {
              description: `Cosmos Creativo Order`,
              amount: {
                currency_code: "USD",
                value: total_price,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: total_price,
                  },
                },
              },
              items: items,
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          window.location.href = "https://cosmoscreativo.shop/";
        });
      },
      onError: function (err) {
        console.log(err);
        alert("Ocurrio un error al procesar el pago :(, intentelo nuevamente.");
      },
    })
    .render("#paypal-button-container");
};

init_paypal_button(items);*/

export default PaypalModal;
