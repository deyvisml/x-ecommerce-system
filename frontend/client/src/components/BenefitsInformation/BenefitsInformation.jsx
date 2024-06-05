import React from "react";
import { useTranslation } from "react-i18next";

const BenefitsInformation = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-neutral-100">
      <div className="mx-auto px-4 max-w-7xl">
        <ul className="flex flex-wrap md:flex-nowrap gap-x-12 gap-y-8 px-5 py-10 sm:py-16">
          <li className="flex items-start gap-4 w-full md:w-1/3">
            <img
              src={`/images/benefits/delivery.webp`}
              alt=""
              className="w-12 h-auto"
            />
            <div className="text-sm">
              <p className="mb-1 font-bold uppercase">
                {t("benefits_information.benefit1.title")}
              </p>
              <p className="text-xs sm:text-base">
                {t("benefits_information.benefit1.description")}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 w-full md:w-1/3">
            <img
              src={`/images/benefits/security.png`}
              alt=""
              className="w-12 h-auto"
            />
            <div className="text-sm">
              <p className="mb-1 font-bold uppercase">
                {t("benefits_information.benefit2.title")}
              </p>
              <p className="text-xs sm:text-base">
                {t("benefits_information.benefit2.description")}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 w-full md:w-1/3">
            <img
              src={`/images/benefits/client-service.webp`}
              alt=""
              className="w-12 h-auto"
            />
            <div className="text-sm">
              <p className="mb-1 font-bold uppercase">
                {t("benefits_information.benefit3.title")}
              </p>
              <p className="text-xs sm:text-base">
                {t("benefits_information.benefit3.description")}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BenefitsInformation;
