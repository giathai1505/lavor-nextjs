import { API_ENPOINT } from "@/constants/api";
import { IAgency } from "@/types";
import { getTokenFromLocalStorage } from "@/utilities";
import { toast } from "react-toastify";

export async function addAgencyAPI(data: IAgency, cityID: number) {
  try {
    const response = await fetch(
      API_ENPOINT + "agencies/cities/" + cityID.toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: JSON.stringify({ agencies: [data] }),
      }
    );

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

export async function addCityAPI(cityName: string, regionID: number) {
  try {
    const response = await fetch(
      API_ENPOINT + "agencies/regions/" + regionID.toString() + "/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: JSON.stringify({ city_name: cityName }),
      }
    );

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

export async function getAllAgencies() {
  try {
    const response = await fetch(API_ENPOINT + "agencies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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

export async function deleteAgencyAPI(agencyID: number) {
  try {
    const loadingToastId = toast.info("Đang xóa đại lý...", {
      position: "top-center",
      autoClose: false,
    });
    const response = await fetch(
      API_ENPOINT + "agencies/" + agencyID.toString(),
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    );

    if (!response.ok) {
      toast.dismiss(loadingToastId);
      toast.error("Xóa đại lý thất bại!!!", {
        position: "top-center",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.dismiss(loadingToastId);

    toast.success("Xóa đại lý thành công!!!", {
      position: "top-center",
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
