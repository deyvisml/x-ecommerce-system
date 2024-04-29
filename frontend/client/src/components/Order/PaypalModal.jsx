import { Fragment, useState, useEffect } from "react";
import axios_client from "../../helpers/axios";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaXmark } from "react-icons/fa6";
import useECommerce from "../../hooks/useECommerce";

const PaypalModal = ({
  order_id,
  usd_exchange_rate,
  is_open_paypal_modal,
  setIsOpenPaypalModal,
  delivery_cost,
}) => {
  let navigate = useNavigate();
  const { cart, setIsLoadingMainLoader, clear_cart, clear_order } =
    useECommerce();

  const closeModal = () => {
    setIsOpenPaypalModal(false);
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
            value: (
              Number(item_total_price) +
              Number((delivery_cost / usd_exchange_rate).toFixed(2))
            ).toFixed(2),
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
    setIsLoadingMainLoader(true);

    return actions.order.capture().then((details) => {
      if (details.status == "COMPLETED") {
        // get the amount paid
        //const usd_amount_paid = details.purchase_units[0].amount.value;

        axios_client(`api/orders/${order_id}/update-state-to-paid`, {
          method: "put",
        }).then(({ data }) => {
          if (!data.error_occurred) {
            // redirect to succed order view

            axios_client(`api/mails/send-order-confirmation-mail`, {
              method: "post",
              data: {
                order_id,
              },
            })
              .then(({ data }) => {
                if (!data.error_occurred) {
                  return navigate("/orden-exitosa");
                } else {
                  throw new Error("Ocurrio un error al enviar el email.");
                }
              })
              .finally(() => {
                clear_cart();
                setIsLoadingMainLoader(false);
              });
          } else {
            alert(
              "Ocurrio un error al procesar el pago, intentelo nuevamente."
            );
          }
        });
      } else {
        setIsLoadingMainLoader(false);
      }
      closeModal();
    });
  };

  return (
    <Transition appear show={is_open_paypal_modal} as={Fragment}>
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
