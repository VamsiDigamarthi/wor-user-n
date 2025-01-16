import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";
import { useSelector } from "react-redux";

export const useHelpHook = () => {
  const [lastOrder, setLastOrder] = useState(null);
  const { token } = useSelector((state) => state.token);

  const onFetchLastOrder = async () => {
    try {
      const response = await API.get("/user/last-order", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setLastOrder(response.data);
    } catch (error) {
      console.log(error?.response?.data?.message ?? "failed");
      Toast.show({
        text1: "Failed to fetch last order",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    onFetchLastOrder();
  }, []);

  return {
    lastOrder,
  };
};
