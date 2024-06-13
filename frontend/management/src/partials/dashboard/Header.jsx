import React, { useState } from "react";

import UserMenu from "../../components/dashboard/DropdownProfile";
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="top-0 z-30 sticky border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182235] border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center -mb-px h-16">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="lg:hidden text-slate-500 hover:text-slate-600"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div className="w-40 text-xs">
              <LocaleSwitcher />
            </div>
            {/*<ThemeToggle />*/}
            {/*  Divider */}
            <hr className="bg-slate-200 dark:bg-slate-700 border-none w-px h-6" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
