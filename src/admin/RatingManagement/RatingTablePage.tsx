"use client";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "@/components/Common/Dialog";
import { BsTrash } from "react-icons/bs";
import { TRating } from "@/types/type";
import { Table } from "antd";
import useFetchApi from "@/hooks/useFetchApi";
import API_ROUTES from "@/constants/apiRoutes";
import { ColumnsType } from "antd/es/table";
import ApiLoading from "@/components/ApiLoading";
import { RenderStar } from "@/pages/AboutUs/Rating/RatingItem";

interface IRatingTable {
  ratings: TRating[];
}

const RatingTablePage: React.FC<IRatingTable> = ({ ratings }) => {
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState<boolean>(false);
  const [data, setData] = useState<TRating[]>(ratings);
  const [activeId, setActiveId] = useState<number>(NaN);
  const { edit, get, delete: deleteReview, loading } = useFetchApi();

  const invokeGetAllRatings = async () => {
    try {
      const res: any = await get(API_ROUTES.review.getAllPending);
      if (res && res.reviews) {
        setData(res.reviews);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  const invokeApproveReview = async (id: number) => {
    try {
      await edit(API_ROUTES.review.approve(id), {});
      await invokeGetAllRatings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveReview = async (id: number) => {
    await invokeApproveReview(id);
  };

  const columns: ColumnsType<TRating> = [
    {
      title: "Tên",
      dataIndex: "review_name",
      key: "review_name",
    },

    {
      title: "Nội dung",
      key: "review_content",
      render: (_: any, record: any) => {
        return (
          <div className="ellipsis-text-3-lines max-w-500 ">
            {record.review_content}
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "region_name",
      render: (_: any, record: any) => {
        return (
          <div>
            {record.approve_date === null ? (
              <span className="active-tag deActive">Chưa duyệt</span>
            ) : (
              <span className="active-tag">Hoạt động</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Số sao",
      key: "star",
      render: (_: any, record: any) => {
        return <div>
          <RenderStar star={record.review_rating}/>
       </div>;
      },
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "review_phone",
      key: "review_phone",
    },
    {
      title: "Action",

      render: (_: any, record: any) => {
        return (
          <div>
            {record.approve_date === null ? (
              <>
                <button
                  className="button-delete-row-selection justify-center"
                  style={{ width: "120px" }}
                  onClick={() => handleApproveReview(record.review_id)}
                >
                  <BsTrash />
                  <span>Duyệt</span>
                </button>
              </>
            ) : (
              <button
                className="button-delete-row-selection justify-center"
                style={{ width: "120px" }}
                onClick={() => {
                  setIsOpenDeleteConfirmDialog(true);
                  setActiveId(record.review_id);
                }}
              >
                <BsTrash />
                <span>Xóa</span>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setData(ratings);
  }, [ratings]);

  const handleDelete = async () => {
    setIsOpenDeleteConfirmDialog(false);
    setActiveId(NaN);

    if (activeId) {
      try {
        await deleteReview(API_ROUTES.review.deleteOne(activeId));
        await invokeGetAllRatings();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ApiLoading loading={loading} />
      <div className="admin-page-wrapper ">
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
          <Table dataSource={data} columns={columns} bordered />
        </div>
      </div>
    </>
  );
};

export default RatingTablePage;
