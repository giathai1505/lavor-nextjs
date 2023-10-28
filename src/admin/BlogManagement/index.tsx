"use client";
import React, { HTMLProps, useState } from "react";
import { makeData, Person } from "./makeData";
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

const statusOptions = [
  {
    key: 0,
    value: "Trạng thái",
  },
  {
    key: 1,
    value: "Hoạt động",
  },
  {
    key: 2,
    value: "Ngưng hoạt động",
  },
];

const categoryOptions = [
  {
    key: 0,
    value: "Danh mục bài viết",
  },
  {
    key: 1,
    value: "Về Lavor",
  },
  {
    key: 2,
    value: "Kiến thức & Mẹo",
  },
  {
    key: 3,
    value: "Tuyển dụng",
  },
];

const BlogManagement = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [itemHovered, setItemHovered] = useState<string | undefined>(undefined);

  const renderStatus = (status: number) => {
    return (
      <div className={`blog-status ${status === 1 ? "active" : ""}`}>
        {status === 1 ? "Hoạt động" : "Ngưng hoạt động"}
      </div>
    );
  };

  const columns = React.useMemo<ColumnDef<Person>[]>(
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
        accessorFn: (row) => row.blog_title,
        id: "blog_title",
        cell: ({ row }) => (
          <div>
            <span>{row.original.blog_title.toString()}</span>
            <div
              className={`admin-row-action-wrapper gap-2 ${
                itemHovered === row.id ? "show" : ""
              }`}
            >
              <button className="admin-row-action edit">Sửa</button> |
              <button
                className="admin-row-action delete"
                onClick={() => setIsOpenDeleteConfirmDialog(true)}
              >
                Xóa
              </button>{" "}
              |
              <button
                className="admin-row-action active"
                onClick={() => setShowInfoDialog(true)}
              >
                {row.original.status === 0 ? (
                  <span> Hoạt động</span>
                ) : (
                  <span className="stop-active"> Ngưng hoạt động</span>
                )}
              </button>
            </div>
          </div>
        ),
        header: () => <span>Tiêu đề bài viết</span>,
      },
      {
        accessorFn: (row) => row.blog_description,
        id: "blog_description",
        cell: (info) => info.getValue(),
        header: () => <span>Mô tả bài viết</span>,
      },
      {
        accessorFn: (row) => row.blog_cover_image_url,
        id: "blog_cover_image_url",
        cell: (info) => info.getValue(),
        header: () => <span>Ảnh bài viết</span>,
      },
      {
        accessorFn: (row) => row.category,
        id: "category",
        cell: (info) => info.getValue(),
        header: () => <span>Danh mục</span>,
      },

      {
        accessorFn: (row) => row.blog_content,
        id: "blog_content",
        cell: (info) => info.getValue(),
        header: () => <span>Nội dung bài viết</span>,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        cell: ({ row }) => renderStatus(row.original.status),
        header: () => <span>Trạng thái</span>,
      },
    ],
    [itemHovered]
  );

  const [data, setData] = useState(() => makeData(100));
  const refreshData = () => setData(() => makeData(100));

  const table = useReactTable({
    data,
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

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmDialog(false);
  };

  const handleChangeStatus = () => {
    setShowInfoDialog(false);
  };

  const handleAddNew = () => {};

  const handleFilterBlog = (name: string, item: any) => {
    console.log(item);
  };

  return (
    <div className="admin-page-wrapper ">
      <ConfirmDialog
        onOk={handleChangeStatus}
        title="Đổi trạng thái của bài viết"
        open={showInfoDialog}
        content="Bạn có chắc muốn đổi trạng thái của bài viết này không?"
        onClose={() => setShowInfoDialog(false)}
        type="information"
      />

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
          <p className="admin-title">Danh sách bài viết</p>
          <Link
            href="/admin/dashboard/blog-management/add"
            className="add-new-button"
          >
            <AiOutlinePlus /> <span>Thêm mới</span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => handleFilterBlog("search", e.target.value)}
            className="p-2 font-lg shadow border border-block w-[500px] text-[13px]"
            placeholder="Tìm kiếm bài viết..."
          />
          <NoneFormSelectCustom
            options={statusOptions}
            onChange={(item) => handleFilterBlog("status", item)}
          />
          <NoneFormSelectCustom
            options={categoryOptions}
            onChange={(item) => handleFilterBlog("category", item)}
          />
          <div>
            <div>
              <button
                className="border rounded p-2 text-[22px]"
                onClick={() => refreshData()}
              >
                <BiRefresh />
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
          <select name="" id="" className="selection-row-selection ">
            <option value="">Hoạt động</option>
            <option value="">Ngừng hoạt động</option>
          </select>
          <div className="button-delete-row-selection ">
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
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`${
                    Object.keys(rowSelection).includes(row.id) ? "selected" : ""
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
    </div>
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

export default BlogManagement;
