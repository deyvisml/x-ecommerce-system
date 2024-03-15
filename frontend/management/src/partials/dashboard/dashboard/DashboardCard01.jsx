import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../../components/charts/LineChart01";
import Icon from "../../../images/dashboard/icon-01.svg";
import EditMenu from "../../../components/dashboard/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../utils/dashboard/Utils";

function DashboardCard01() {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line
      {
        data: [
          532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234,
          314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
        ],
        borderColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        pointHoverBackgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.slate[500]
        )}, 0.25)`,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col border-slate-200 dark:border-slate-700 col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg border rounded-sm">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="inline-flex relative">
            <li>
              <Link
                className="flex px-3 py-1 font-medium text-slate-600 text-sm hover:text-slate-800 dark:hover:text-slate-200 dark:text-slate-300"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="flex px-3 py-1 font-medium text-slate-600 text-sm hover:text-slate-800 dark:hover:text-slate-200 dark:text-slate-300"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="flex px-3 py-1 font-medium text-rose-500 text-sm hover:text-rose-600"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="mb-2 font-semibold text-lg text-slate-800 dark:text-slate-100">
          Acme Plus
        </h2>
        <div className="mb-1 font-semibold text-slate-400 text-xs dark:text-slate-500 uppercase">
          Sales
        </div>
        <div className="flex items-start">
          <div className="mr-2 font-bold text-3xl text-slate-800 dark:text-slate-100">
            $24,780
          </div>
          <div className="bg-emerald-500 px-1.5 rounded-full font-semibold text-sm text-white">
            +49%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="max-sm:max-h-[128px] xl:max-h-[128px] grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
