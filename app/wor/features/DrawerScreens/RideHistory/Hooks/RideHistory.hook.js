import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const useRideHistoryHook = () => {
  const { token } = useSelector((state) => state.token);
  const [rideHistory, setRideHistory] = useState([]);

  const onFetchRideHistory = useCallback(async () => {
    try {
      const response = await API.get("/user/all-order", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setRideHistory(response.data?.reverse() || []);
    } catch (error) {
      Toast.show({
        text1: "Failed to fetch ride history",
        type: "error",
        position: "bottom",
      });
    }
  }, [token]);

  useEffect(() => {
    onFetchRideHistory();
  }, [onFetchRideHistory]);

  return { rideHistory };
};
