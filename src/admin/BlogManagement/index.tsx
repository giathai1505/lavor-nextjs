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
import { Category, IBlog, Status } from "@/types/type";
import {
  changeBlogStatus,
  changeMultipleBlogStatus,
  deleteAPI,
  deleteMultipleBlogs,
  getAllBlogs,
} from "@/api/blogAPI";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

import moment from "moment";
import { renderCategory } from "@/pages/News";

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

const statusAPIOoptions = [
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

interface IBlogManagement {
  blogs: IBlog[];
}

interface IFilterBlog {
  search: string;
  category: Category | undefined;
  status: Status | undefined;
}

const renderStatus = (status: Status) => {
  return (
    <div className={`blog-status ${status === Status.ACTIVE ? "active" : ""}`}>
      {status === Status.ACTIVE ? "Hoạt động" : "Ngưng hoạt động"}
    </div>
  );
};

const BlogManagement: React.FC<IBlogManagement> = ({ blogs }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState<IFilterBlog>({
    search: "",
    category: undefined,
    status: undefined,
  });
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

  const invokeGetAllBlogs = async () => {
    let url = "?page=1&limit=10";
    if (globalFilter.search !== "") {
      url += "&search=" + globalFilter.search;
    }
    if (globalFilter.status !== undefined) {
      url += "&status=" + globalFilter.status;
    }
    if (globalFilter.category !== undefined) {
      url += "&category=" + globalFilter.category;
    }

    getAllBlogs(url)
      .then((result) => {
        setData(result.blogs);
      })
      .catch((error) => {
        setData([]);
      });
  };

  useEffect(() => {
    invokeGetAllBlogs();
  }, [globalFilter.category, globalFilter.search, globalFilter.status]);

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
                href={`/admin/blog-management/${row.original.blog_id.toString()}`}
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
          <div className="w-20 h-20">
            <img
              src={"http://" + row.original.blog_image_url}
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
    const newFilterObject = { ...globalFilter, [name]: item };
    setGlobalFilter(newFilterObject);
  };

  const handleDeleteMultipleBlog = () => {
    const blogIds = Object.keys(rowSelection).map((item) => Number(item));
    deleteMultipleBlogs(blogIds);
    invokeGetAllBlogs();
  };

  const handleChangeMultipleStatus = (status: any) => {
    const blogIds = Object.keys(rowSelection).map((item) => Number(item));
    changeMultipleBlogStatus(blogIds, status.key);
    invokeGetAllBlogs();
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
          <Link href="/admin/blog-management/add" className="add-new-button">
            <AiOutlinePlus /> <span>Thêm mới</span>
          </Link>
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
                <BiRefresh /> <span>Load tất cả bài viết</span>
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
          <NoneFormSelectCustom
            options={statusAPIOoptions}
            onChange={(item) => handleChangeMultipleStatus(item)}
            className="admin purple-version"
            placeholder="Thay đổi trạng thái"
          />
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
