import { API } from "../../../../../Constants/url";

export const loginApi = async ({ mobile }) => {
  try {
    const response = await API.post("/auth/send-otp", {
      mobile: mobile,
    });
    console.log(response.data);

    return response;
  } catch (error) {
    return false;
  }
};

export const removeOtp = async ({ mobile }) => {
  try {
    await API.patch("/auth/remove-otp", {
      mobile: mobile,
    });
    return true;
  } catch (error) {
    return false;
  }
};
