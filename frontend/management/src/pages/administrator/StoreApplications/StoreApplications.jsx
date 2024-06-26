import React, { useState, useRef, useMemo, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/es";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import axios_client from "../../../helpers/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { format_react_table_sorting } from "../../../utils/dashboard/Utils";

import TableFilter from "../../../components/TableFilter";
import StateFilter from "../../../components/StateFilter";
import TableSearch from "../../../components/TableSearch";
import PageSize from "../../../components/PageSize";
import ExportTableDataButton from "../../../components/ExportTableDataButton";
import Table from "../../../components/Table";
import TablePagination from "../../../components/TablePagination";
import TotalRecordsLabel from "../../../components/TotalRecordsLabel";
import AcceptStoreApplicationButton from "./AcceptStoreApplicationButton";
import RejectStoreApplicationButton from "./RejectStoreApplicationButton";
import { UserIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

moment.locale("es");

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

const INIT_PAGE_INDEX = 0;
const PAGE_SIZES = [5, 10, 25, 50, 100];
const FILTER_STATE = 4;

function StoreApplications() {
  const { t } = useTranslation();
  const [data_changed, setDataChanged] = useState(false);
  const [filtering, setFiltering] = useState([
    {
      column: "stores.state_id",
      values: [FILTER_STATE],
    },
  ]);
  const [search_query, setSearchQuery] = useState();
  const [sorting, setSorting] = useState([]);
  const [page_index, setPageIndex] = useState(INIT_PAGE_INDEX);
  const [page_size, setPageSize] = useState(PAGE_SIZES[0]);
  const [pagination, setPagination] = useState({
    pageIndex: page_index, //initial page index
    pageSize: page_size, //default page size
  });

  const [pagination_links, setPaginationLinks] = useState([]);
  const [total_records, setTotalRecords] = useState(0);
  const [rowSelection, setRowSelection] = useState({});

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
        header: () => t("table.headers.id"),
        cell: (info) => (
          <span className="font-semibold text-indigo-400">
            #{info.getValue().toString().padStart(4, "0")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: () => t("table.headers.name"),
        cell: (info) => <span className="text-black">{info.getValue()}</span>,
      },
      {
        accessorKey: "ruc",
        header: () => t("table.headers.ruc"),
        cell: (info) => info.getValue(),
        enableSorting: false,
      },
      {
        accessorKey: "business_name",
        header: () => t("table.headers.business_name"),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "users_first_name",
        header: () => t("table.headers.seller"),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-slate-300 rounded-full w-6 h-6">
                <UserIcon className="w-4 text-white" />
              </div>
              <div>
                <span className="block capitalize">
                  {row.original.users_first_name +
                    " " +
                    row.original.users_last_name}
                </span>
                {(() => {
                  console.log(row.original);
                  switch (row.original.role_user_state_id) {
                    case 1:
                      return (
                        <span className="bg-green-100 px-1 py-0.5 rounded text-green-500 text-xs capitalize">
                          {row.original.role_user_state_name}
                        </span>
                      );

                    case 3:
                      return (
                        <span className="bg-red-100 px-1 py-0.5 rounded text-red-500 text-xs capitalize">
                          {row.original.role_user_state_name}
                        </span>
                      );

                    case 4:
                      return (
                        <span className="bg-orange-100 px-1 py-0.5 rounded text-orange-500 text-xs capitalize">
                          {row.original.states_name}
                        </span>
                      );
                    case 5:
                      return (
                        <span className="bg-red-100 px-1 py-0.5 rounded text-red-500 text-xs capitalize">
                          {row.original.states_name}
                        </span>
                      );
                    default:
                      return (
                        <span className="bg-slate-200 px-1 py-0.5 rounded text-xs capitalize">
                          {row.original.role_user_state_name}
                        </span>
                      );
                  }
                })()}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: () => t("table.headers.requested"),
        cell: (info) => moment(info.getValue()).format("DD [de] MMM, YYYY"),
      },
      {
        accessorKey: "states_name",
        header: () => t("table.headers.state"),
        cell: ({ row }) => {
          let value = undefined;

          switch (row.original.state_id) {
            case 1:
              value = (
                <span className="bg-green-100 px-2 py-1 rounded text-green-500 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 4:
              value = (
                <span className="bg-orange-100 px-2 py-1 rounded text-orange-500 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 5:
              value = (
                <span className="bg-red-100 px-2 py-1 rounded text-red-500 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            default:
              value = (
                <span className="bg-slate-200 px-2 py-1 rounded text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
          }

          return value;
        },
      },
      {
        id: "action",
        header: () => t("table.headers.action"),
        cell: ({ row }) => (
          <Menu as="div" className="inline-block relative">
            {({ open }) => (
              <>
                <Menu.Button
                  as="button"
                  className={` p-1.5 hover:bg-gray-600 transition-all ease-in-out duration-300 hover:text-white rounded-md ui-open:bg-red-300 ${
                    open ? "bg-gray-600 text-white" : "bg-slate-200"
                  } `}
                >
                  <EllipsisHorizontalIcon className="w-4" />
                </Menu.Button>
                {open && (
                  <Menu.Items
                    static
                    as="div"
                    className="right-0 z-10 absolute flex flex-col bg-white shadow border rounded-md w-36 text-xs"
                  >
                    <Menu.Item>
                      <Link
                        to={"#"}
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                      >
                        <EyeIcon className="w-4" />
                        {t("general.buttons.view")}
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      {({ close }) => (
                        <span onClick={close}>
                          <AcceptStoreApplicationButton
                            store={row.original}
                            setDataChanged={setDataChanged}
                          />
                        </span>
                      )}
                    </Menu.Item>

                    {row.original.state_id != 5 && (
                      <Menu.Item>
                        {({ close }) => (
                          <span onClick={close}>
                            <RejectStoreApplicationButton
                              store={row.original}
                              setDataChanged={setDataChanged}
                            />
                          </span>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                )}
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
          filtering,
          search_query,
          sorting: format_react_table_sorting(sorting),
          page: pagination.pageIndex + 1,
          page_size: pagination.pageSize,
        },
        headers: {
          authorization: "Bearer ",
        },
      });

      setData(response.data.data);
      setPaginationLinks(response.data.meta.links);
      setTotalRecords(response.data.meta.total);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? error.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    fetch_stores();
  }, [search_query, pagination, sorting, filtering]);

  const skip_first_time_page_effect = useRef(true);
  useEffect(() => {
    if (skip_first_time_page_effect.current) {
      skip_first_time_page_effect.current = false;
      return;
    }

    setPagination({ pageIndex: page_index, pageSize: page_size });
  }, [page_index, page_size]);

  useEffect(() => {
    setPageIndex(INIT_PAGE_INDEX);
  }, [sorting, filtering]);

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

  useEffect(() => {
    if (data_changed) {
      fetch_stores();
      setDataChanged(false);
    }
  }, [data_changed]);

  return (
    <>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800 dark:text-slate-300">
          {t("store_applications.title")}
        </h3>
      </div>

      <TableFilter>
        <li className="w-full">
          <StateFilter
            filter_column={"stores.state_id"}
            selectable_record_ids={[4, 5]}
            filtering={filtering}
            setFiltering={setFiltering}
          />
        </li>
      </TableFilter>

      <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-5 border rounded-sm">
        <div className="flex flex-wrap justify-between items-center gap-y-3">
          {/* search */}
          <TableSearch
            setPageIndex={setPageIndex}
            setSearchQuery={setSearchQuery}
            INIT_PAGE_INDEX={INIT_PAGE_INDEX}
          />

          {/* general table options */}
          <div className="flex flex-wrap items-center gap-3">
            <PageSize
              setPageIndex={setPageIndex}
              setPageSize={setPageSize}
              INIT_PAGE_INDEX={INIT_PAGE_INDEX}
              PAGE_SIZES={PAGE_SIZES}
              page_size={page_size}
            />

            <ExportTableDataButton />
          </div>
        </div>

        <div className="relative mt-4">
          <Table table={table} />
        </div>

        <div className="flex justify-between items-start mt-4 text-sm">
          {total_records > 0 && <TotalRecordsLabel table={table} />}
          {total_records > 0 && (
            <TablePagination
              pagination_links={pagination_links}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default StoreApplications;
