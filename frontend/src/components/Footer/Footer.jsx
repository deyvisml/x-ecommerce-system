import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import background_footer from "../../assets/background-footer.png";
import complaints_book from "../../assets/complaints-book.png";

const Footer = () => {
  return (
    <footer className="text-sm text-white bg-sky-950 ">
      <div className="flex flex-wrap justify-between px-4 py-10 md:px-32 gap-y-10">
        <div>
          <p className="mb-3 font-bold">POLÍTICAS</p>
          <ul className="flex flex-col gap-y-3">
            <li className="transition-all duration-500 ease-in-out hover:text-rose-900">
              <a href="">Horarios de atención</a>
            </li>
            <li className="transition-all duration-500 ease-in-out hover:text-rose-900">
              <a href="">Términos y condiciones</a>
            </li>
            <li className="transition-all duration-500 ease-in-out hover:text-rose-900">
              <a href="">Politicas de entrega y devolución</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <ul className="flex items-center justify-center mb-4 text-white md:justify-end social-networks gap-x-3">
            <li className="transition-all duration-500 ease-in-out hover:text-rose-200">
              <a href="" className="block p-2 text-xl">
                <FaFacebookF />
              </a>
            </li>
            <li className="transition-all duration-500 ease-in-out hover:text-rose-200">
              <a href="" className="block p-2 text-xl">
                <FaWhatsapp />
              </a>
            </li>
            <li className="transition-all duration-500 ease-in-out hover:text-rose-200">
              <a href="" className="block p-2 text-xl">
                <FaInstagram />
              </a>
            </li>
          </ul>

          <div className="complaints-book-container">
            <a
              href=""
              className="flex flex-col items-center p-2 text-xs text-center uppercase border border-gray-500 gap-y-2 justify-cente"
            >
              <p>Libro de reclamaciones</p>
              <img src={complaints_book} alt="" className="w-20" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="bg-repeat-x h-28"
        style={{
          backgroundImage: `url(${background_footer})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      ></div>
    </footer>
  );
};

export default Footer;
