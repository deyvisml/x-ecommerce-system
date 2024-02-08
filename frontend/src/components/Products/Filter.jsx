import React from "react";

const Filter = ({ items = [], filter_item_id, setFilterItemId }) => {
  const handle_filter_item_click = (e) => {
    const filter_item_id = e.target.dataset.filterItemId;
    setFilterItemId(filter_item_id);
  };

  return (
    <div className="text-sm">
      <span className="block mb-1 font-semibold text-gray-700">
        Filtrar por tipo
      </span>

      <ul className="flex flex-wrap gap-1 text-xs">
        {items.map(({ name, id }) => {
          return (
            <li
              key={id}
              data-filter-item-id={id}
              onClick={handle_filter_item_click}
              className={`cursor-pointer hover:bg-purple-200 transition-all ease-in-out duration-100 px-3.5 py-1.5 text-center border border-gray-500 rounded-full ${
                filter_item_id == id && "bg-purple-200"
              }`}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
