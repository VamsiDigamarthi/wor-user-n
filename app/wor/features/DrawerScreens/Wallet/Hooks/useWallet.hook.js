import { useSelector } from "react-redux";
import { API } from "../../../../../../Constants/url";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useWallet = () => {
  const { token } = useSelector((state) => state.token);
  const [trxns, setTrxns] = useState([]);

  const getWalletTransactions = async () => {
    try {
      const response = await API.get("/payment/wallet-transactions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      setTrxns(response.data);
    } catch (error) {
      // console.log(error.message);

      Toast.show({
        text1: "Something Went Wrong",
        position: "top",
        type: "error",
      });
    }
  };

  return {
    getWalletTransactions,
    trxns,
  };
};
