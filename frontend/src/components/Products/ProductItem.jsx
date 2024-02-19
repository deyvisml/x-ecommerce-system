import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import addItemToCart from "../../utils/addItemToCart";
import { v4 as uuidv4 } from "uuid";

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
    <article className="bg-white shadow shadow-gray-300 p-2.5 rounded-md hover:text-purple-600 overflow-hidden group">
      <Link
        to={`/categorias/${product.category_id}/productos/${product.id}`}
        className="block"
      >
        <div className="mb-1 w-full h-52 overflow-hidden">
          <img
            src={`/images/products/${product.image_url}`}
            alt=""
            className="group-hover:scale-125 w-full h-full transform transition-transform object-contain"
          />
        </div>
        <div className="mb-2 text-center ">
          <p className="mb-1 h-11 leading-5">
            {product.name.length > 40
              ? product.name.substring(0, 40) + ".."
              : product.name}
          </p>
          <p className="font-semibold text-xl">S/ {product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="mx-4">
        <button
          disabled={product.has_stock ? false : true}
          onClick={handle_add_product_to_cart_btn}
          className={`inline-block ${
            product.has_stock ? "bg-purple-600" : "bg-red-400"
          } hover:shadow-lg py-1.5 p-1 rounded-xl w-full font-semibold text-center text-white text-xs uppercase`}
        >
          Agregar
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
