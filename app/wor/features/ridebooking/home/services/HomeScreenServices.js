import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

const onFetchFavoritePlaces = async (token) => {
  try {
    const response = await API.get("/user/favorites-places", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    Toast.show({
      text1: "Failed to fetch favorite places",
      type: "error",
      position: "bottom",
    });
    return null;
  }
};

const fetchPreviousOrdersServ = async (token) => {
  try {
    const response = await API.get("/user/all-order", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("previous order", response?.data);
    return response?.data;
  } catch (error) {
    console.log("previous order error", error);
    Toast.show({
      text1: "Failed to fetch previous orders",
      type: "error",
      position: "bottom",
    });
  }
};

const onAddFbTokenToServer = async (token, fbToken, fbinstallationId) => {
  try {
    await API.patch(
      "/auth/fbtoken",
      { fbtoken: fbToken, fbinstallationId: fbinstallationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Toast.show({
    //   text1: "fb-token-added successfully",
    //   type: "success",
    //   position: "bottom",
    // });
  } catch (error) {
    console.log(error?.response?.data?.message);
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to upload fbtoken",
      type: "error",
      position: "bottom",
    });
  }
};

const generateRandomMarkers = (location) => {
  const types = ["bike", "auto", "car"];
  const newMarkers = Array.from({ length: 20 }, (_, index) => {
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomRotation = Math.floor(Math.random() * 360);
    return {
      id: index,
      latitude: location.lat + (Math.random() - 0.5) * 0.01,
      longitude: location.lng + (Math.random() - 0.5) * 0.01,
      type: randomType,
      rotation: randomRotation,
    };
  });
  return newMarkers;
};

export const onFetchActiveOrders = async ({ token }) => {
  try {
    const response = await API.get("/user/active-ride", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    console.log("active order fetching failed");
    console.log(error.response.data.message);
    return null;
  }
};

export const onFetchRideRating = async ({ token }) => {
  try {
    const response = await API.get("/rating/get-order-by-rating", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  } catch (error) {
    // console.log("failed to fetch ride rating ");
    return null;
  }
};

export const ratingNotGivenByUser = async ({ token, orderId }) => {
  try {
    await API.patch(
      "/rating/not-given-rating",
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error) {
    console.log("rating not given by user failed");
    return null;
  }
};

export const checkDeviceId = async ({ token, deviceId }) => {
  try {
    await API.patch(
      "/auth/check-device",
      { deviceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { status: true };
  } catch (error) {
    console.log("device id Checking failes");
    return {
      status: false,
      errorMsg: error?.response?.data?.message,
    };
  }
};

export default {
  onFetchFavoritePlaces,
  fetchPreviousOrdersServ,
  onAddFbTokenToServer,
  generateRandomMarkers,
};
