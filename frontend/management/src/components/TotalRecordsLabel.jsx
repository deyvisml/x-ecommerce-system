import React from "react";

const TotalRecordsLabel = ({ table }) => {
  return (
    <p className="text-xs">
      Mostrando del{" "}
      {table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
        1}{" "}
      al{" "}
      {(table.getState().pagination.pageIndex + 1) *
        table.getState().pagination.pageSize}{" "}
      de <strong>{table.getRowCount().toLocaleString()}</strong> entradas.
    </p>
  );
};

export default TotalRecordsLabel;
