"use client";
import React, { useEffect, useState } from "react";
import { Table, Image, Select } from "antd";
import { Category, ICarTable, Status } from "@/types/type";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

interface IBlogManagement {
  cars: ICarTable[];
}

interface IFilterBlog {
  search: string;
  category: Category | undefined;
  status: Status | undefined;
}

const CarManagementTable: React.FC<IBlogManagement> = ({ cars }) => {
  const [data, setData] = useState(cars);

  useEffect(() => {
    setData(cars);
  }, [cars]);

  const columns: any = [
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
              src={"http://" + record.image_url}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-page-wrapper">
      <div className="flex mb-5 justify-between items-center">
        <p className="admin-title">Danh sách xe</p>

        <Link href="/admin/car-management/add" className="add-new-button">
          <AiOutlinePlus /> <span>Thêm/ Chỉnh sửa xe</span>
        </Link>
      </div>

      <Table dataSource={data} columns={columns} bordered />
    </div>
  );
};

export default CarManagementTable;
