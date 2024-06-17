import React, { useState, useEffect } from "react";
import axios_client from "../helpers/axios";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const CategoryFilter = ({
  filter_column,
  selectable_record_ids,
  filtering,
  setFiltering,
}) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const fetch_categories = async () => {
    try {
      const response = await axios_client(`/api/categories`, {
        method: "get",
        params: {
          filtering: [
            { column: "categories.id", values: selectable_record_ids },
          ],
        },
        headers: {
          authorization: "Bearer ",
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    fetch_categories();
  }, []);

  const handle_onchange_category_select = (e) => {
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
      onChange={handle_onchange_category_select}
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
      <option value={""}>{t("table_filter.category_filter")}</option>
      {categories.map((category, i) => {
        return (
          <option key={i} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryFilter;
