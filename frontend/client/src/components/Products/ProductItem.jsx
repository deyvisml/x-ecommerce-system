import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import addItemToCart from "../../utils/addItemToCart";
import { v4 as uuidv4 } from "uuid";
import currency from "currency.js";

import useECommerce from "../../hooks/useECommerce";

const ProductItem = ({ product }) => {
  const { cart, setCart } = useECommerce();

  const handle_add_product_to_cart_btn = () => {
    const item = {
      id: uuidv4(),
      product,
      quantity: 1,
    };

    const [error_occurred, message] = addItemToCart(item, cart, setCart);

    if (!error_occurred) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <article className="flex flex-col justify-between bg-white shadow shadow-gray-300 p-2.5 rounded-md hover:text-rose-600 overflow-hidden group">
      <Link
        to={`/categorias/${product.category_id}/productos/${product.id}`}
        className="block"
      >
        <div className="mb-1 w-full h-52 overflow-hidden">
          <img
            src={`/images/products/${product.image_name}`}
            alt=""
            className="group-hover:scale-125 w-full h-full transform transition-transform object-contain"
          />
        </div>
        <div className="mb-2 text-center">
          {product.in_offer == true && (
            <div className="mb-2 w-full text-left uppercase">
              <p className="inline-block bg-gray-600 px-1 py-0.5 rounded text-white text-xs">
                Oferta del dia
              </p>
            </div>
          )}

          <p className="mb-1 h-11 leading-5">
            {product.name.length > 40
              ? product.name.substring(0, 40) + ".."
              : product.name}
          </p>
          <div className="flex justify-center items-center gap-x-1.5">
            <p className="block font-semibold text-xl">
              {currency(product.price, {
                symbol: "S/ ",
              }).format()}
            </p>
            {product.discount_rate > 0 && (
              <span className="bg-rose-600 mb-0.5 px-1.5 py-0.5 rounded font-bold text-white text-xs">
                -{product.discount_rate}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mx-4">
        <button
          disabled={product.in_stock ? false : true}
          onClick={handle_add_product_to_cart_btn}
          className={`inline-block ${
            product.in_stock ? "bg-rose-500" : "bg-red-400"
          } hover:shadow-lg py-1.5 p-1 rounded-xl w-full font-semibold text-center text-white text-xs uppercase`}
        >
          {product.in_stock ? "Agregar" : "Agotado"}
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
