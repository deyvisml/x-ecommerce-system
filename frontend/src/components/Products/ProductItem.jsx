import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useECommerce from "../../hooks/useECommerce";

const ProductItem = ({ product }) => {
  const { cart, setCart } = useECommerce();

  const handle_add_product_to_cart_btn = () => {
    const item = {
      product,
      quantity: 1,
    };

    setCart({ items: [...cart.items, item] });

    toast.success("Agregado al carrito de compras!");
  };

  return (
    <article className="bg-white shadow shadow-gray-300 p-2.5 rounded-md hover:text-rose-600 overflow-hidden group">
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
          onClick={
            product.has_stock
              ? handle_add_product_to_cart_btn
              : (e) => {
                  e.preventDefault;
                }
          }
          className="inline-block bg-rose-600 hover:shadow-lg py-1.5 p-1 rounded-xl w-full font-semibold text-center text-white text-xs uppercase"
        >
          Agregar
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
