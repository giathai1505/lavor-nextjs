import { IProductFormValue } from "@/admin/ProductManagement/AddNewProduct";
import { API_ENPOINT } from "@/constants/api";
import { PStatus } from "@/types";
import { toast } from "react-toastify";
import { bearerToken } from "../blog";

export async function addProductAPI(data: IProductFormValue) {
  console.log("data: ", data);
  try {
    const loadingToastId = toast.info("Đang thêm sản phẩm mới...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Thêm sản phẩm thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Tạo sản phẩm thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllProducts(url: string) {
  try {
    const response = await fetch(API_ENPOINT + "products" + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
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

export async function deleteProduct(productID: number) {
  try {
    const loadingToastId = toast.info("Đang xóa sản phẩm...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(
      API_ENPOINT + "products/" + productID.toString(),
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Xóa sản phẩm thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Xóa bài sản phẩm công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteMultipleProducts(productIDs: number[]) {
  try {
    const loadingToastId = toast.info("Đang xóa sản phẩm...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "products/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({ products_ids: productIDs }),
    });

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Xóa sản phẩm thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Xóa sản phẩm thành công!!!", {
      position: "top-center",
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function changeProductStatus(id: number, status: PStatus) {
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

export async function editProductAPI(
  data: IProductFormValue,
  productID: string
) {
  try {
    const loadingToastId = toast.info("Đang chỉnh sửa bài viết...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(API_ENPOINT + "products/" + productID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
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
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
