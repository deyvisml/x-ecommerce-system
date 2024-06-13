import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const ExportTableDataButton = () => {
  const { t } = useTranslation();
  return (
    <button className="bg-indigo-100 hover:bg-indigo-500 text-indigo-500 hover:text-white btn">
      <ArrowDownTrayIcon className="w-5" strokeWidth={2} />{" "}
      {t("general.buttons.export")}
    </button>
  );
};

export default ExportTableDataButton;
