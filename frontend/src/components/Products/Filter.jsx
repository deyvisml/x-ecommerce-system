import React from "react";

const Filter = ({ items = [] }) => {
  return (
    <div className="text-sm">
      <span className="block mb-1">Filtrar por tipo</span>

      <ul className="flex flex-wrap gap-1 text-xs">
        {items.map(({ name, id }) => {
          return (
            <li
              key={id}
              className="cursor-pointer hover:bg-purple-200 transition-all ease-in-out duration-100 px-3.5 py-1.5 text-center border border-gray-500 rounded-full"
            >
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
