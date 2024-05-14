import React from "react";
import axios_client from "../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handle_go_offer_product_btn = async () => {
  const { data } = await axios_client(`api/products`, {
    method: "get",
    params: {
      filtering: [
        { column: "products.in_offer", values: [1] },
        { column: "products.state_id", values: [1] },
      ],
      sorting: [{ column: null, way: "random" }],
      limit: 1,
    },
  });

  const offer_product = data.data[0];

  if (!offer_product) {
    toast.error("Aun no hay productos en oferta.");
    throw new Error("Sin productos en oferta.");
  }

  return navigate(
    `/categorias/${offer_product.category_id}/productos/${offer_product.id}`
  );
};

const ViewOfferProduct = () => {
  return (
    <div className="bg-rose-700 p-4 w-full text-white">
      <div className="flex md:flex-row flex-col justify-between items-center gap-3 mx-auto max-w-4xl">
        <span className="text-base text-center md:text-xl md:text-left">
          Descubre la oferta de dia que tenemos para ti
        </span>
        <button
          onClick={handle_go_offer_product_btn}
          className="border-2 hover:bg-white px-8 py-0 md:py-2 rounded-full text-white hover:text-rose-700 transition-all duration-300 ease-in-out"
        >
          Ofertas del dia
        </button>
      </div>
    </div>
  );
};

export default ViewOfferProduct;
