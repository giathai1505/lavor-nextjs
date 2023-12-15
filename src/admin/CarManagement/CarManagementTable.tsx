"use client";
import React, { useEffect, useState } from "react";
import { Table, Image, Select } from "antd";
import { Category, ICarTable, Status } from "@/types";

interface IBlogManagement {
  cars: ICarTable[];
}

interface IFilterBlog {
  search: string;
  category: Category | undefined;
  status: Status | undefined;
}

const CarManagementTable: React.FC<IBlogManagement> = ({ cars }) => {
  const [globalFilter, setGlobalFilter] = useState<IFilterBlog>({
    search: "",
    category: undefined,
    status: undefined,
  });

  const [data, setData] = useState(cars);

  useEffect(() => {
    setData(cars);
  }, [cars]);

  // const invokeGetAllBlogs = async () => {
  //   let url = "?page=1&limit=10";
  //   if (globalFilter.search !== "") {
  //     url += "&search=" + globalFilter.search;
  //   }
  //   if (globalFilter.status !== undefined) {
  //     url += "&status=" + globalFilter.status;
  //   }
  //   if (globalFilter.category !== undefined) {
  //     url += "&category=" + globalFilter.category;
  //   }

  //   getAllBlogs(url)
  //     .then((result) => {
  //       setData(result.blogs);
  //     })
  //     .catch((error) => {
  //       setData([]);
  //     });
  // };

  // useEffect(() => {
  //   invokeGetAllBlogs();
  // }, [globalFilter.category, globalFilter.search, globalFilter.status]);

  const columns: any = [
    {
      title: "Phiên bản",
      dataIndex: "version_name",
      key: "version_name",
    },

    {
      title: "Address",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Năm",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "Address",
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
    {
      title: "Action",
      render: () => {
        <div></div>;
      },
    },
  ];

  return (
    <div className="admin-page-wrapper">
      <div className="flex mb-5">
        <p className="admin-title">Danh sách bài viết</p>
      </div>
      <div className="flex gap-5 mb-5">
        <Select
          placeholder="Lọc theo năm"
          style={{ width: 200 }}
          options={[{ value: "lucy", label: "Lucy" }]}
        />

        <Select
          placeholder="Lọc hãng xe"
          style={{ width: 200 }}
          options={[{ value: "lucy", label: "Lucy" }]}
        />
        <Select
          placeholder="Lọc theo nhãn hiệu"
          style={{ width: 200 }}
          options={[{ value: "lucy", label: "Lucy" }]}
        />
      </div>
      <Table dataSource={data} columns={columns} bordered />
    </div>
  );
};

export default CarManagementTable;
