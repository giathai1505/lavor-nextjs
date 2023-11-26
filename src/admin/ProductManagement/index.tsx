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
import { Category, IProduct, ProductTypeToText, Status } from "@/types";
import { changeBlogStatus } from "@/api/blog";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import {
  deleteMultipleProducts,
  deleteProduct,
  getAllProducts,
} from "@/api/product";
import { formatCurrencyWithDots } from "@/utilities";

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

interface IProductManagement {
  products: IProduct[];
  loading: boolean;
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

const ProductManagement: React.FC<IProductManagement> = ({
  products,
  loading,
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState<IFilterBlog>({
    search: "",
    category: undefined,
    status: undefined,
  });
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [data, setData] = useState(products);
  const [itemHovered, setItemHovered] = useState<string | undefined>(undefined);
  const [activeField, setActiveField] = useState<number | undefined>(undefined);
  const [activeChangeStatus, setActiveChangeStatus] = useState<{
    id: number | undefined;
    status: Status | undefined;
  }>({ id: undefined, status: undefined });

  const invokeGetAllProducts = async () => {
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

    getAllProducts("")
      .then((result) => {
        setData(result.products);
      })
      .catch((error) => {
        setData([]);
      });
  };

  useEffect(() => {
    invokeGetAllProducts();
  }, [globalFilter.category, globalFilter.search, globalFilter.status]);

  const columns = React.useMemo<ColumnDef<IProduct>[]>(
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
        accessorFn: (row) => row.product_name,
        id: "product_name",
        cell: ({ row }) => (
          <div>
            <span>{row.original.product_name?.toString()}</span>
            <div
              className={`admin-row-action-wrapper gap-2 ${
                itemHovered === row.id ? "show" : ""
              }`}
            >
              <Link
                className="admin-row-action edit"
                href={`/admin/product-management/${row.original.product_id?.toString()}`}
                onClick={() => handleEdit(row.original.product_id)}
              >
                Sửa
              </Link>
              |
              <button
                className="admin-row-action delete"
                onClick={() => {
                  setIsOpenDeleteConfirmDialog(true);
                  setActiveField(row.original.product_id);
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
                    id: row.original.product_id,
                    status: row.original.product_status,
                  });
                }}
              >
                {row.original.product_status === Status.SUSPENDED ? (
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
        accessorFn: (row) => row.product_images,
        id: "product_images",
        cell: ({ row }) => (
          <div className="w-20 h-20">
            <img
              src={"http://" + row.original.product_images[0]}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        ),
        header: () => <span>Ảnh</span>,
      },

      {
        accessorFn: (row) => row.product_detail,
        id: "product_detail",
        cell: ({ row }) => (
          <div className="ellipsis-text-3-lines ">
            {Array.isArray(row.original.product_detail)
              ? row.original.product_detail.map((item) => {
                  return (
                    <div className="mb-1">
                      <span> {item.name}:</span>
                      &emsp;
                      <span> {item.value}</span>
                    </div>
                  );
                })
              : "Không có"}
          </div>
        ),
        header: () => <span>Thông số</span>,
      },

      {
        accessorFn: (row) => row.product_price,
        id: "product_price",
        cell: ({ row }) => (
          <p className="time">
            {row.original.product_price !== 0
              ? formatCurrencyWithDots(row.original.product_price) + " đ"
              : "Không có giá"}
          </p>
        ),
        header: () => <span className="time">Giá</span>,
      },

      {
        accessorFn: (row) => row.variants,
        id: "variants",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.variants.map((item) => {
              return (
                <div
                  style={{ backgroundColor: item.variant_color }}
                  className="w-6 h-6 rounded-full"
                ></div>
              );
            })}
          </div>
        ),
        header: () => <span className="time">Màu sắc</span>,
      },
      {
        accessorFn: (row) => row.product_type,
        id: "category",
        cell: ({ row }) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {ProductTypeToText[row.original.product_type]}
          </div>
        ),
        header: () => <span>Danh mục</span>,
      },

      {
        accessorFn: (row) => row.product_status,
        id: "status",
        cell: ({ row }) => renderStatus(row.original.product_status),
        header: () => <span>Trạng thái</span>,
      },
    ],
    [itemHovered]
  );

  const getRowId = (row: any, relativeIndex: any, parent: any) => {
    return parent ? [parent.id, row.product_id].join(".") : row.product_id;
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
    redirect(`/admin/product-management/${id.toString()}`);
  };

  const handleDelete = async () => {
    setIsOpenDeleteConfirmDialog(false);

    if (typeof activeField === "number") {
      await deleteProduct(activeField);
      setActiveField(undefined);
    }

    await invokeGetAllProducts();
  };

  const handleChangeStatus = async () => {
    setShowInfoDialog(false);
    if (
      typeof activeChangeStatus.id === "number" &&
      activeChangeStatus.status !== undefined
    ) {
      const targetStatus =
        activeChangeStatus.status === Status.ACTIVE
          ? Status.SUSPENDED
          : Status.ACTIVE;
      await changeBlogStatus(activeChangeStatus.id, targetStatus);
      setActiveChangeStatus({ id: undefined, status: undefined });
      await invokeGetAllProducts();
    }
  };

  const handleFilterBlog = (name: string, item: any) => {
    // const newFilterObject = { ...globalFilter, [name]: item };
    // setGlobalFilter(newFilterObject);
  };

  const handleDeleteMultipleBlog = async () => {
    const productIds = Object.keys(rowSelection).map((item) => Number(item));
    await deleteMultipleProducts(productIds);
    await invokeGetAllProducts();
  };

  const handleChangeMultipleStatus = (status: any) => {
    // const blogIds = Object.keys(rowSelection).map((item) => Number(item));
    // changeMultipleBlogStatus(blogIds, status.key);
    // invokeGetAllProducts();
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
          <p className="admin-title">Danh sách sản phẩm</p>
          <Link href="/admin/product-management/add" className="add-new-button">
            <AiOutlinePlus /> <span>Thêm sản phẩm mới</span>
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
                <BiRefresh /> <span>Load lại tất cả sản phẩm</span>
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

export default ProductManagement;
