import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const useRideHistoryHook = () => {
  let data = [
    {
      _id: {
        $oid: "6731a5429b3391786ede625b",
      },
      price: 6,
      vehicleType: "scooty",
      status: "pending",
      orderPlaceDate: "11-11-2024",
      orderPlaceTime: "12:03:38 pm",
      pickup: {
        type: "Point",
        coordinates: [78.3705406, 17.458755],
      },
      pickupAddress:
        "Sprint Business Centre, 6th Floor, Jayabheri Silicon Towers, Kothaguda, Hyderabad, Telangana 500084, India",
      drop: {
        type: "Point",
        coordinates: [78.36523609999999, 17.4535649],
      },
      dropAddress: "Monday Hotels Hitec City",
      favorite: false,
      saved: false,
    },
  ];
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
