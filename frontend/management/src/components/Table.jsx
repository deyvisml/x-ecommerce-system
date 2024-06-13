import React from "react";
import { flexRender } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Table = ({ table }) => {
  const { t } = useTranslation();
  return (
    <table className="z-20 w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            className="border-slate-300 bg-indigo-50 border-b text-left text-xs uppercase"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <th
                className={`px-2 py-3  ${
                  header.column.getCanSort() ? "cursor-pointer" : "cursor-auto"
                }`}
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder ? null : (
                  <span className="flex items-center gap-x-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ChevronUpIcon className="w-3" strokeWidth={2} />,
                      desc: <ChevronDownIcon className="w-3" strokeWidth={2} />,
                    }[header.column.getIsSorted()] ?? null}
                  </span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-slate-300 border-b text-sm" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-2 py-2.5">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        {table.getRowModel().rows == 0 && (
          <tr className="border-slate-300 border-b text-sm">
            <td colSpan={999} className="px-2 py-2.5 text-center">
              {t("table.without_records")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
