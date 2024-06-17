import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const StockFilter = ({
  filter_column,
  selectable_record_ids,
  filtering,
  setFiltering,
}) => {
  const { t } = useTranslation();
  const [stocks, setStocks] = useState([]);
  const fetch_stocks = async () => {
    setStocks([
      {
        id: 0,
        name: "Sin stock",
      },
      {
        id: 1,
        name: "En stock",
      },
    ]);
  };

  useEffect(() => {
    fetch_stocks();
  }, []);

  const handle_onchange_stock_select = (e) => {
    const selected_record_id = e.target.value;

    const values = selected_record_id
      ? [selected_record_id]
      : selectable_record_ids;

    // add filter
    setFiltering((current_filtering) => {
      const new_filtering = cloneDeep(current_filtering);

      const found_filters = new_filtering.filter(
        (filter) => filter["column"] == filter_column
      );
      const filter = found_filters.length == 1 ? found_filters[0] : null;

      if (filter) {
        filter["values"] = values;
      } else {
        new_filtering.push({
          column: filter_column,
          values: values,
        });
      }

      return new_filtering;
    });
  };

  return (
    <select
      onChange={handle_onchange_stock_select}
      value={(() => {
        const found_filters = filtering.filter(
          (filter) => filter["column"] == filter_column
        );

        const filter = found_filters.length == 1 ? found_filters[0] : null;

        if (filter && filter["values"] && filter["values"].length == 1) {
          return filter["values"][0];
        } else {
          return "";
        }
      })()}
      className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-2 rounded w-full text-sm capitalize focus:ring-0"
    >
      <option value={""}>{t("table_filter.stock_filter")}</option>
      {stocks.map((stock, i) => {
        return (
          <option key={i} value={stock.id}>
            {stock.name}
          </option>
        );
      })}
    </select>
  );
};

export default StockFilter;
