import { API_ENPOINT } from "@/constants/api";
import { getTokenFromLocalStorage } from "@/utilities";

export async function upLoadImage(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(API_ENPOINT + "images/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
      body: formData,
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

export async function upLoadImages(imageFiles: File[]) {
  try {
    const formData = new FormData();

    imageFiles.forEach((file, index) => {
      formData.append("files", file);
    });

    const response = await fetch(API_ENPOINT + "images/upload-many", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
      body: formData,
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
