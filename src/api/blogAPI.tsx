import { IFormValue } from "@/admin/BlogManagement/AddNewBlog";
import { API_ENPOINT } from "@/constants/api";
import { Status } from "@/types";
import { getTokenFromLocalStorage } from "@/utilities";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export async function getAllBlogs(url: string) {
  try {
    const response = await fetch(API_ENPOINT + "blogs" + url, {
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

export async function addBlogAPI(data: IFormValue) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang tạo bài viết...", {
        position: "top-center",
        autoClose: false,
      });
      const response = await fetch(API_ENPOINT + "blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, blog_url: "" }),
      });

      if (!response.ok) {
        toast.dismiss(loadingToastId);
        toast.error("Tạo bài viết thất bại!!!", {
          position: "top-center",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.dismiss(loadingToastId);

      toast.success("Tạo bài viết thành công!!!", {
        position: "top-center",
      });

      const responseData = await response.json();
      return responseData;
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteAPI(blogID: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang xóa bài viết...", {
        position: "top-center",
        autoClose: false,
      });
      const response = await fetch(API_ENPOINT + "blogs/" + blogID.toString(), {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.dismiss(loadingToastId);
        toast.error("Xóa bài viết thất bại!!!", {
          position: "top-center",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.dismiss(loadingToastId);

      toast.success("Xóa bài viết thành công!!!", {
        position: "top-center",
      });

      const responseData = await response.json();
      return responseData;
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteMultipleBlogs(blogIDs: number[]) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang xóa bài viết...", {
        position: "top-center",
        autoClose: false,
      });
      const response = await fetch(API_ENPOINT + "blogs/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blog_ids: blogIDs }),
      });

      if (!response.ok) {
        toast.dismiss(loadingToastId);
        toast.error("Xóa bài viết thất bại!!!", {
          position: "top-center",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.dismiss(loadingToastId);

      toast.success("Xóa bài viết thành công!!!", {
        position: "top-center",
      });

      const responseData = await response.json();
      return responseData;
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function changeBlogStatus(id: number, status: Status) {
  const token: any = await getTokenFromLocalStorage();
  if (token !== "") {
    const loadingToastId = toast.info("Đang đổi trạng thái bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(
      API_ENPOINT + "blogs/" + id.toString() + "/status",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blog_status: status }),
      }
    );

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Đổi trạng thái bài viết thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Đổi trạng thái bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } else {
    signOut();
  }

  try {
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function editBlogAPI(data: IFormValue, blogID: string) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang chỉnh sửa bài viết...", {
        position: "top-center",
        autoClose: false,
      });
      const response = await fetch(API_ENPOINT + "blogs/" + blogID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.dismiss(loadingToastId);
        toast.error("Chỉnh sửa bài viết thất bại!!!", {
          position: "top-center",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.dismiss(loadingToastId);

      toast.success("Chỉnh sửa bài viết thành công!!!", {
        position: "top-center",
      });

      const responseData = await response.json();
      return responseData;
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function changeMultipleBlogStatus(
  blogIDs: number[],
  status: Status
) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang chỉnh sửa bài viết...", {
        position: "top-center",
        autoClose: false,
      });

      const data = { blog_ids: blogIDs, blog_status: status };

      const response = await fetch(API_ENPOINT + "blogs/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.dismiss(loadingToastId);
        toast.error("Chỉnh sửa bài viết thất bại!!!", {
          position: "top-center",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.dismiss(loadingToastId);

      toast.success("Chỉnh sửa bài viết thành công!!!", {
        position: "top-center",
      });

      const responseData = await response.json();
      return responseData;
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
