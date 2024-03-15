import React from "react";

function DashboardCard13() {
  return (
    <div className="border-slate-200 dark:border-slate-700 col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg border rounded-sm">
      <header className="border-slate-100 dark:border-slate-700 px-5 py-4 border-b">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Income/Expenses
        </h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 p-2 rounded-sm font-semibold text-slate-400 text-xs dark:text-slate-500 uppercase">
            Today
          </header>
          <ul className="my-1">
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-slate-500 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-rose-50 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
                </svg>
              </div>
              <div className="flex items-center border-slate-100 dark:border-slate-700 py-2 border-b text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      Qonto
                    </a>{" "}
                    billing
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      -$49.88
                    </span>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-emerald-500 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-emerald-50 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
                </svg>
              </div>
              <div className="flex items-center border-slate-100 dark:border-slate-700 py-2 border-b text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      Cruip.com
                    </a>{" "}
                    Market Ltd 70 Wilson St London
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-emerald-500">
                      +249.88
                    </span>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-emerald-500 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-emerald-50 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
                </svg>
              </div>
              <div className="flex items-center border-slate-100 dark:border-slate-700 py-2 border-b text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      Notion Labs Inc
                    </a>
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-emerald-500">+99.99</span>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-emerald-500 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-emerald-50 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
                </svg>
              </div>
              <div className="flex items-center border-slate-100 dark:border-slate-700 py-2 border-b text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      Market Cap Ltd
                    </a>
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-emerald-500">
                      +1,200.88
                    </span>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-slate-200 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-slate-400 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M21.477 22.89l-8.368-8.367a6 6 0 008.367 8.367zm1.414-1.413a6 6 0 00-8.367-8.367l8.367 8.367zM18 26a8 8 0 110-16 8 8 0 010 16z" />
                </svg>
              </div>
              <div className="flex items-center border-slate-100 dark:border-slate-700 py-2 border-b text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      App.com
                    </a>{" "}
                    Market Ltd 70 Wilson St London
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-slate-800 dark:text-slate-100 line-through">
                      +$99.99
                    </span>
                  </div>
                </div>
              </div>
            </li>
            {/* Item */}
            <li className="flex px-2">
              <div className="bg-slate-500 my-2 mr-3 rounded-full w-9 h-9 shrink-0">
                <svg
                  className="w-9 h-9 text-rose-50 fill-current"
                  viewBox="0 0 36 36"
                >
                  <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
                </svg>
              </div>
              <div className="flex items-center py-2 text-sm grow">
                <div className="flex justify-between grow">
                  <div className="self-center">
                    <a
                      className="font-medium text-slate-800 hover:text-slate-900 dark:hover:text-white dark:text-slate-100"
                      href="#0"
                    >
                      App.com
                    </a>{" "}
                    Market Ltd 70 Wilson St London
                  </div>
                  <div className="ml-2 self-start shrink-0">
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      -$49.88
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard13;
