import React, { useState } from "react";

import Sidebar from "../../partials/dashboard/Sidebar";
import Header from "../../partials/dashboard/Header";
import WelcomeBanner from "../../partials/dashboard/dashboard/WelcomeBanner";
import DashboardAvatars from "../../partials/dashboard/dashboard/DashboardAvatars";
import FilterButton from "../../components/dashboard/DropdownFilter";
import Datepicker from "../../components/dashboard/Datepicker";
import DashboardCard01 from "../../partials/dashboard/dashboard/DashboardCard01";
import DashboardCard02 from "../../partials/dashboard/dashboard/DashboardCard02";
import DashboardCard03 from "../../partials/dashboard/dashboard/DashboardCard03";
import DashboardCard04 from "../../partials/dashboard/dashboard/DashboardCard04";
import DashboardCard05 from "../../partials/dashboard/dashboard/DashboardCard05";
import DashboardCard06 from "../../partials/dashboard/dashboard/DashboardCard06";
import DashboardCard07 from "../../partials/dashboard/dashboard/DashboardCard07";
import DashboardCard08 from "../../partials/dashboard/dashboard/DashboardCard08";
import DashboardCard09 from "../../partials/dashboard/dashboard/DashboardCard09";
import DashboardCard10 from "../../partials/dashboard/dashboard/DashboardCard10";
import DashboardCard11 from "../../partials/dashboard/dashboard/DashboardCard11";
import DashboardCard12 from "../../partials/dashboard/dashboard/DashboardCard12";
import DashboardCard13 from "../../partials/dashboard/dashboard/DashboardCard13";
import Banner from "../../partials/dashboard/Banner";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="justify-start sm:justify-end gap-2 grid grid-flow-col sm:auto-cols-max">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white btn">
                  <svg
                    className="opacity-50 w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="xs:block hidden ml-2">Add view</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="gap-6 grid grid-cols-12">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
