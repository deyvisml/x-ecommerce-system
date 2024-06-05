import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import complaints_book from "../../../public/images/others/complaints-book.png";
import { Link } from "react-router-dom";
import logo_white_img from "../../../public/images/logos/logo-white.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="text-sm text-white">
      <div className="bg-sky-950">
        <div className="pt-6 text-white">
          <img src={logo_white_img} alt="" className="m-auto h-16" />
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between gap-10 m-auto px-2 py-10 max-w-7xl text-center sm:text-left">
          <div>
            <p className="mb-3 font-bold">{t("footer.policies.title")}</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <Link to={"terminos-condiciones"} href="">
                  {t("footer.policies.terms")}
                </Link>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <Link to={"politicas-entrega-devolución"} href="">
                  {t("footer.policies.delivery")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-bold">{t("footer.contact.title")}</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="tel:+56971359643">+56 971359643</a>
              </li>
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                <a href="mailto:florecer.contigo.business@gmail.com">
                  florecer.contigo.business@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-bold">{t("footer.business_hours.title")}</p>
            <ul className="flex flex-col gap-y-3 text-gray-400">
              <li className="hover:text-white transition-all duration-200 ease-in-out">
                {t("footer.business_hours.days")}
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
              <a
                href="mailto:florecer.contigo.business@gmail.com"
                className="flex flex-col justify-cente items-center gap-y-2 border-gray-500 p-2 border text-center text-xs uppercase"
              >
                <p>{t("footer.complaint_book.name")}</p>
                <img src={complaints_book} alt="" className="w-20" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-700 py-4 p-2 text-center">
        <p className="text-slate-200 text-xs">{t("footer.rights_reserved")}</p>
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
