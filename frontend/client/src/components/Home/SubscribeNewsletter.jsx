import React from "react";

const SubscribeNewsletter = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 bg-white px-4 sm:px-12 py-16 text-center">
      <p className="text-3xl">Suscríbete</p>
      <p className="text-sm sm:text-base">
        Recibe nuestros correos y se el primero en enterarte de nuestras ofertas
        exclusivas, promociones y mucho más.
      </p>

      <form action="" noValidate className="w-full">
        <div className="flex sm:flex-row flex-col justify-center gap-x-5 gap-y-3">
          <input
            type="email"
            className="border-gray-400 px-3 p-2 border rounded-xl w-full sm:max-w-sm outline-none"
            placeholder="Tu correo electrónico"
          />
          <button
            type="submit"
            className="hover:bg-rose-500 px-10 p-2 border border-rose-600 rounded-xl text-rose-600 hover:text-white transition-all duration-300 ease-in-out"
          >
            Suscribirse
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscribeNewsletter;
