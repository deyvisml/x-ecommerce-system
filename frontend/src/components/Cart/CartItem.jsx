import React, { useState } from "react";
import QuantityButton from "../Product/QuantityButton";
import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import useECommerce from "../../hooks/useECommerce";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { cart, setCart } = useECommerce();

  const update_quantity_cart_product = (
    new_quantity,
    item_id,
    cart,
    setCart
  ) => {
    const cart_copy = cloneDeep(cart);

    for (const item_x of cart_copy.items) {
      if (item_x.id == item_id) {
        item_x.quantity = new_quantity;
        setCart(cart_copy);
      }
    }
  };

  useEffect(() => {
    if (quantity != item.quantity) {
      update_quantity_cart_product(quantity, item.id, cart, setCart);
    }
  }, [quantity]);

  const handle_remove_item_from_cart_btn = () => {
    const cart_copy = cloneDeep(cart);
    const item_id = item.id;

    cart_copy.items = cart_copy.items.filter((itemx) => itemx.id !== item_id);
    setCart(cart_copy);
  };

  return (
    <li className="flex flex-col sm:flex-row bg-gray-50 sm:bg-white border sm:border-b-2 border-gray-300 sm:border-0 rounded-lg sm:rounded-none">
      <div className="px-2 py-3 border-b sm:border-b-0 border-gray-400 ">
        <div className="m-auto w-44 sm:w-24 md:w-40 h-auto ">
          <img
            src={`images/products/${item.product.image_url}`}
            alt="product image"
            className="block w-full h-full overflow-hidden object-contain"
          />
        </div>
      </div>
      <div className="sm:flex-1 px-2 py-3 border-b sm:border-b-0 border-gray-400 w-full ">
        <div className="flex justify-between">
          <p className="font-semibold sm:hidden block w-2/6">Producto:</p>
          <div className="text-right flex flex-col flex-1 gap-y-2 sm:text-left">
            <p className="font-extrabold text-base">{item.product.name}</p>
            <p className="sm:block text-gray-500 hidden">
              {item.product.description}
            </p>
            <p className="text-purple-700 text-xl">
              S/ {item.product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 border-b sm:border-b-0 border-gray-400 sm:w-3/12">
        <div className="flex justify-between">
          <p className="font-semibold sm:hidden w-2/6">Cantidad:</p>
          <div className="sm:w-full ">
            <QuantityButton quantity={quantity} setQuantity={setQuantity} />
            {/* <button className="flex items-center gap-x-1 my-2 text-green-600">
              <ArrowPathIcon className="mb-1 w-5 " />
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
          <p className="font-semibold sm:hidden">Subtotal:</p>
          <p>S/ {(quantity * item.product.price).toFixed(2)}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
