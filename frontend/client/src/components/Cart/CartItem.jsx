import React, { useState } from "react";
import QuantityButton from "../Product/QuantityButton";
import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import useECommerce from "../../hooks/useECommerce";
import currency from "currency.js";

const CartItem = ({ item }) => {
  console.log(item);
  const [quantity, setQuantity] = useState(item.quantity);
  const { cart, set_cart } = useECommerce();

  const update_quantity_cart_product = (
    new_quantity,
    item_id,
    cart,
    set_cart
  ) => {
    const cart_copy = cloneDeep(cart);

    for (const item_x of cart_copy.items) {
      if (item_x.id == item_id) {
        item_x.quantity = new_quantity;
        set_cart(cart_copy);
      }
    }
  };

  useEffect(() => {
    if (quantity != item.quantity) {
      update_quantity_cart_product(quantity, item.id, cart, set_cart);
    }
  }, [quantity]);

  const handle_remove_item_from_cart_btn = () => {
    const cart_copy = cloneDeep(cart);
    const item_id = item.id;

    cart_copy.items = cart_copy.items.filter((itemx) => itemx.id !== item_id);
    set_cart(cart_copy);
  };

  return (
    <li className="flex sm:flex-row flex-col border-gray-300 sm:border-0 bg-gray-50 sm:bg-white border sm:border-b-2 rounded-lg sm:rounded-none">
      <div className="border-gray-400 px-2 py-3 border-b sm:border-b-0">
        <div className="m-auto w-44 sm:w-24 md:w-40 h-auto">
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/storage/images/products/medium/${item.product.image_name}`}
            alt="product image"
            className="block w-full h-full overflow-hidden object-contain"
          />
        </div>
      </div>
      <div className="sm:flex-1 border-gray-400 px-2 py-3 border-b sm:border-b-0 w-full">
        <div className="flex justify-between">
          <p className="block sm:hidden w-2/6 font-semibold">Producto:</p>
          <div className="text-right flex flex-col flex-1 gap-y-2 sm:text-left">
            <p className="font-extrabold text-base">{item.product.name}</p>
            <p className="sm:block hidden text-gray-500">
              {item.product.description}
            </p>
            <p className="text-rose-700 text-xl">
              {currency(
                item.product.in_offer == true
                  ? item.product.offer_price
                  : item.product.price,
                {
                  symbol: "S/ ",
                }
              ).format()}
            </p>
          </div>
        </div>
      </div>
      <div className="border-gray-400 px-2 py-3 border-b sm:border-b-0 sm:w-3/12">
        <div className="flex justify-between">
          <p className="sm:hidden w-2/6 font-semibold">Cantidad:</p>
          <div className="sm:w-full">
            <QuantityButton
              quantity={quantity}
              setQuantity={setQuantity}
              min_quantity={item.product.min_quantity_buy}
              max_quantity={item.product.max_quantity_buy}
            />
            {/* <button className="flex items-center gap-x-1 my-2 text-green-600">
              <ArrowPathIcon className="mb-1 w-5" />
              Actualizar
            </button> */}
            <button
              onClick={handle_remove_item_from_cart_btn}
              className="flex items-center gap-x-1 my-2 text-red-600"
            >
              <XCircleIcon className="mb-1 w-5" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 sm:border-b-0 sm:w-2/12">
        <div className="flex justify-between">
          <p className="sm:hidden font-semibold">Subtotal:</p>
          <p>
            {currency(
              item.product.in_offer == true
                ? quantity * item.product.offer_price
                : quantity * item.product.price,
              {
                symbol: "S/ ",
              }
            ).format()}
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
