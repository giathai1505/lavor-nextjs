"use client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import NoneFormSelectCustom, {
  IOption,
} from "@/components/Common/NoneFormSelectCustom";
import { BiRefresh } from "react-icons/bi";
import { Category, IAgencyTable, ICity, IRegion, Status } from "@/types";
import { ToastContainer } from "react-toastify";
import { convertToAgencyArray } from "@/utilities";
import { deleteAgencyAPI, getAllAgencies } from "@/api/agencyAPI";
import AddCityDialog from "./Dialogs/AddCityDialog";
import ConfirmDialog from "@/components/Common/Dialog";
import AddAgencyDialog from "./Dialogs/AddAgencyDialog";

interface IAgencyManagement {
  agencies: IRegion[];
}

interface IFilter {
  cityID: number;
  regionID: number;
}

const initListCity = (regions: IRegion[]): ICity[] => {
  let cities: ICity[] = [];

  regions.forEach((item) => {
    cities = cities.concat(item.cities);
  });

  return cities;
};

// const initListCityFilter = (
//   agencies: IRegion[],
//   regionID: number
// ): IOption[] => {
//   const result: IOption[] = [];
//   let newList = agencies;

//   if (regionID) {
//     newList = agencies.filter((item) => item.region_id === regionID);
//   }

//   agencies.forEach((item) => {
//     item.cities.forEach((c) => {
//       result.push({ key: c.city_id, value: c.city_name });
//     });
//   });

//   return result;
// };

const initListRegionFilter = (agencies: IRegion[]): IOption[] => {
  const result: IOption[] = [];

  agencies.forEach((item) => {
    return result.push({ key: item.region_id, value: item.region_name });
  });

  return result;
};

const AgencyManagement: React.FC<IAgencyManagement> = ({ agencies }) => {
  const [globalFilter, setGlobalFilter] = useState<IFilter>({
    cityID: NaN,
    regionID: NaN,
  });
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState(false);
  const [data, setData] = useState<IAgencyTable[]>(
    convertToAgencyArray(agencies)
  );
  const [listRegion, setListRegion] = useState<IRegion[]>(agencies);
  const [activeField, setActiveField] = useState<number | undefined>(undefined);
  const [showDialog, setShowDialog] = useState({
    agency: false,
    city: false,
  });

  const invokeGetAllAgency = async () => {
    setGlobalFilter({
      cityID: NaN,
      regionID: NaN,
    });
    getAllAgencies()
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
    let newListRegions: IRegion[] = handleFilter(agencies, globalFilter);

    setData(() => convertToAgencyArray(newListRegions));
    setListRegion(newListRegions);
  }, [globalFilter?.cityID, globalFilter?.regionID]);

  useEffect(() => {
    setData(() => convertToAgencyArray(agencies));
    setListRegion(agencies);
  }, [agencies]);

  const columns = React.useMemo<ColumnDef<IAgencyTable>[]>(
    () => [
      {
        accessorFn: (row) => row.agency_name,
        id: "agency_name",
        cell: ({ row }) => (
          <div>
            <span>{row.original.agency_name.toString()}</span>
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

      {
        id: "action_row",
        cell: ({ row }) => (
          <button
            className="button-delete-row-selection "
            onClick={() => {
              setIsOpenDeleteConfirmDialog(true);
              setActiveField(row.original.agency_id);
            }}
          >
            <BsTrash />
            <span>Xóa</span>
          </button>
        ),
        header: () => <span className="time"></span>,
      },
    ],
    []
  );

  const handleFilter = (agencies: IRegion[], filter: IFilter): IRegion[] => {
    let newData: IRegion[] = filter.regionID
      ? agencies.filter((item) => item.region_id === filter.regionID)
      : agencies;

    if (filter.cityID) {
    }

    return newData;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const handleDelete = async () => {
    setIsOpenDeleteConfirmDialog(false);
    if (typeof activeField === "number") {
      await deleteAgencyAPI(activeField);
    }
    await invokeGetAllAgency();
    setActiveField(undefined);
  };

  const handleFilterBlog = (name: string, item: any) => {
    let newFilterData = globalFilter;

    if (name === "regionID") {
      newFilterData = { [name]: item, cityID: NaN };
    }
    const newFilterObject = { ...globalFilter, [name]: item };
    setGlobalFilter(newFilterObject);
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
          title="Xóa đại lý"
          open={isOpenDeleteConfirmDialog}
          content="Bạn có chắc muốn xóa đại lý này không?"
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
          <div className="flex items-center gap-5 mb-5">
            <div>
              <div>
                <button
                  onClick={() => {
                    setGlobalFilter({
                      cityID: NaN,
                      regionID: NaN,
                    });
                  }}
                  className="add-new-button"
                >
                  <BiRefresh /> <span>Load tất cả đại lý</span>
                </button>
              </div>
            </div>
            <NoneFormSelectCustom
              options={initListRegionFilter(agencies)}
              onChange={(item) => handleFilterBlog("regionID", item.key)}
              className="admin"
              value={globalFilter.regionID}
              placeholder="Lọc theo miền"
            />
          </div>

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
                  <tr key={row.id}>
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

export default AgencyManagement;
