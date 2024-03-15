import React, { useState, useRef, useEffect } from "react";
import Transition from "../../utils/dashboard/Transition";

function DateSelect() {
  const options = [
    {
      id: 0,
      period: "Today",
    },
    {
      id: 1,
      period: "Last 7 Days",
    },
    {
      id: 2,
      period: "Last Month",
    },
    {
      id: 3,
      period: "Last 12 Months",
    },
    {
      id: 4,
      period: "All Time",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(2);

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
    <div className="relative">
      <button
        ref={trigger}
        className="justify-between border-slate-200 hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-700 bg-white dark:bg-slate-800 min-w-44 text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 dark:text-slate-300 btn"
        aria-label="Select date range"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="flex items-center">
          <svg
            className="mr-2 w-4 h-4 text-slate-500 dark:text-slate-400 fill-current shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
          <span>{options[selected].period}</span>
        </span>
        <svg
          className="ml-1 text-slate-400 fill-current shrink-0"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="top-full right-0 z-10 absolute border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg mt-1 py-1.5 border rounded w-full overflow-hidden"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-slate-600 text-sm dark:text-slate-300"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {options.map((option) => {
            return (
              <button
                key={option.id}
                tabIndex="0"
                className={`flex items-center w-full hover:bg-slate-50 hover:dark:bg-slate-700/20 py-1 px-3 cursor-pointer ${
                  option.id === selected && "text-indigo-500"
                }`}
                onClick={() => {
                  setSelected(option.id);
                  setDropdownOpen(false);
                }}
              >
                <svg
                  className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                    option.id !== selected && "invisible"
                  }`}
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                </svg>
                <span>{option.period}</span>
              </button>
            );
          })}
        </div>
      </Transition>
    </div>
  );
}

export default DateSelect;
