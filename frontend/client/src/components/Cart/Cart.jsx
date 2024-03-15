import React from "react";
import { Link } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { ChevronLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import ApplyCoupon from "./ApplyCoupon";
import CartItem from "./CartItem";
import currency from "currency.js";

const Cart = () => {
  const { cart } = useECommerce();

  const num_items = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const total_price_items = cart.items.reduce(
    (acc, item) =>
      acc +
      (item.product.in_offer ? item.product.offer_price : item.product.price) *
        item.quantity,
    0
  );

  const path_parts = [
    { title: "Home", url: "/", is_home: true, disabled: false },
    { title: "Carrito de Compras", url: "", is_home: false, disabled: false },
    { title: "Proceso de pago", url: "", is_home: false, disabled: true },
  ];

  return (
    <div className="mb-20">
      <div className="bg-rose-500 py-10 pb-24">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-y-3 text-white">
            <h3 className="order-2 lg:order-1 font-bold text-2xl">
              Mi Carrito de compras
            </h3>
            <div className="order-1 lg:order-2">
              <BreadCrumb path_parts={path_parts} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[-60px]">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="flex lg:flex-row flex-col items-start gap-x-10 gap-y-10">
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-10 text-white">
                <p className="font-bold">Tus productos seleccionados</p>
                <Link
                  to="/"
                  className="flex items-center gap-x-2 border-white hover:bg-sky-950 px-3 p-2 border rounded font-bold text-xs transition-all duration-300 ease-in-out"
                >
                  <ChevronLeftIcon className="inline-block mb-0.5 w-4" />{" "}
                  Continuar comprando
                </Link>
              </div>
              {cart.items.length ? (
                <ul className="flex flex-col gap-y-5 sm:gap-y-0 w-full text-sm">
                  <li className="sm:flex border-gray-300 hidden border-b-2 font-semibold">
                    <div className="flex-1 px-2 py-3 w-7/12 text-left">
                      Producto
                    </div>
                    <div className="px-2 py-3 w-3/12 text-left">Cantidad</div>
                    <div className="px-2 py-3 w-2/12 text-left">Subtotal</div>
                  </li>
                  {cart.items.map((item) => {
                    return <CartItem key={item.product.id} item={item} />;
                  })}
                </ul>
              ) : (
                <p className="inline-block my-10 w-full text-center text-gray-700 text-sm">
                  <ShoppingBagIcon className="inline-block mb-1 w-5 me-2" />
                  Lo sentimos, aún no hay productos seleccionados en tu carrito
                  de compras.{" "}
                  <Link to="/" className="font-bold text-rose-500">
                    ¿Desea continuar comprando?
                  </Link>
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-6 border-gray-300 bg-white shadow-lg py-8 p-5 border rounded-md w-full lg:w-1/4 text-gray-700">
              <p className="block font-bold text-center text-xl">
                Total de compras
              </p>
              <div className="flex justify-between bg-gray-100 p-2 text-sm">
                <p>
                  <span>{num_items}</span> articulos
                </p>
                <p>
                  {currency(total_price_items, {
                    symbol: "S/ ",
                  }).format()}
                </p>
              </div>
              <p className="font-semibold text-2xl text-center">
                {currency(total_price_items, {
                  symbol: "S/ ",
                }).format()}
              </p>
              {cart.items.length > 0 && (
                <>
                  <ApplyCoupon />
                  <Link
                    to={"/pedido"}
                    className="bg-rose-500 hover:bg-rose-600 shadow p-2.5 rounded font-semibold text-center text-sm text-white uppercase transition-all dura300 ease-in-out"
                  >
                    Finalizar pedido
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
