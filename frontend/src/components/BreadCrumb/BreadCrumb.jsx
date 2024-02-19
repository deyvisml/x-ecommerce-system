import React from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const BreadCrumb = ({ path_parts }) => {
  return (
    <ul className="flex gap-x-1 text-sm">
      {path_parts.map(({ title, url, is_home, disabled }) => {
        if (is_home) {
          return (
            <li key={title} className="flex items-center hover:font-bold">
              {disabled ? (
                <span className="select-none">
                  <HomeIcon className="inline-block mb-0.5 w-4" /> {title}
                </span>
              ) : (
                <Link to={url}>
                  <HomeIcon className="inline-block mb-0.5 w-4" /> {title}
                </Link>
              )}
            </li>
          );
        } else if (!disabled) {
          return (
            <li
              key={title}
              className="flex items-center gap-x-1 hover:font-bold"
            >
              <ChevronRightIcon className="mb-0.5 w-4" />
              <Link to={url}>{title}</Link>
            </li>
          );
        } else {
          return (
            <li key={title} className="flex items-center gap-x-1 ">
              <ChevronRightIcon className="mb-0.5 w-4" />
              <span className="select-none">{title}</span>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default BreadCrumb;
