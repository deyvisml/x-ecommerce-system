import React from "react";
import { Link } from "react-router-dom";
import currency from "currency.js";
import { useTranslation } from "react-i18next";

const ProductItem = ({ product }) => {
  const { t } = useTranslation();

  return (
    <article className="flex flex-col justify-between bg-white shadow shadow-gray-300 hover:shadow-lg rounded-md hover:text-rose-600 overflow-hidden group">
      <Link
        to={`/categorias/${product.category_id}/productos/${product.id}`}
        className="block p-2.5 group"
      >
        <div className="mb-1 w-full h-52 overflow-hidden">
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/storage/images/products/medium/${product.image_name}`}
            alt=""
            className="group-hover:scale-125 w-full h-full transform transition-transform object-contain"
          />
        </div>
        <div className="text-center">
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

        <div className="group-hover:visible mx-2 invisible">
          <span
            className={`inline-block bg-rose-500 hover:shadow-lg py-1.5 p-1 rounded-xl w-full font-semibold text-center text-white text-xs `}
          >
            {t("product_item.show_product_button")}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProductItem;
