import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const useRideHistoryHook = () => {
  const { token } = useSelector((state) => state.token);

  const [rideHistory, setRideHistory] = useState([]);

  const onFetchRideHistory = async () => {
    try {
      const response = await API.get("/user/all-order", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      setRideHistory(response.data?.reverse());
    } catch (error) {
      console.log("ride history", error.response.data.message);
      Toast.show({
        text1: "Failed to fetch ride history places",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    onFetchRideHistory();
  }, []);

  return {
    rideHistory,
  };
};
