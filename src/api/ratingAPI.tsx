import { API_ENPOINT } from "@/constants/api";
import { TRating } from "@/types";
import { getTokenFromLocalStorage } from "@/utilities";
import { toast } from "react-toastify";

export async function getAllRatings() {
  try {
    const response = await fetch(API_ENPOINT + "review?withDeleted=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function addRating(data: any) {
  try {
    const response = await fetch(API_ENPOINT + `review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteRating(id: number) {
  try {
    const loadingToastId = toast.info("Đang xóa đánh giá...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + `review/` + id.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Xóa đánh giá thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Xóa đánh giá thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function restoreRating(id: number) {
  try {
    const loadingToastId = toast.info("Đang khôi phục đánh giá...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + `review/` + id.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Khôi phục đánh giá thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Khôi phục đánh giá thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
