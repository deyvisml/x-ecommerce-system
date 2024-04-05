import React from "react";

const PageSize = ({
  setPageIndex,
  setPageSize,
  INIT_PAGE_INDEX,
  PAGE_SIZES,
  page_size,
}) => {
  const handle_onchange_page_size = (e) => {
    setPageIndex(INIT_PAGE_INDEX);
    setPageSize(e.target.value);
  };

  return (
    <select
      onChange={handle_onchange_page_size}
      name=""
      id=""
      className="border-slate-300 border rounded-md focus:ring-transparent"
      value={page_size}
    >
      {PAGE_SIZES.map((element, i) => {
        return (
          <option key={i} value={element}>
            {element}
          </option>
        );
      })}
    </select>
  );
};

export default PageSize;
