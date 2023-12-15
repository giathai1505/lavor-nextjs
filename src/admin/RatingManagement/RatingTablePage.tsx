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
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { BsTrash } from "react-icons/bs";
import { TRating } from "@/types/type";
import { ToastContainer } from "react-toastify";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { deleteRating, getAllRatings, restoreRating } from "@/api/ratingAPI";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

interface IRatingTable {
  ratings: TRating[];
}

const renderStar = (star: number) => {
  return (
    <div className="flex item-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div className="flex items-center" key={item}>
            {item <= star ? (
              <IoIosStar className="w-3 h-3 cursor-pointer relative rating-color" />
            ) : (
              <IoIosStarOutline className="w-3 h-3 cursor-pointer relative rating-color" />
            )}
          </div>
        );
      })}
      <span>{star}</span>
    </div>
  );
};

const RatingTablePage: React.FC<IRatingTable> = ({ ratings }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState<boolean>(false);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [data, setData] = useState<TRating[]>(ratings);
  const [activeId, setActiveId] = useState<number>(NaN);

  const invokeGetAllRatings = async () => {
    getAllRatings()
      .then((result) => {
        if (result && result.reviews && Array.isArray(result.reviews)) {
          setData(result.reviews);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        setData([]);
      });
  };

  const columns = React.useMemo<ColumnDef<TRating>[]>(
    () => [
      {
        accessorFn: (row) => row.review_name,
        id: "review_name",
        cell: ({ row }) => <span>{row.original.review_name.toString()}</span>,
        header: () => <span className="w-fit">Tên</span>,
      },
      {
        accessorFn: (row) => row.review_content,
        id: "review_content",
        cell: ({ row }) => (
          <div className="ellipsis-text-3-lines max-w-500 ">
            {row.original.review_content}
          </div>
        ),
        header: () => <span>Nội dung</span>,
      },

      {
        id: "status",
        cell: ({ row }) => (
          <div className="">
            {row.original.review_delete_date === null ? (
              <span className="active-tag">Hoạt động</span>
            ) : (
              <span className="active-tag deActive">Ẩn</span>
            )}
          </div>
        ),
        header: () => <span>Trạng thái</span>,
      },

      {
        accessorFn: (row) => row.review_rating,
        id: "review_rating",
        cell: ({ row }) => (
          <div>{renderStar(Number(row.original.review_rating))}</div>
        ),
        header: () => <span>Số sao</span>,
      },

      {
        accessorFn: (row) => row.review_phone,
        id: "review_phone",
        cell: ({ row }) => <span>{row.original.review_phone.toString()}</span>,
        header: () => <span>Điện thoại</span>,
      },

      {
        id: "action",
        cell: ({ row }) => (
          <div>
            {row.original.review_delete_date === null ? (
              <button
                className="button-delete-row-selection "
                onClick={() => {
                  setIsOpenDeleteConfirmDialog(true);
                  setActiveId(row.original.review_id);
                }}
              >
                <BsTrash />
                <span>Xóa</span>
              </button>
            ) : (
              <button
                className="button-delete-row-selection "
                onClick={() => {
                  setShowInfoDialog(true);
                  setActiveId(row.original.review_id);
                }}
              >
                <MdOutlineSettingsBackupRestore />
                <span>Khôi phục</span>
              </button>
            )}
          </div>
        ),
        header: () => <span></span>,
      },
    ],
    []
  );

  useEffect(() => {
    setData(ratings);
  }, [ratings]);

  const getRowId = (row: any, _: any, parent: any) => {
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

  const handleDelete = async () => {
    setIsOpenDeleteConfirmDialog(false);
    setActiveId(NaN);

    if (activeId) {
      try {
        await deleteRating(activeId);
      } catch (error) {}
    }
    await invokeGetAllRatings();
  };

  const handleRestoreRating = async () => {
    setShowInfoDialog(false);
    setActiveId(NaN);
    if (activeId) {
      try {
        await restoreRating(activeId);
      } catch (error) {}
    }
    invokeGetAllRatings();
  };

  return (
    <div className="admin-page-wrapper ">
      <ConfirmDialog
        onOk={handleRestoreRating}
        title="Khôi phục đánh giá"
        open={showInfoDialog}
        content="Bạn có chắc muốn khôi phục đánh giá này không?"
        onClose={() => setShowInfoDialog(false)}
        type="information"
      />
      <ConfirmDialog
        onOk={handleDelete}
        title="Xóa đánh giá"
        open={isOpenDeleteConfirmDialog}
        content="Bạn có chắc muốn xóa đánh giá này không?"
        onClose={() => setIsOpenDeleteConfirmDialog(false)}
        type="delete"
      />
      <div className="p-2">
        <div className="flex items-center justify-between mb-10">
          <p className="admin-title">Danh sách đánh giá</p>
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

export default RatingTablePage;
