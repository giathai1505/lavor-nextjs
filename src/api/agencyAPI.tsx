import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import { IAgency } from "@/types/type";
import { getTokenFromLocalStorage } from "@/utilities/commonUtilities";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export async function addAgencyAPI(data: IAgency, cityID: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT + "agencies/cities/" + cityID.toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ agencies: [data] }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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

export async function addCityAPI(cityName: string, regionID: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT +
          "agencies/regions/" +
          regionID.toString() +
          "/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ city_name: cityName }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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

export async function getAllAgencies() {
  try {
    const response = await fetch(CLIENT_API_ENPOINT + "agencies", {
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

export async function deleteAgencyAPI(agencyID: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const loadingToastId = toast.info("Đang xóa đại lý...", {
        position: "top-center",
        autoClose: false,
      });
      const response = await fetch(
        CLIENT_API_ENPOINT + "agencies/" + agencyID.toString(),
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
