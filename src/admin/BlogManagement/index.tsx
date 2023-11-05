"use client";
import React, { HTMLProps, useState } from "react";
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
import { Category, CategoryConvertText, IBlog, Status } from "@/types";
import { changeBlogStatus, deleteAPI, deleteMultipleBlogs } from "@/api/blog";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { renderCategory } from "@/pages/News/Newest";
import { tr } from "@faker-js/faker";
import moment from "moment";

const statusOptions = [
  {
    key: -1,
    value: "Tất cả",
  },
  {
    key: 0,
    value: "Hoạt động",
  },
  {
    key: 1,
    value: "Ngưng hoạt động",
  },
];

const categoryOptions = [
  {
    key: -1,
    value: "Tất cả",
  },
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

interface IBlogManagement {
  blogs: IBlog[];
  loading: boolean;
}

const BlogManagement: React.FC<IBlogManagement> = ({ blogs, loading }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [data, setData] = useState(blogs);
  const [itemHovered, setItemHovered] = useState<string | undefined>(undefined);
  const [activeField, setActiveField] = useState<number | undefined>(undefined);
  const [activeChangeStatus, setActiveChangeStatus] = useState<{
    id: number | undefined;
    status: Status | undefined;
  }>({ id: undefined, status: undefined });

  const renderStatus = (status: Status) => {
    return (
      <div
        className={`blog-status ${status === Status.ACTIVE ? "active" : ""}`}
      >
        {status === Status.ACTIVE ? "Hoạt động" : "Ngưng hoạt động"}
      </div>
    );
  };

  const columns = React.useMemo<ColumnDef<IBlog>[]>(
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
              <Link
                className="admin-row-action edit"
                href={`/admin/dashboard/blog-management/${row.original.blog_id.toString()}`}
                onClick={() => handleEdit(row.original.blog_id)}
              >
                Sửa
              </Link>
              |
              <button
                className="admin-row-action delete"
                onClick={() => {
                  setIsOpenDeleteConfirmDialog(true);
                  setActiveField(row.original.blog_id);
                }}
              >
                Xóa
              </button>
              |
              <button
                className="admin-row-action active"
                onClick={() => {
                  setShowInfoDialog(true);
                  setActiveChangeStatus({
                    id: row.original.blog_id,
                    status: row.original.blog_status,
                  });
                }}
              >
                {row.original.blog_status === Status.SUSPENDED ||
                row.original.blog_status === Status.DELETED ? (
                  <span> Hoạt động</span>
                ) : (
                  <span className="stop-active  whitespace-nowrap">
                    Ngưng hoạt động
                  </span>
                )}
              </button>
            </div>
          </div>
        ),
        header: () => <span>Tiêu đề</span>,
      },
      {
        accessorFn: (row) => row.blog_description,
        id: "blog_description",
        cell: ({ row }) => (
          <div className="ellipsis-text-3-lines ">
            {row.original.blog_description}
          </div>
        ),
        header: () => <span>Mô tả</span>,
      },
      {
        accessorFn: (row) => row.blog_image_url,
        id: "blog_cover_image_url",
        cell: ({ row }) => (
          <div>
            <img
              src={row.original.blog_image_url}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        ),
        header: () => <span>Ảnh</span>,
      },

      {
        accessorFn: (row) => row.blog_upload_date,
        id: "blog_upload_date",
        cell: ({ row }) => (
          <p className="time">
            {moment(row.original.blog_upload_date).fromNow()}
          </p>
        ),
        header: () => <span className="time">Ngày đăng</span>,
      },
      {
        accessorFn: (row) => row.blog_category,
        id: "category",
        cell: ({ row }) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {renderCategory(row.original.blog_category)}
          </div>
        ),
        header: () => <span>Danh mục</span>,
      },

      {
        accessorFn: (row) => row.blog_status,
        id: "status",
        cell: ({ row }) => renderStatus(row.original.blog_status),
        header: () => <span>Trạng thái</span>,
      },
    ],
    [itemHovered]
  );

  const getRowId = (row: any, relativeIndex: any, parent: any) => {
    return parent ? [parent.id, row.blog_id].join(".") : row.blog_id;
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
    redirect(`/admin/dashboard/blog-management/${id.toString()}`);
  };

  const handleDelete = () => {
    setIsOpenDeleteConfirmDialog(false);

    if (typeof activeField === "number") {
      deleteAPI(activeField);
      setActiveField(undefined);
    }

    window.location.reload();
  };

  const handleChangeStatus = () => {
    setShowInfoDialog(false);
    if (
      typeof activeChangeStatus.id === "number" &&
      activeChangeStatus.status !== undefined
    ) {
      const targetStatus =
        activeChangeStatus.status === Status.ACTIVE
          ? Status.SUSPENDED
          : Status.ACTIVE;
      changeBlogStatus(activeChangeStatus.id, targetStatus);
      setActiveChangeStatus({ id: undefined, status: undefined });
      window.location.reload();
    }
  };

  const handleFilterBlog = (name: string, item: any) => {
    console.log(item);
  };

  const handleDeleteMultipleBlog = () => {
    const blogIds = Object.keys(rowSelection).map((item) => Number(item));
    deleteMultipleBlogs(blogIds);
    window.location.reload();
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
            className="admin"
            placeholder="Lọc theo trạng thái"
          />
          <NoneFormSelectCustom
            options={categoryOptions}
            onChange={(item) => handleFilterBlog("category", item)}
            className="admin"
            placeholder="Lọc theo danh mục"
          />
          <div>
            <div>
              <button
                className="border rounded p-2 text-[22px]"
                onClick={() => {}}
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
      <ToastContainer />
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
