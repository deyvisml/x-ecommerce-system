import React from "react";
import { FaWhatsapp } from "react-icons/fa";

import QuantityButton from "./QuantityButton";

const Product = () => {
  return (
    <div className="text-gray-800">
      <div className="mb-10">
        <div className="text-sm flex gap-1.5 text-gray-500">
          <a className=" hover:text-gray-900 hover:underline" href="">
            Home
          </a>
          <span>/</span>
          <a className=" hover:text-gray-900 hover:underline" href="">
            Tienda
          </a>
          <span>/</span>
          <a className=" hover:text-gray-900 hover:underline" href="">
            Arreglos Florales
          </a>
          <span>/</span>
          <span>Símbolo del amor 29 rosas</span>
        </div>
      </div>

      <div className="flex flex-wrap items-start">
        <div className="flex justify-center w-1/2 bg-blue-100">
          <div
            className="bg-red-200 border "
            style={{ width: 500, height: 500 }}
          >
            {/*<img
              src="https://lima.enviaflores.pe/wp-content/uploads/2022/08/corazon-recostado.png"
              alt=""
              className="object-cover w-full h-full"
            />*/}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-4 mx-10">
            <a
              href="#"
              className="uppercase transition-all duration-100 ease-in-out hover:text-purple-800"
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
              <button className="w-full mb-1.5 p-2 py-2.5 font-semibold border text-white bg-purple-800 uppercase text-sm rounded-md">
                Añadir al carrito
              </button>
              <a
                href="#"
                className="flex justify-center items-center gap-x-2 w-full p-2 py-2.5 text-center font-semibold border text-white bg-green-500 uppercase text-sm rounded-md"
              >
                <FaWhatsapp className="text-xl" /> Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
