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
import currency from "currency.js";
import { format_react_table_sorting } from "../../../utils/dashboard/Utils";

import TableFilter from "../../../components/TableFilter";
import StateFilter from "../../../components/StateFilter";
import TableSearch from "../../../components/TableSearch";
import PageSize from "../../../components/PageSize";
import ExportTableDataButton from "../../../components/ExportTableDataButton";
import Table from "../../../components/Table";
import TablePagination from "../../../components/TablePagination";
import TotalRecordsLabel from "../../../components/TotalRecordsLabel";
import DeleteRecordButton from "../../../components/DeleteRecordButton";
import useManagement from "../../../hooks/useManagement";
import { UserIcon } from "@heroicons/react/24/solid";

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

const CustomerOrderList = ({ customer }) => {
  const { token, store } = useManagement();

  const [data_changed, setDataChanged] = useState(false);
  const [filtering, setFiltering] = useState([
    {
      column: "users.id",
      values: [customer.id],
    },
  ]);
  const [search_query, setSearchQuery] = useState();
  const [sorting, setSorting] = useState([
    {
      id: "orders.created_at",
      desc: true,
    },
  ]);
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
        header: () => "Id",
        cell: (info) => (
          <span className="font-semibold text-indigo-400">
            #{info.getValue().toString().padStart(4, "0")}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: () => "Fecha",
        cell: (info) => moment(info.getValue()).format("DD [de] MMM, YYYY"),
      },
      {
        id: "time",
        accessorKey: "created_at",
        header: () => "Hora",
        cell: (info) => moment(info.getValue()).format("HH:mm"),
        enableSorting: false,
      },
      {
        accessorKey: "paid",
        header: () => "Pago",
        cell: (info) => {
          switch (info.getValue()) {
            case 1:
              return (
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 rounded-full w-2 h-2"></span>
                  <span className="font-semibold text-green-400">Pagado</span>
                </div>
              );
              break;

            default:
              return (
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 rounded-full w-2 h-2"></span>
                  <span className="font-semibold text-red-400">Fallido</span>
                </div>
              );
              break;
          }
        },
      },
      {
        accessorKey: "total_price",
        header: () => "Cantidad",
        cell: (info) => {
          return currency(info.getValue(), {
            symbol: "S/ ",
          }).format();
        },
      },
      {
        accessorKey: "states_name",
        header: () => "Estado",
        cell: ({ row }) => {
          let value = undefined;

          switch (row.original.state_id) {
            case 11:
              value = (
                <span className="bg-purple-100 px-2 py-1 rounded text-purple-600 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 12:
              value = (
                <span className="bg-yellow-100 px-2 py-1 rounded text-xs text-yellow-600 capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 13:
              value = (
                <span className="bg-green-100 px-2 py-1 rounded text-green-600 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 14:
              value = (
                <span className="bg-sky-100 px-2 py-1 rounded text-sky-500 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 15:
            case 16:
              value = (
                <span className="bg-green-100 px-2 py-1 rounded text-green-500 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 5:
            case 17:
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
        header: "Acción",
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
                        to={`/vendedor/ordenes/${row.original.id}`}
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                      >
                        <EyeIcon className="w-4" />
                        Ver
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      {({ close }) => (
                        <span onClick={close}>
                          <DeleteRecordButton
                            record={row.original}
                            setDataChanged={setDataChanged}
                            fn_delete_record={delete_order}
                          />
                        </span>
                      )}
                    </Menu.Item>
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

  const fetch_customer_orders = async (store_id) => {
    try {
      const response = await axios_client(`/api/stores/${store_id}/orders`, {
        method: "get",
        params: {
          filtering,
          search_query,
          sorting: format_react_table_sorting(sorting),
          page: pagination.pageIndex + 1,
          page_size: pagination.pageSize,
        },
        headers: {
          authorization: `Bearer ${token}`,
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
    fetch_customer_orders(store.id);
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
      fetch_customer_orders(store.id);
      setDataChanged(false);
    }
  }, [data_changed]);

  const delete_order = async (record) => {
    const response = await axios_client(
      `/api/stores/${store.id}/orders/${record.id}`,
      {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  };

  return (
    <>
      <div className="dark:border-slate-700 bg-white dark:bg-slate-800">
        <h5 className="font-semibold text-base">Filtro</h5>
        <ul className="flex md:flex-row flex-col gap-4">
          {" "}
          <li className="w-full">
            <StateFilter
              filter_column={"orders.state_id"}
              selectable_record_ids={[11, 12, 13, 14, 15, 16, 17, 3]}
              filtering={filtering}
              setFiltering={setFiltering}
            />
          </li>
        </ul>
      </div>

      <div className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-4">
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
};

export default CustomerOrderList;
