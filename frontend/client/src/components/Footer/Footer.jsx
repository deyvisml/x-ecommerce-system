import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import complaints_book from "../../../public/images/others/complaints-book.png";
import { Link } from "react-router-dom";
import logo_white_img from "../../../public/images/logos/logo-white.svg";

const Footer = () => {
  return (
    <footer className="text-sm text-white">
      <div className="bg-sky-950">
        <div className="pt-6 text-white">
          <img src={logo_white_img} alt="" className="m-auto h-16" />
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between gap-10 m-auto px-2 py-10 max-w-7xl text-center sm:text-left">
          <div>
            <p className="mb-3 font-bold">POLÍTICAS</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="">Términos y condiciones</a>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="">Politicas de entrega y devolución</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-bold">CONTACTO</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="tel:+51975032529">+51 975032529</a>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="mail:florecer.contigo.business@gmail.com">
                  florecer.contigo.business@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-bold">HORARIOS DE ATENCIÓN</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                Lunes - Sabado
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                9:00 AM - 18:00 PM
              </li>
            </ul>
          </div>

          <div className="w-full md:w-auto">
            <ul className="flex justify-center md:justify-end items-center gap-x-3 mb-4 text-gray-400 social-networks">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="#" target="_blank" className="block p-2 text-xl">
                  <FaFacebookF />
                </a>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="#" target="_blank" className="block p-2 text-xl">
                  <FaWhatsapp />
                </a>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="#" target="_blank" className="block p-2 text-xl">
                  <FaInstagram />
                </a>
              </li>
            </ul>

            <div className="complaints-book-container">
              <Link
                href=""
                className="flex flex-col justify-cente items-center gap-y-2 border-gray-500 p-2 border text-center text-xs uppercase"
              >
                <p>Libro de reclamaciones</p>
                <img src={complaints_book} alt="" className="w-20" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-700 py-4 p-2 text-center">
        <p className="text-slate-200 text-xs">
          2024 florecer contigo . Todos los derechos reservados
        </p>
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
