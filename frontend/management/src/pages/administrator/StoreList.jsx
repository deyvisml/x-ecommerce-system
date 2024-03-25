import React, { useState, useMemo, useEffect, Fragment } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import axios_client from "../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

const INIT_PAGE_INDEX = 0;
const PAGE_SIZES = [1, 2, 3, 10, 25, 50, 100];

/* this  code is not very clear, but was extract from the official documentation */
function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

function StoreList() {
  const [search_query, setSearchQuery] = useState();
  const [page_index, setPageIndex] = useState(INIT_PAGE_INDEX);
  const [page_size, setPageSize] = useState(PAGE_SIZES[2]);
  const [pagination, setPagination] = useState({
    pageIndex: page_index, //initial page index
    pageSize: page_size, //default page size
  });
  const [sorting, setSorting] = useState([]);
  const [pagination_links, setPaginationLinks] = useState([]);
  const [total_records, setTotalRecords] = useState(0);
  const [rowSelection, setRowSelection] = useState({ 6: true });

  const [data, setData] = useState([]);

  // useMemo is optional, only use to save the data when it's rendering many times, a direct way is to use the array instead
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            className="focus:ring-0 rounded text-indigo-500"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            className="focus:ring-0 rounded text-indigo-500"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorKey: "id",
        header: () => "Id",
        cell: (info) => (
          <span className="font-semibold text-indigo-400">
            #{info.getValue().toString().padStart(4, "0")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: () => "Nombre",
        cell: (info) => <span className="text-black">{info.getValue()}</span>,
      },
      {
        accessorKey: "ruc",
        header: () => "RUC",
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "business_name",
        header: () => "Razón social",
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "user_id",
        header: () => "Representante",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "created_at",
        header: () => "Creado",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "state_id",
        header: () => "Estado",
        cell: (info) => info.getValue(),
      },
      {
        header: "Acción",
        cell: (
          <Menu as="div" className="inline-block relative">
            {({ open }) => (
              <>
                <Menu.Button
                  as="button"
                  className={`bg-slate-200 p-1.5 hover:bg-gray-600 transition-all ease-in-out duration-300 hover:text-white rounded-md ui-open:bg-red-300 ${
                    open ? "bg-gray-600 text-white" : ""
                  } `}
                >
                  <EllipsisHorizontalIcon className="w-4" />
                </Menu.Button>
                <Menu.Items
                  as="div"
                  className="right-0 z-10 absolute flex flex-col bg-white shadow border rounded-md w-36 text-xs"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                        href="/account-settings"
                      >
                        <EyeIcon className="w-4" />
                        Ver
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                        href="/account-settings"
                      >
                        <PencilSquareIcon className="w-4" />
                        Editar
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                        href="/account-settings"
                      >
                        <TrashIcon className="w-4" />
                        Borrar
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </>
            )}
          </Menu>
        ),
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
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    sortDescFirst: false,
    getRowId: (row) => row.id,
    enableRowSelection: true,
  });

  const handle_onchange_page_size = (e) => {
    setPageIndex(INIT_PAGE_INDEX);
    setPageSize(e.target.value);
  };

  const handle_click_pagination_btn = (pagination_link) => {
    if (pagination_link.url) {
      const url = new URL(pagination_link.url);
      const page = parseInt(url.searchParams.get("page"));
      setPageIndex(page - 1);
    }
  };

  const handle_onchange_search_input = (e) => {
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
        <div className="flex flex-wrap justify-between items-center gap-y-3">
          {/* search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              onChange={handle_onchange_search_input}
              placeholder="Buscar..."
              className="border-slate-300 bg-slate-100 py-2 border rounded-md w-full outline-none ps-8 focus:ring-transparent"
            />
            <MagnifyingGlassIcon
              className="top-1/2 left-2 absolute w-5 text-slate-400 transform -translate-y-1/2"
              strokeWidth={3}
            />
          </div>

          {/* general table options */}
          <ul className="flex flex-wrap items-center gap-3">
            <li>
              <select
                onChange={handle_onchange_page_size}
                name=""
                id=""
                className="border-slate-300 border rounded-md focus:ring-transparent"
                value={page_size}
              >
                {PAGE_SIZES.map((element, i) => {
                  return (
                    <option key={i} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <button className="bg-indigo-100 hover:bg-indigo-500 text-indigo-500 hover:text-white btn">
                <ArrowDownTrayIcon className="w-5" strokeWidth={2} /> Exportar
              </button>
            </li>
            <li>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white btn">
                Añadir tienda
              </button>
            </li>
          </ul>
        </div>

        <div className="relative mt-4">
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
                        header.column.getCanSort()
                          ? "cursor-pointer"
                          : "cursor-auto"
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
                            asc: (
                              <ChevronUpIcon className="w-3" strokeWidth={2} />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="w-3"
                                strokeWidth={2}
                              />
                            ),
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-start mt-4 text-sm">
          {total_records > 0 && (
            <p className="text-xs">
              Mostrando del{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              al{" "}
              {(table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize}{" "}
              de <strong>{table.getRowCount().toLocaleString()}</strong>{" "}
              entradas.
            </p>
          )}
          {total_records > 0 && (
            <ul className="flex gap-x-1">
              {pagination_links.map((pagination_link, i) => {
                return (
                  <li key={i} className="">
                    <button
                      className={`rounded w-8 h-8 block   ${
                        !pagination_link.url
                          ? "text-slate-400 cursor-auto hover:bg-slate-100"
                          : ""
                      } ${
                        pagination_link.active
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-100 hover:bg-indigo-100"
                      }`}
                      onClick={() =>
                        handle_click_pagination_btn(pagination_link)
                      }
                    >
                      {pagination_link.label == "&laquo; Previous" ? (
                        <ChevronLeftIcon
                          className="m-auto w-4"
                          strokeWidth={2}
                        />
                      ) : pagination_link.label == "Next &raquo;" ? (
                        <ChevronRightIcon
                          className="m-auto w-4"
                          strokeWidth={2}
                        />
                      ) : (
                        pagination_link.label
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/*
          <div>
          <label>Row Selection State:</label>
          <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
        </div> */}
      </div>
    </>
  );
}

export default StoreList;
