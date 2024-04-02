import React, { useState, useEffect } from "react";
import axios_client from "../../../helpers/axios";

const StateStoreFilter = ({ filtering, setFiltering, choose_records }) => {
  const [states, setStates] = useState([]);
  const fetch_states = async () => {
    try {
      const response = await axios_client(`/api/states`, {
        method: "get",
        params: {
          filtering: { id: choose_records },
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
    // add filter
    setFiltering((current_filtering) => {
      return {
        ...current_filtering,
        "stores.state_id":
          e.target.value == 0 ? choose_records : [e.target.value],
      };
    });
  };

  return (
    <li className="w-full">
      <select
        onChange={handle_onchange_state_select}
        value={
          filtering["stores.state_id"].length == 1
            ? filtering["stores.state_id"][0]
            : 0
        }
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
  );
};

export default StateStoreFilter;
