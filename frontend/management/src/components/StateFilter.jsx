import React, { useState, useEffect } from "react";
import axios_client from "../helpers/axios";
import { cloneDeep } from "lodash";

const StateFilter = ({
  filter_column,
  selectable_record_ids,
  filtering,
  setFiltering,
}) => {
  const [states, setStates] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {
          filtering: [{ column: "id", values: selectable_record_ids }],
        },
        headers: {
          authorization: "Bearer ",
        },
      });
      setStates(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    fetch_states();
  }, []);

  const handle_onchange_state_select = (e) => {
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
    <li className="w-full">
      <select
        onChange={handle_onchange_state_select}
        value={(() => {
          const found_filters = filtering.filter(
            (filter) => filter["column"] == filter_column
          );

          const filter = found_filters.length == 1 ? found_filters[0] : null;

          if (filter && filter["values"].length == 1) {
            return filter["values"][0];
          } else {
            return "";
          }
        })()}
        name=""
        id=""
        className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-2 rounded w-full text-sm focus:ring-0"
      >
        <option value={""}>Estado</option>
        {states.map((state, i) => {
          return (
            <option key={i} value={state.id} className="capitalize">
              {state.name}
            </option>
          );
        })}
      </select>
    </li>
  );
};

export default StateFilter;
