import React, { useState, useEffect } from "react";
import axios_client from "../../../helpers/axios";
import { cloneDeep } from "lodash";

const StoreFilter = ({ setFiltering }) => {
  const [states, setStates] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {
          filtering: { id: [1, 2, 3] },
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
    if (e.target.value == 0) {
      // remove filter
      setFiltering((current_filtering) => {
        const new_filtering = cloneDeep(current_filtering);
        delete new_filtering["stores.state_id"];
        return new_filtering;
      });
    } else {
      // add filter
      setFiltering((current_filtering) => {
        return {
          ...current_filtering,
          "stores.state_id": [e.target.value],
        };
      });
    }
  };

  return (
    <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg mt-6 p-5 border rounded-sm">
      <h5 className="font-semibold text-xl">Filtro</h5>
      <ul className="flex md:flex-row flex-col gap-4 mt-2">
        <li className="w-full">
          <select
            onChange={handle_onchange_state_select}
            name=""
            id=""
            className="border-slate-200 focus:border-indigo-400 mt-1 px-2 py-2 rounded w-full text-sm focus:ring-0"
          >
            <option value={0}>Estado</option>
            {states.map((state, i) => {
              return (
                <option key={i} value={state.id} className="capitalize">
                  {state.name}
                </option>
              );
            })}
          </select>
        </li>
      </ul>
    </div>
  );
};

export default StoreFilter;
