import { IFormValue } from "@/admin/BlogManagement/AddNewBlog";
import { API_ENPOINT } from "@/constants/api";
import { Status } from "@/types";
import { toast } from "react-toastify";

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE2OTkxMTgyMjcsImV4cCI6MTY5OTEyNTQyN30.Nm1qIQ40xuD_A5qxPaCh7DJb9gZIUmVQ-BAPdGthwcA";

export async function addBlogAPI(data: IFormValue) {
  try {
    const loadingToastId = toast.info("Đang tạo bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
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

    console.log(response);

    toast.dismiss(loadingToastId);

    toast.success("Tạo bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteAPI(blogID: number) {
  try {
    const loadingToastId = toast.info("Đang xóa bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "blogs/" + blogID.toString(), {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Xóa bài viết thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(response);

    toast.dismiss(loadingToastId);

    toast.success("Xóa bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteMultipleBlogs(blogIDs: number[]) {
  try {
    const loadingToastId = toast.info("Đang xóa bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "blogs/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
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

    console.log(response);

    toast.dismiss(loadingToastId);

    toast.success("Xóa bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function changeBlogStatus(id: number, status: Status) {
  try {
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
          Authorization: `Bearer ${bearerToken}`,
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

    console.log(response);

    toast.dismiss(loadingToastId);

    toast.success("Đổi trạng thái bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function editBlogAPI(data: IFormValue) {
  try {
    const loadingToastId = toast.info("Đang tạo bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
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

    console.log(response);

    toast.dismiss(loadingToastId);

    toast.success("Tạo bài viết thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
