import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TableSearch = ({ setPageIndex, setSearchQuery, INIT_PAGE_INDEX }) => {
  const handle_onchange_search_input = (e) => {
    setPageIndex(INIT_PAGE_INDEX);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative w-full md:w-auto">
      <input
        type="text"
        onChange={handle_onchange_search_input}
        placeholder="Buscar..."
        className="border-slate-300 bg-slate-100 py-2 border rounded-md w-full outline-none ps-8 focus:ring-transparent"
      />
      <MagnifyingGlassIcon
        className="top-1/2 left-2 absolute w-5 text-slate-400 transform -translate-y-1/2"
        strokeWidth={3}
      />
    </div>
  );
};

export default TableSearch;
