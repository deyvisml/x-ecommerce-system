import React from "react";
import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const OrderSuccess = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-neutral-100">
      <div className="mx-auto px-3 max-w-7xl">
        <div className="flex justify-center">
          <div className="flex flex-col gap-y-2 border-2 bg-white shadow-lg my-16 px-6 sm:px-8 py-10 rounded-lg max-w-xl text-center text-gray-800">
            <CheckBadgeIcon className="m-auto w-36 text-center text-rose-400" />

            <p className="text-sm uppercase">{t("order_success.thanks")}</p>

            <h4 className="font-semibold text-2xl uppercase">
              {t("order_success.title")}
            </h4>
            <p className="text-gray-500">{t("order_success.description")}</p>

            <div className="mt-6">
              <Link
                to="/"
                href=""
                className="bg-rose-500 hover:bg-rose-600 px-10 py-2.5 border rounded-md w-full text-sm text-white uppercase transition-all duration-300 ease-in-out"
              >
                {t("order_success.continue_shopping")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
