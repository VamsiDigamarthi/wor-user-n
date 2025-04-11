import { useState } from "react";
import Toast from "react-native-toast-message";
import { API } from "../../../../../../../Constants/url";
import { useSelector } from "react-redux";

export const useRatingModalHook = ({
  penRatOrderIdCaptainId,
  setOpenRatingModal,
  vehicleType = "scooty",
}) => {
  const { token } = useSelector((state) => state.token);
  //   console.log("penRatOrderIdCaptainId", penRatOrderIdCaptainId);
  const [ratingData, setRatingData] = useState({
    giveVehicleNumber: "yes",
    reviewTest: "",
    rating: 0,
  });

  const handleRatingChange = (key, value) => {
    setRatingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGivenRating = () => {
    if (!ratingData?.rating) {
      return;
    }
    try {
      API.post(
        "/rating",
        {
          ratingText: ratingData?.reviewTest,
          rating: ratingData?.rating,
          orderId: penRatOrderIdCaptainId?.orderId,
          userId: penRatOrderIdCaptainId?.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenRatingModal(false);
      Toast.show({
        text1: "review added successfully",
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
      Toast.show({
        text1: error?.response?.data?.message ?? "Post Review Failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  return {
    ratingData,
    setRatingData,
    handleRatingChange,
    handleGivenRating,
  };
};
