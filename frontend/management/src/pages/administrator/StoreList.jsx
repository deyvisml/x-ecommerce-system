import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import axios_client from "../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INIT_PAGE_INDEX = 0;
const INIT_PAGE_SIZE = 3;

function StoreList() {
  const [search_query, setSearchQuery] = useState();
  const [page_index, setPageIndex] = useState(INIT_PAGE_INDEX);
  const [page_size, setPageSize] = useState(INIT_PAGE_SIZE);
  const [pagination, setPagination] = useState({
    pageIndex: page_index, //initial page index
    pageSize: page_size, //default page size
  });
  const [sorting, setSorting] = useState([]);
  const [pagination_links, setPaginationLinks] = useState([]);
  const [total_records, setTotalRecords] = useState(0);

  const [data, setData] = useState([
    {
      firstName: "tanner",
      lastName: "Linsley",
      age: 33,
      visits: 100,
      progress: 50,
      status: "Married",
    },
    {
      firstName: "Kevin",
      lastName: "Vandy",
      age: 27,
      visits: 200,
      progress: 100,
      status: "Single",
    },
  ]);

  // useMemo is optional, only use to save the data when it's rendering many times, a direct way is to use the array instead
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => "Nombre",
        cell: (info) => <i>{info.getValue()}</i>,
      },
      {
        accessorKey: "ruc",
        header: () => "RUC",
        cell: (info) => <i>{info.getValue()}</i>,
        enableSorting: false,
      },
      {
        accessorKey: "business_name",
        header: () => "business_name",
        cell: (info) => <i>{info.getValue()}</i>,
        enableSorting: false,
      },
      {
        accessorKey: "created_at",
        header: () => "Creado",
        cell: (info) => <i>{info.getValue()}</i>,
      },
      {
        accessorKey: "state_id",
        header: () => "Estado",
        cell: (info) => <i>{info.getValue()}</i>,
      },
      {
        accessorKey: "user_id",
        header: () => "Usuario",
        cell: (info) => <i>{info.getValue()}</i>,
      },
    ],
    []
  );

  const fetch_stores = async () => {
    try {
      const response = await axios_client(`/api/stores`, {
        method: "get",
        params: {
          search_query,
          page: pagination.pageIndex + 1,
          page_size: pagination.pageSize,
          sorting,
        },
        headers: {
          authorization: "Bearer ",
        },
      });

      setData(response.data.data);
      setPaginationLinks(response.data.meta.links);
      setTotalRecords(response.data.meta.total);
      console.log(response.data.links);
      console.log(response.data.data);
      console.log(response.data.meta);
    } catch (error) {
      toast.error(error.message, { autoClose: 4000 });
    }
  };

  useEffect(() => {
    fetch_stores();
  }, [search_query, pagination, sorting]);

  useEffect(() => {
    setPagination({ pageIndex: page_index, pageSize: page_size });
  }, [page_index, page_size]);

  useEffect(() => {
    setPageIndex(INIT_PAGE_INDEX);
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: total_records,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    sortDescFirst: false,
  });

  const handle_click_pagination_btn = (pagination_link) => {
    if (pagination_link.url) {
      const url = new URL(pagination_link.url);
      const page = parseInt(url.searchParams.get("page"));
      setPageIndex(page - 1);
    }
  };

  const handle_onchange_search_input = (e) => {
    console.log();
    setPageIndex(INIT_PAGE_INDEX);
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="font-semibold text-2xl text-slate-800">
          Listado de Tiendas
        </h3>
      </div>

      <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
        <div>
          <p>Search</p>
          <input
            type="text"
            onChange={handle_onchange_search_input}
            placeholder="search"
          />
        </div>

        <select
          name=""
          id=""
          onChange={(e) => {
            console.log(e.target.value);
            setPageSize(e.target.value);
          }}
        >
          {[1, 2, 3, 4, 5].map((element, i) => {
            return (
              <option key={i} value={element}>
                {element}
              </option>
            );
          })}
        </select>
        <table className="border-collapse border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {total_records > 0 && (
          <ul className="flex">
            {pagination_links.map((pagination_link, i) => {
              return (
                <li key={i} className="border-2">
                  <button
                    className="px-2"
                    onClick={() => handle_click_pagination_btn(pagination_link)}
                  >
                    {pagination_link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {total_records > 0 && (
          <p className="mt-2">
            Mostrando del{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            al{" "}
            {(table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize}{" "}
            de {table.getRowCount().toLocaleString()} entradas.
          </p>
        )}
      </div>
    </>
  );
}

export default StoreList;
