import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import { ICarFormValue } from "@/admin/CarManagement/CarManagementForm";
import { getTokenFromLocalStorage } from "@/utilities/commonUtilities";
import { signOut } from "next-auth/react";

export async function addYear(year: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(CLIENT_API_ENPOINT + "design/years", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ year: year }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function addBrand(brand_name: string) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(CLIENT_API_ENPOINT + "design/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brand_name: brand_name }),
      });

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

export async function getAllCarTable() {
  try {
    const response = await fetch(CLIENT_API_ENPOINT + "design/cars", {
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

export async function getAllBrands() {
  try {
    const response = await fetch(CLIENT_API_ENPOINT + "design/brands", {
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

export async function getAllModels() {
  try {
    const response = await fetch(CLIENT_API_ENPOINT + "design/brands", {
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

export async function addModel(brand_id: string, model_name: string) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT + "design/brands/" + brand_id + "/models",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ model_name }),
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

export async function addVersion(model_id: string, version_name: string) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT + "design/models/" + model_id + "/versions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ version_name }),
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

export async function addCar(data: ICarFormValue) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT +
          `design/years/${data.year}/versions/${data.version_id}/cars`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            year: data.year,
            version_id: data.version_id,
            image_url: data.image_url,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllYears() {
  const res = await fetch(CLIENT_API_ENPOINT + "design/years", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getCar(year: number, version: number) {
  const res = await fetch(
    CLIENT_API_ENPOINT + `design/years/${year}/versions/${version}/cars`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function updateCar(data: ICarFormValue) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT +
          `design/years/${data.year}/versions/${data.version_id}/cars`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image_url: data.image_url,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function delelteCar(year: number, versionID: number) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const response = await fetch(
        CLIENT_API_ENPOINT + `design/years/${year}/versions/${versionID}/cars`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      signOut();
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getCarByYear(year: number) {
  try {
    const response = await fetch(
      CLIENT_API_ENPOINT + "design/years/" + year.toString() + "/cars",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

export async function sendDesign(data: any) {
  try {
    const response = await fetch(CLIENT_API_ENPOINT + `design/order`, {
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
