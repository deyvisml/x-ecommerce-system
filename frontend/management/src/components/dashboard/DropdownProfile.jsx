import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/dashboard/Transition";
import useManagement from "../../hooks/useManagement";
import { UserIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios_client from "../../helpers/axios";
import { useNavigate } from "react-router-dom";

function DropdownProfile({ align }) {
  let navigate = useNavigate();
  const { token, user, role, set_token } = useManagement();

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

  const handle_click_exit_btn = async () => {
    try {
      const response = await axios_client(`/api/auth/logout`, {
        method: "post",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.status) throw new Error(response.data.message);

      set_token();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [token]);

  return (
    <div className="inline-flex relative">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="flex justify-center items-center bg-indigo-900 rounded-full w-7 h-7">
          <UserIcon className="w-5 text-white" />
        </div>
        <div className="flex items-center truncate">
          <span className="group-hover:text-slate-800 dark:group-hover:text-slate-200 ml-2 font-medium text-sm dark:text-slate-300 truncate">
            {user.first_name} {user.last_name}
          </span>
          <svg
            className="ml-1 w-3 h-3 text-slate-400 fill-current shrink-0"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="border-slate-200 dark:border-slate-700 mb-1 px-3 pt-0.5 pb-2 border-b">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-slate-500 text-xs dark:text-slate-400 italic capitalize">
              {role.name}
            </div>
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center px-3 py-1 font-medium text-indigo-500 text-sm hover:text-indigo-600 dark:hover:text-indigo-400"
                to="#"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Ajustes
              </Link>
            </li>
            <li>
              <button
                className="flex items-center px-3 py-1 w-full font-medium text-indigo-500 text-sm hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={handle_click_exit_btn}
              >
                Salir
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
