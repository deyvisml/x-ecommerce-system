import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TablePagination = ({ pagination_links, setPageIndex }) => {
  const handle_click_pagination_btn = (pagination_link) => {
    if (pagination_link.url) {
      const url = new URL(pagination_link.url);
      const page = parseInt(url.searchParams.get("page"));
      setPageIndex(page - 1);
    }
  };

  return (
    <ul className="flex gap-x-1">
      {pagination_links.map((pagination_link, i) => {
        return (
          <li key={i} className="">
            <button
              className={`rounded w-8 h-8 block   ${
                !pagination_link.url
                  ? "text-slate-400 cursor-auto hover:bg-slate-100"
                  : ""
              } ${
                pagination_link.active
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-100 hover:bg-indigo-100"
              }`}
              onClick={() => handle_click_pagination_btn(pagination_link)}
            >
              {pagination_link.label == "&laquo; Previous" ? (
                <ChevronLeftIcon className="m-auto w-4" strokeWidth={2} />
              ) : pagination_link.label == "Next &raquo;" ? (
                <ChevronRightIcon className="m-auto w-4" strokeWidth={2} />
              ) : (
                pagination_link.label
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TablePagination;
