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

import TableFilter from "../../../components/TableFilter";
import StateFilter from "../../../components/StateFilter";
import TableSearch from "../../../components/TableSearch";
import PageSize from "../../../components/PageSize";
import ExportTableDataButton from "../../../components/ExportTableDataButton";
import AddSellerButton from "./AddStoreButton";
import AddStoreModal from "./AddStoreModal";
import Table from "../../../components/Table";
import TablePagination from "../../../components/TablePagination";
import TotalRecordsLabel from "../../../components/TotalRecordsLabel";
import EditStoreButton from "./EditStoreButton";
import { AnimatePresence } from "framer-motion";
import EditStoreModal from "./EditStoreModal";
import DeleteStoreButton from "./DeleteStoreButton";

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
const PAGE_SIZES = [1, 2, 3, 10, 25, 50, 100];
const FILTER_STATE = 1;

function StoreList() {
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
  const [page_size, setPageSize] = useState(PAGE_SIZES[2]);
  const [pagination, setPagination] = useState({
    pageIndex: page_index, //initial page index
    pageSize: page_size, //default page size
  });

  const [pagination_links, setPaginationLinks] = useState([]);
  const [total_records, setTotalRecords] = useState(0);
  const [rowSelection, setRowSelection] = useState({ 6: true });

  const [data, setData] = useState([]);

  const [is_add_store_modal_open, setIsAddStoreModalOpen] = useState(false);
  const [is_edit_store_modal_open, setIsEditStoreModalOpen] = useState(false);
  const [edit_store, setEditStore] = useState();

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
      },
      {
        accessorKey: "users_first_name",
        header: () => "Vendedor",
        cell: ({ row }) => {
          return (
            row.original.users_first_name +
            " " +
            (row.original.users_last_name ?? "")
          );
        },
      },
      {
        accessorKey: "created_at",
        header: () => "Creado",
        cell: (info) => moment(info.getValue()).format("DD [de] MMM, YYYY"),
      },
      {
        accessorKey: "states_name",
        header: () => "Estado",
        cell: ({ row }) => {
          let value = undefined;

          switch (row.original.state_id) {
            case 1:
              value = (
                <span className="bg-green-100 px-2 py-1 rounded text-green-600 text-xs capitalize">
                  {row.original.states_name}
                </span>
              );
              break;
            case 3:
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
                        to={"#"}
                        className={` p-2 hover:bg-slate-100 flex items-center gap-x-1`}
                      >
                        <EyeIcon className="w-4" />
                        Ver
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      {({ close }) => (
                        <span onClick={close}>
                          <EditStoreButton
                            record={row.original}
                            setEditStore={setEditStore}
                            is_edit_store_modal_open={is_edit_store_modal_open}
                            setIsEditStoreModalOpen={setIsEditStoreModalOpen}
                          />
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ close }) => (
                        <span onClick={close}>
                          <DeleteStoreButton
                            record={row.original}
                            setDataChanged={setDataChanged}
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

  const fetch_stores = async () => {
    try {
      const response = await axios_client(`/api/stores`, {
        method: "get",
        params: {
          filtering,
          search_query,
          sorting,
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

  useEffect(() => {
    if (data_changed) {
      fetch_stores();
      setDataChanged(false);
    }
  }, [data_changed]);

  return (
    <>
      <div>
        <h3 className="font-semibold text-2xl text-slate-800">
          Listado de Tiendas
        </h3>
      </div>

      <TableFilter>
        <StateFilter
          filter_column={"stores.state_id"}
          selectable_record_ids={[1, 2, 3]}
          filtering={filtering}
          setFiltering={setFiltering}
        />
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

            <AddSellerButton setIsAddStoreModalOpen={setIsAddStoreModalOpen} />
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

      <AnimatePresence>
        {is_add_store_modal_open == true && (
          <AddStoreModal
            setDataChanged={setDataChanged}
            is_modal_open={is_add_store_modal_open}
            setIsModalOpen={setIsAddStoreModalOpen}
          />
        )}

        {is_edit_store_modal_open == true && (
          <EditStoreModal
            record={edit_store}
            setDataChanged={setDataChanged}
            is_modal_open={is_edit_store_modal_open}
            setIsModalOpen={setIsEditStoreModalOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default StoreList;
