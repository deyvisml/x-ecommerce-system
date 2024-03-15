import React from "react";
import BarChart from "../../../components/charts/BarChart03";

// Import utilities
import { tailwindConfig } from "../../../utils/dashboard/Utils";

function DashboardCard11() {
  const chartData = {
    labels: ["Reasons"],
    datasets: [
      {
        label: "Having difficulties using the product",
        data: [131],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Missing features I need",
        data: [100],
        backgroundColor: tailwindConfig().theme.colors.indigo[800],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[900],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Not satisfied about the quality of the product",
        data: [81],
        backgroundColor: tailwindConfig().theme.colors.sky[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[500],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "The product doesn’t look as advertised",
        data: [65],
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Other",
        data: [72],
        backgroundColor: tailwindConfig().theme.colors.slate[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.slate[300],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="border-slate-200 dark:border-slate-700 col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg border rounded-sm">
      <header className="border-slate-100 dark:border-slate-700 px-5 py-4 border-b">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Reason for Refunds
        </h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="mr-2 font-bold text-3xl text-slate-800 dark:text-slate-100">
            449
          </div>
          <div className="bg-yellow-500 px-1.5 rounded-full font-semibold text-sm text-white">
            -22%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
