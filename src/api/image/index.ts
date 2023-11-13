import { API_ENPOINT } from "@/constants/api";

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE2OTk4MDAyMTUsImV4cCI6MTY5OTgwNzQxNX0._AYppb-RcNx0_TTrrtmM-0IYxgHPHYKNFYZtv6AbTvc";

export async function upLoadImage(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(API_ENPOINT + "images/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
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
