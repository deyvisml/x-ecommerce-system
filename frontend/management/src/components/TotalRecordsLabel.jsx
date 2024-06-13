import React from "react";
import { useTranslation } from "react-i18next";

const TotalRecordsLabel = ({ table }) => {
  const { t } = useTranslation();
  return (
    <p className="text-xs">
      {t("table.total_records_label.parts.one")}{" "}
      {table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
        1}{" "}
      {t("table.total_records_label.parts.two")}{" "}
      {(table.getState().pagination.pageIndex + 1) *
        table.getState().pagination.pageSize}{" "}
      {t("table.total_records_label.parts.three")}{" "}
      <strong>{table.getRowCount().toLocaleString()}</strong>{" "}
      {t("table.total_records_label.parts.four")}
    </p>
  );
};

export default TotalRecordsLabel;
