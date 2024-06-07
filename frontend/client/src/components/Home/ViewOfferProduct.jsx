import React from "react";
import axios_client from "../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ViewOfferProduct = () => {
  const { t } = useTranslation();

  const handle_go_offer_product_btn = async () => {
    try {
      const response = await axios_client(`api/products`, {
        params: {
          filtering: [
            { column: "products.in_offer", values: [1] },
            { column: "products.state_id", values: [1] },
          ],
          options: {
            only_published: true,
          },
          sorting: [{ column: null, way: "random" }],
          limit: 1,
        },
      });

      if (response.data.data.length == 0)
        throw new Error(t("home.offer_section.no_products_in_offer"));

      const offer_product = response.data.data[0];

      return navigate(
        `/categorias/${offer_product.category_id}/productos/${offer_product.id}`
      );
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  return (
    <div className="bg-rose-700 p-4 w-full text-white">
      <div className="flex md:flex-row flex-col justify-between items-center gap-3 mx-auto max-w-4xl text-xs sm:text-base">
        <span className="text-center md:text-xl md:text-left">
          {t("home.offer_section.description")}
        </span>
        <button
          onClick={handle_go_offer_product_btn}
          className="border-2 hover:bg-white px-8 py-1 md:py-2 rounded-full text-white hover:text-rose-700 transition-all duration-300 ease-in-out"
        >
          {t("home.offer_section.button_text")}
        </button>
      </div>
    </div>
  );
};

export default ViewOfferProduct;
