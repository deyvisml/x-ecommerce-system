import React from "react";
import { useTranslation } from "react-i18next";

const TableFilter = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg mt-6 p-5 border rounded-sm">
      <h5 className="font-semibold text-xl dark:text-slate-400">
        {t("table_filter.title")}
      </h5>
      <ul className="flex md:flex-row flex-col gap-4 mt-2">{children}</ul>
    </div>
  );
};

export default TableFilter;
