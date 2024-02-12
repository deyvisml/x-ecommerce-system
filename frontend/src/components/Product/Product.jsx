import React from "react";
import ImageZoom from "react-image-zooom";

import { FaWhatsapp } from "react-icons/fa";

import QuantityButton from "./QuantityButton";

const Product = () => {
  return (
    <div className="text-gray-800">
      <div className="mb-5">
        <div className="text-xs md:text-sm items-center flex gap-1.5 text-gray-500">
          <a className=" hover:text-gray-900 hover:underline" href="">
            Home
          </a>
          <span>/</span>
          <a className=" hover:text-gray-900 hover:underline" href="">
            Arreglos Florales
          </a>
          <span>/</span>
          <span>Símbolo del amor 29 rosas</span>
        </div>
      </div>

      <div className="flex md:flex-row flex-col flex-wrap items-start  gap-y-5">
        <div className="flex justify-center items-center w-full md:w-1/2">
          <div className="sm:mx-5 w-full leading-none overflow-hidden">
            <ImageZoom
              src="https://sonrojo.pe/wp-content/uploads/2022/09/box-sonrojo-F.jpg"
              alt="Product image"
              className="border border-gray-300"
              zoom="180"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-4 sm:mx-10">
            <a
              href="#"
              className="uppercase transition-all duration-100 ease-in-out hover:text-rose-600"
            >
              Arreglos florales
            </a>
            <h2 className="text-3xl font-extrabold">
              Símbolo del amor 29 rosas
            </h2>
            <p className="text-2xl font-bold">
              S/ 129.00{" "}
              <span className="text-sm font-normal">(impuestos incluidos)</span>
            </p>
            <div>
              <span className="block mb-2 text-sm font-semibold uppercase">
                Descripción:
              </span>
              <p className="text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                reiciendis, dolorum autem illo animi ea iste in est
                reprehenderit velit. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Nemo quisquam amet consectetur facere earum
                suscipit aliquam, tenetur nam. Ad, ratione!
              </p>
            </div>
            <div>
              <span className="block mb-2 text-sm font-semibold uppercase">
                Disponibilidad:
              </span>
              <p className="text-sm font-bold text-green-600">En stock 🗸</p>
              <p className="text-sm font-bold text-red-600">Agotado ✗</p>
            </div>
            <div>
              <span className="block mb-2 text-sm font-semibold uppercase">
                Cantidad:
              </span>
              <QuantityButton />
            </div>
            <div>
              <button className="w-full mb-1.5 p-2 py-2.5 font-semibold border text-white bg-rose-600 uppercase text-sm rounded md:rounded-md">
                Añadir al carrito
              </button>
              <a
                href="#"
                className="flex justify-center items-center gap-x-2 w-full p-2 py-2.5 text-center font-semibold border text-white bg-green-500 uppercase text-sm rounded md:rounded-md"
              >
                <FaWhatsapp className="text-xl" /> Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">xd</div>
    </div>
  );
};

export default Product;
