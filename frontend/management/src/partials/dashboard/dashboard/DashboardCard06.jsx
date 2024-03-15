import React from "react";
import DoughnutChart from "../../../components/charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../../utils/dashboard/Utils";

function DashboardCard06() {
  const chartData = {
    labels: ["United States", "Italy", "Other"],
    datasets: [
      {
        label: "Top Countries",
        data: [35, 30, 35],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col border-slate-200 dark:border-slate-700 col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg border rounded-sm">
      <header className="border-slate-100 dark:border-slate-700 px-5 py-4 border-b">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Countries
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
