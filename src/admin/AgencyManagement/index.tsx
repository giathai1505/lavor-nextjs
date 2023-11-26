"use client";
import React, { HTMLProps, useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ConfirmDialog from "@/components/Common/Dialog";
import Link from "next/link";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import NoneFormSelectCustom from "@/components/Common/NoneFormSelectCustom";
import { BiRefresh } from "react-icons/bi";
import { Category, IAgencyTable, ICity, IRegion, Status } from "@/types";
import { deleteAPI } from "@/api/blog";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { convertToAgencyArray } from "@/utilities";
import AddAgencyDialog from "./Dialogs/AddAgencyDialog";
import { getAllAgencies } from "@/api/agencyAPI";
import AddCityDialog from "./Dialogs/AddCityDialog";

const statusOptions = [
  {
    key: Status.ACTIVE,
    value: "Hoạt động",
  },
  {
    key: Status.SUSPENDED,
    value: "Ngưng hoạt động",
  },
];

const categoryOptions = [
  {
    key: Category.ABOUT,
    value: "Về Lavor",
  },
  {
    key: Category.TIPS,
    value: "Kiến thức & Mẹo",
  },
  {
    key: Category.RECRUITMENT,
    value: "Tuyển dụng",
  },
];

interface IAgencyManagement {
  agencies: IRegion[];
}

interface IFilterBlog {
  search: string;
  category: Category | undefined;
  status: Status | undefined;
}

const initListCity = (regions: IRegion[]): ICity[] => {
  let cities: ICity[] = [];

  regions.forEach((item) => {
    cities = cities.concat(item.cities);
  });

  return cities;
};

const AgencyManagement: React.FC<IAgencyManagement> = ({ agencies }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState<IFilterBlog>({
    search: "",
    category: undefined,
    status: undefined,
  });
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);
  const [data, setData] = useState<IAgencyTable[]>(
    convertToAgencyArray(agencies)
  );
  const [listRegion, setListRegion] = useState<IRegion[]>(agencies);
  const [itemHovered, setItemHovered] = useState<string | undefined>(undefined);
  const [activeField, setActiveField] = useState<number | undefined>(undefined);
  const [showDialog, setShowDialog] = useState({
    agency: false,
    city: false,
  });
  const invokeGetAllAgency = async () => {
    // let url = "?page=1&limit=10";
    // if (globalFilter.search !== "") {
    //   url += "&search=" + globalFilter.search;
    // }
    // if (globalFilter.status !== undefined) {
    //   url += "&status=" + globalFilter.status;
    // }
    // if (globalFilter.category !== undefined) {
    //   url += "&category=" + globalFilter.category;
    // }
    getAllAgencies("")
      .then((result) => {
        const newData = convertToAgencyArray(result?.regions ?? []);

        setData(newData);
        setListRegion(result?.regions ?? ([] as IRegion[]));
      })
      .catch((error) => {
        setData([]);
      });
  };

  useEffect(() => {
    // invokeGetAllBlogs();
  }, [globalFilter.category, globalFilter.search, globalFilter.status]);

  useEffect(() => {
    setData(() => convertToAgencyArray(agencies));
  }, [agencies]);

  const columns = React.useMemo<ColumnDef<IAgencyTable>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorFn: (row) => row.agency_name,
        id: "agency_name",
        cell: ({ row }) => (
          <div>
            <span>{row.original.agency_name.toString()}</span>
            <div
              className={`admin-row-action-wrapper gap-2 ${
                itemHovered === row.id ? "show" : ""
              }`}
            >
              <Link
                className="admin-row-action edit"
                href={`/admin/blog-management/${row.original.agency_id.toString()}`}
                onClick={() => handleEdit(row.original.agency_id)}
              >
                Sửa
              </Link>
              |
              <button
                className="admin-row-action delete"
                onClick={() => {
                  setIsOpenDeleteConfirmDialog(true);
                  setActiveField(row.original.agency_id);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ),
        header: () => <span>Tên đại lý</span>,
      },
      {
        accessorFn: (row) => row.city_name,
        id: "city_name",
        cell: ({ row }) => (
          <div className="ellipsis-text-3-lines ">{row.original.city_name}</div>
        ),
        header: () => <span>Tên Tỉnh</span>,
      },
      {
        accessorFn: (row) => row.region_name,
        id: "blog_cover_image_url",
        cell: ({ row }) => <div>{row.original.region_name}</div>,
        header: () => <span>Miền</span>,
      },

      {
        accessorFn: (row) => row.agency_address,
        id: "agency_address",
        cell: ({ row }) => (
          <p className="time">{row.original.agency_address}</p>
        ),
        header: () => <span className="time">Địa chỉ</span>,
      },
    ],
    [itemHovered]
  );

  const getRowId = (row: any, relativeIndex: any, parent: any) => {
    return parent ? [parent.id, row.agency_id].join(".") : row.agency_id;
  };

  const table = useReactTable({
    data,
    getRowId,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const handleEdit = (id: number) => {
    redirect(`/admin/blog-management/${id.toString()}`);
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmDialog(false);

    if (typeof activeField === "number") {
      deleteAPI(activeField);
      setActiveField(undefined);
    }

    window.location.reload();
  };

  const handleFilterBlog = (name: string, item: any) => {
    // const newFilterObject = { ...globalFilter, [name]: item };
    // setGlobalFilter(newFilterObject);
  };

  const handleDeleteMultipleBlog = () => {
    // const blogIds = Object.keys(rowSelection).map((item) => Number(item));
    // deleteMultipleBlogs(blogIds);
    // invokeGetAllBlogs();
  };

  const closeAllDialog = () => {
    setShowDialog({
      agency: false,
      city: false,
    });
  };

  const handleAddAgencySuccess = () => {
    invokeGetAllAgency();
  };

  const handleAddCitySuccess = () => {
    invokeGetAllAgency();
  };
  return (
    <>
      <AddAgencyDialog
        open={showDialog.agency}
        onClose={closeAllDialog}
        cities={initListCity(listRegion)}
        onSuccess={handleAddAgencySuccess}
      />
      <AddCityDialog
        open={showDialog.city}
        onClose={closeAllDialog}
        agencies={agencies}
        onSuccess={handleAddCitySuccess}
      />
      <div className="admin-page-wrapper ">
        <ConfirmDialog
          onOk={handleDelete}
          title="Xóa bài viết"
          open={isOpenDeleteConfirmDialog}
          content="Bạn có chắc muốn xóa bài viết này không?"
          onClose={() => setIsOpenDeleteConfirmDialog(false)}
          type="delete"
        />
        <div className="p-2">
          <div className="flex items-center justify-between mb-10">
            <p className="admin-title">Danh sách đại lý</p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDialog({ agency: true, city: false })}
                className="add-new-button"
              >
                <AiOutlinePlus /> <span>Thêm mới đại lý</span>
              </button>
              <button
                onClick={() => setShowDialog({ agency: false, city: true })}
                className="add-new-button"
              >
                <AiOutlinePlus /> <span>Thêm tỉnh/thành phố</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <input
              value={globalFilter.search}
              onChange={(e) => handleFilterBlog("search", e.target.value)}
              className="p-2 font-lg shadow border border-block w-[500px] text-[13px]"
              placeholder="Tìm kiếm bài viết..."
            />
            <NoneFormSelectCustom
              options={statusOptions}
              onChange={(item) => handleFilterBlog("status", item.key)}
              className="admin"
              // value={globalFilter.status}
              placeholder="Lọc theo trạng thái"
            />
            <NoneFormSelectCustom
              options={categoryOptions}
              // value={globalFilter.category}
              onChange={(item) => handleFilterBlog("category", item.key)}
              className="admin"
              placeholder="Lọc theo danh mục"
            />
            <div>
              <div>
                <button
                  onClick={() => {
                    setGlobalFilter({
                      search: "",
                      status: undefined,
                      category: undefined,
                    });
                  }}
                  className="add-new-button"
                >
                  <BiRefresh /> <span>Load tất cả đại lý</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`selection-row ${
              Object.keys(rowSelection).length > 0 ? "show" : ""
            }`}
          >
            <div>
              <span className="text-[#646c9a] text-[13px]">
                Đã chọn: {Object.keys(rowSelection).length}
              </span>
            </div>

            <div
              className="button-delete-row-selection "
              onClick={handleDeleteMultipleBlog}
            >
              <BsTrash />
              <span>Xóa tất cả</span>
            </div>
          </div>

          <div className="h-2" />

          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="w-full">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={`${
                      Object.keys(rowSelection).includes(row.id)
                        ? "selected"
                        : ""
                    }`}
                    onMouseEnter={() => setItemHovered(row.id)}
                    onMouseLeave={() => setItemHovered(undefined)}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td className="p-1">
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                  />
                </td>
                <td colSpan={20}>
                  Page Rows ({table.getRowModel().rows.length})
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2 mt-5 justify-end">
            <button
              className={`pagination-arrow ${
                !table.getCanPreviousPage() ? "disabled" : ""
              }`}
              onClick={() => table.setPageIndex(0)}
            >
              <PiCaretDoubleLeftBold />
            </button>
            <button
              className={`pagination-arrow ${
                !table.getCanPreviousPage() ? "disabled" : ""
              }`}
              onClick={() => table.previousPage()}
            >
              <PiCaretLeftBold />
            </button>
            <button
              className={`pagination-arrow ${
                !table.getCanNextPage() ? "disabled" : ""
              }`}
              onClick={() => table.nextPage()}
            >
              <PiCaretRightBold />
            </button>
            <button
              className={`pagination-arrow ${
                !table.getCanNextPage() ? "disabled" : ""
              }`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <PiCaretDoubleRightBold />
            </button>
            <span className="flex items-center gap-1 text-[13px]">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1 text-[13px]">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-[20px]"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="pagination-select "
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <br />

          <br />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

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

export default AgencyManagement;
