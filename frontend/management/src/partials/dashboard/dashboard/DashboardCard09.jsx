import React from "react";
import Tooltip from "../../../components/dashboard/Tooltip";
import BarChart from "../../../components/charts/BarChart02";

// Import utilities
import { tailwindConfig } from "../../../utils/dashboard/Utils";

function DashboardCard09() {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
    ],
    datasets: [
      // Light blue bars
      {
        label: "Stack 1",
        data: [6200, 9200, 6600, 8800, 5200, 9200],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: "Stack 2",
        data: [-4000, -2600, -5350, -4000, -7500, -2000],
        backgroundColor: tailwindConfig().theme.colors.indigo[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col border-slate-200 dark:border-slate-700 col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg border rounded-sm">
      <header className="flex items-center border-slate-100 dark:border-slate-700 px-5 py-4 border-b">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Sales VS Refunds
        </h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">
            Sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit.
          </div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="mr-2 font-bold text-3xl text-slate-800 dark:text-slate-100">
            +$6,796
          </div>
          <div className="bg-amber-500 px-1.5 rounded-full font-semibold text-sm text-white">
            -34%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard09;
