import { API } from "../../../../../Constants/url";

export const getDrivingSchool = async () => {
  try {
    const data = await API.get("/driving/");
    return data?.data?.data;
  } catch (error) {
    console.log("Failed to fetch Driving schools");
    return false;
  }
};
