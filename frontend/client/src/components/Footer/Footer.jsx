import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import complaints_book from "../../../public/images/others/complaints-book.png";

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-sm text-white">
      <div className="flex flex-wrap justify-between gap-y-10 px-4 md:px-32 py-10">
        <div>
          <p className="mb-3 font-bold">POLÍTICAS</p>
          <ul className="flex flex-col gap-y-3 text-gray-400">
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="">Horarios de atención</a>
            </li>
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="">Términos y condiciones</a>
            </li>
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="">Politicas de entrega y devolución</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-end items-center gap-x-3 mb-4 text-gray-400 social-networks">
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="" className="block p-2 text-xl">
                <FaFacebookF />
              </a>
            </li>
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="" className="block p-2 text-xl">
                <FaWhatsapp />
              </a>
            </li>
            <li className="hover:text-white transition-all duration-200 ease-in-out">
              <a href="" className="block p-2 text-xl">
                <FaInstagram />
              </a>
            </li>
          </ul>

          <div className="complaints-book-container">
            <a
              href=""
              className="flex flex-col justify-cente items-center gap-y-2 border-gray-500 p-2 border text-center text-xs uppercase"
            >
              <p>Libro de reclamaciones</p>
              <img src={complaints_book} alt="" className="w-20" />
            </a>
          </div>
        </div>
      </div>

      {/*<div
        className="bg-repeat-x h-28"
        style={{
          backgroundImage: `url(${background_footer})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      ></div> */}
    </footer>
  );
};

export default Footer;
