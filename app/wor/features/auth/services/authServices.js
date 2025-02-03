import { API } from "../../../../../Constants/url";

export const loginApi = async ({ mobile }) => {
  try {
    const response = await API.post("/auth/send-otp", {
      mobile: mobile,
    });
    return response;
  } catch (error) {
    return false;
  }
};
