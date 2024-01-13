"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { IAgencyTable, ICity, IRegion } from "@/types/type";
import { ToastContainer } from "react-toastify";
import { convertToAgencyArray } from "@/utilities/commonUtilities";
import AddCityDialog from "./Dialogs/AddCityDialog";
import ConfirmDialog from "@/components/Common/Dialog";
import AddAgencyDialog from "./Dialogs/AddAgencyDialog";
import { Select, Table } from "antd";
import { BsTrash } from "react-icons/bs";
import type { ColumnsType } from "antd/es/table";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";

type TSelectOption = {
  value: number;
  label: string;
};

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

const initListRegionFilter = (agencies: IRegion[]): TSelectOption[] => {
  const result: TSelectOption[] = [];
  agencies.forEach((item) => {
    return result.push({ value: item.region_id, label: item.region_name });
  });
  return result;
};

const AgencyManagementTable: React.FC<IAgencyManagement> = ({ agencies }) => {
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

  const { get, delete: deleteAgency } = useFetchApi();

  const invokeGetAllAgency = async () => {
    setGlobalFilter({
      cityID: NaN,
      regionID: NaN,
    });

    try {
      const res: any = await get(API_ROUTES.agency.getAll);

      if (res && res.regions) {
        const newData = convertToAgencyArray(res.regions);
        setData(newData);
        setListRegion(res.regions as IRegion[]);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    }
  };

  const invokeDeleteAgency = async (id: number) => {
    try {
      await deleteAgency(API_ROUTES.agency.deleteOne(id));
      await invokeGetAllAgency();
      setActiveField(undefined);
    } catch (error) {
      console.log(error);
    }
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

  const columns: ColumnsType<IAgencyTable> = [
    {
      title: "Tên đại lý",
      dataIndex: "agency_name",
      key: "agency_name",
    },

    {
      title: "Tên tỉnh",
      dataIndex: "city_name",
      key: "city_name",
    },
    {
      title: "Khu vực",
      dataIndex: "region_name",
      key: "region_name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "agency_address",
      key: "agency_address",
    },
    {
      title: "Action",

      render: (_: any, record: any) => {
        return (
          <button
            className="button-delete-row-selection "
            onClick={() => {
              setIsOpenDeleteConfirmDialog(true);
              setActiveField(record.agency_id);
            }}
          >
            <BsTrash />
            <span>Xóa</span>
          </button>
        );
      },
    },
  ];

  const handleFilter = (agencies: IRegion[], filter: IFilter): IRegion[] => {
    let newData: IRegion[] = filter.regionID
      ? agencies.filter((item) => item.region_id === filter.regionID)
      : agencies;

    if (filter.cityID) {
    }

    return newData;
  };

  const handleDelete = async () => {
    setIsOpenDeleteConfirmDialog(false);
    if (typeof activeField === "number") {
      await invokeDeleteAgency(activeField);
    }
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

  const handleModelSuccess = () => {
    invokeGetAllAgency();
    setShowDialog({
      agency: false,
      city: false,
    });
  };

  return (
    <>
      <AddAgencyDialog
        open={showDialog.agency}
        onClose={closeAllDialog}
        cities={initListCity(listRegion)}
        onSuccess={handleModelSuccess}
      />
      <AddCityDialog
        open={showDialog.city}
        onClose={closeAllDialog}
        agencies={agencies}
        onSuccess={handleModelSuccess}
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

            <Select
              style={{ width: 200 }}
              placeholder="Lọc theo miền"
              onChange={(item) => handleFilterBlog("regionID", item)}
              options={initListRegionFilter(agencies)}
            />
          </div>
        </div>
        <Table dataSource={data} columns={columns} bordered />
        <ToastContainer />
      </div>
    </>
  );
};

export default AgencyManagementTable;
