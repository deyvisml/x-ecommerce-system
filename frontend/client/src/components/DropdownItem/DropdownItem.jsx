import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DropdownItem = ({ children, subitems }) => {
  const [is_open, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <div>{children}</div>
      {is_open && subitems.length > 0 && (
        <ul className="bottom-0 z-40 absolute bg-white border rounded min-w-40 text-gray-600 text-xs transform translate-y-full">
          {subitems.map(({ name, url }) => {
            return (
              <li key={name} className="hover:bg-gray-50 normal-case">
                <Link className="block px-2 py-2.5" to={url}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropdownItem;
