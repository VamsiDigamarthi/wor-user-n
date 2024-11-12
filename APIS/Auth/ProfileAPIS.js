import { API } from "../../Constants/url";

export const uploadProfilePictureApi = async (formData) => {
  console.log(formData);
  try {
    const response = await API.patch("/auth/edit-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.error("Error uploading profile picture:", error?.response);
    throw error;
  }
};
