"use client";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "@/components/Common/Dialog";
import { BsTrash } from "react-icons/bs";
import { TRating } from "@/types/type";
import { ToastContainer } from "react-toastify";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { deleteRating, getAllRatings, restoreRating } from "@/api/ratingAPI";
import { Table } from "antd";
import { indexArray } from "@/utilities/commonUtilities";
import useToast from "@/hooks/useToast";
import useAxiosAuth from "@/hooks/useAxiosAuth";

interface IRatingTable {
  ratings: TRating[];
}

const renderStar = (star: number) => {
  return (
    <div className="flex item-center gap-1">
      {indexArray(5).map((item) => {
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
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] =
    useState<boolean>(false);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [data, setData] = useState<TRating[]>(ratings);
  const [activeId, setActiveId] = useState<number>(NaN);
  const { contextHolder, showNotification } = useToast();
  const axios = useAxiosAuth();

  const invokeApproveReview = async (id: number) => {
    try {
      const result: any = await axios.put(`review/${id.toString()}/approve`);

      if (result?.ok) {
      } else {
        showNotification("success", "Đánh giá đã được duyệt thành công!", "");
      }
    } catch (error) {
      showNotification("error", "Đã có lỗi xảy ra! Vui lòng thử lại sau.", "");
    }
  };

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

  const handleApproveReview = async (id: number) => {
    await invokeApproveReview(id);
    await invokeGetAllRatings();
  };

  const columns: any = [
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
            {record.review_delete_date === null ? (
              <span className="active-tag">Hoạt động</span>
            ) : (
              <span className="active-tag deActive">Ẩn</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Số sao",
      key: "star",
      render: (_: any, record: any) => {
        return <div>{renderStar(Number(record.review_rating))}</div>;
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
    <>
      {contextHolder}
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

          <Table dataSource={data} columns={columns} bordered />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default RatingTablePage;
