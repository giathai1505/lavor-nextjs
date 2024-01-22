"use client";
import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { ICarTable } from "@/types/type";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { ToastContainer } from "react-toastify";
import ConfirmDialog from "@/components/Common/Dialog";
import { BsTrash } from "react-icons/bs";
import API_ROUTES from "@/constants/apiRoutes";
import useFetchApi from "@/hooks/useFetchApi";
import ApiLoading from "@/components/ApiLoading";

interface IBlogManagement {
  cars: ICarTable[];
}

const CarManagementTable: React.FC<IBlogManagement> = ({ cars }) => {
  const [data, setData] = useState(cars);
  const { delete: deleteCar, get, loading } = useFetchApi();
  const [isShowDeleteConfirmDialog, setIsShowDeleteConfirmDialog] =
    useState<boolean>(false);

  const [activeRecord, setActiveRecord] = useState<ICarTable | null>(null);

  useEffect(() => {
    setData(cars);
  }, [cars]);

  const invokeGetAllCar = async () => {
    try {
      const res: any = await get(API_ROUTES.car.getCarTable);
      if (res && res.cars) {
        setData(res.cars);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    }
  };

  const handleDelelteCar = async () => {
    if (activeRecord) {
      try {
        await deleteCar(
          API_ROUTES.car.addCar(activeRecord.year, activeRecord.version_id)
        );
        setActiveRecord(null);
        setIsShowDeleteConfirmDialog(false);
        invokeGetAllCar();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const columns: ColumnsType<ICarTable> = [
    {
      title: "Phiên bản",
      dataIndex: "version_name",
      key: "version_name",
    },

    {
      title: "Hãng",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Model",
      dataIndex: "model_name",
      key: "model_name",
    },
    {
      title: "Năm",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Ảnh",
      key: "image_url",
      render: (_: any, record: any) => {
        return (
          <div>
            <Image
              width={100}
              height={30}
              className="rounded-md object-cover"
              src={record.image_url}
            />
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: ICarTable) => {
        return (
          <div className="w-fit">
            <button
              className="button-delete-row-selection justify-center"
              onClick={() => {
                setActiveRecord(record);
                setIsShowDeleteConfirmDialog(true);
              }}
            >
              <BsTrash />
              <span>Xóa</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ApiLoading loading={loading} />
      <ConfirmDialog
        onOk={handleDelelteCar}
        title="Xóa bài viết"
        open={isShowDeleteConfirmDialog}
        content="Bạn có chắc muốn xóa bài viết này không?"
        onClose={() => setIsShowDeleteConfirmDialog(false)}
        type="delete"
      />
      <div className="admin-page-wrapper">
        <div className="flex mb-5 justify-between items-center">
          <p className="admin-title">Danh sách xe</p>

          <Link href="/admin/car-management/add" className="add-new-button">
            <AiOutlinePlus /> <span>Thêm/ Chỉnh sửa xe</span>
          </Link>
        </div>

        <Table dataSource={data} columns={columns} bordered />
      </div>
      <ToastContainer />
    </>
  );
};

export default CarManagementTable;
