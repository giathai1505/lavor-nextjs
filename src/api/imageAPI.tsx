import { CLIENT_API_ENPOINT } from "@/constants/client.env";
import { getTokenFromLocalStorage } from "@/utilities/commonUtilities";
import { signOut } from "next-auth/react";

export async function upLoadImage(imageFile: File) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch(CLIENT_API_ENPOINT + "images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export async function upLoadImages(imageFiles: File[]) {
  try {
    const token: any = await getTokenFromLocalStorage();
    if (token !== "") {
      const formData = new FormData();

      imageFiles.forEach((file, index) => {
        formData.append("files", file);
      });

      const response = await fetch(CLIENT_API_ENPOINT + "images/upload-many", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
