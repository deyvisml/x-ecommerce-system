import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/dashboard/Transition";

function DropdownFilter({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="inline-flex relative">
      <button
        ref={trigger}
        className="border-slate-200 hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-400 btn"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full left-0 right-auto min-w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right"
            ? "md:left-auto md:right-0"
            : "md:left-0 md:right-auto"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="px-3 pt-1.5 pb-2 font-semibold text-slate-400 text-xs dark:text-slate-500 uppercase">
            Filters
          </div>
          <ul className="mb-4">
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">
                  Direct VS Indirect
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">
                  Real Time Value
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">Top Channels</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">
                  Sales VS Refunds
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">Last Order</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-medium text-sm">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20 px-3 py-2 border-t">
            <ul className="flex justify-between items-center">
              <li>
                <button className="border-slate-200 hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 btn-xs">
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white btn-xs"
                  onClick={() => setDropdownOpen(false)}
                  onBlur={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
