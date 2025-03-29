import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CommonCard from "../Components/CommonCard";
import { Cash, CreditCard, WalletImg } from "../../../../Images/Payment";
import UpiCard from "../Components/UpiCard";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompleteRideDetails,
  setPaymentMethod,
} from "../../../ridebooking/sharedLogics/rideDetailsSlice";
import { onChangePaymentMethod } from "../services/changePaymentMethod";

import { useUpiApps } from "./UpiApps.hook";

export default function PaymentModal({ onClose, isRideBookingScreen }) {
  const dispatch = useDispatch();

  const { installedUpiApps } = useUpiApps();

  // console.log(installedUpiApps);

  // Local state to track the selected payment method during modal interaction
  const [selectedMethod, setSelectedMethod] = useState(null);

  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const { paymentMethod, price, completeRideDetails } = useSelector(
    (state) => state.allRideDetails
  );

  // Set initial value of selectedMethod when the component loads
  useEffect(() => {
    if (isRideBookingScreen && completeRideDetails) {
      setSelectedMethod(completeRideDetails?.paymentMethod);
    } else {
      setSelectedMethod(paymentMethod);
    }
  }, [isRideBookingScreen, completeRideDetails, paymentMethod]);

  const handleChangePaymentMethod = (method) => {
    setSelectedMethod(method);
    dispatch(setPaymentMethod(method));
  };

  const handleChangePaymentMethodApi = async () => {
    // console.log("Selected payment method:", selectedMethod);
    // console.log(completeRideDetails?._id, "---id");
    // console.log(token, "---id");

    const data = await onChangePaymentMethod({
      token: token,
      orderId: completeRideDetails?._id,
      paymentMethod: selectedMethod,
    });

    // console.log(data?.order, "==========================");

    onClose();
    if (!data?.status) return;
    const order = data?.order;
    dispatch(setCompleteRideDetails(order));
  };

  // console.log("profile?.walletBalance", profile?.walletBalance);
  // console.log("price", price);
  // console.log("completeRideDetails", completeRideDetails);

  return (
    <View style={styles.container}>
      {price <= profile?.walletBalance &&
        (!completeRideDetails ||
          completeRideDetails?.price <= profile?.walletBalance) && (
          <CommonCard
            selected={selectedMethod === "wallet"}
            setSelected={() => handleChangePaymentMethod("wallet")}
            title="Wallet"
            icon={<WalletImg height={30} width={30} />}
          />
        )}

      <UpiCard
        installedUpiApps={installedUpiApps}
        selected={selectedMethod === "upi"}
        setSelected={() => handleChangePaymentMethod("upi")}
      />

      {/* <CommonCard
        selected={selectedMethod === "card"}
        setSelected={() => handleChangePaymentMethod("card")}
        title="Credit / Debit Cards"
        icon={<CreditCard height={30} width={30} />}
      /> */}

      <CommonCard
        selected={selectedMethod === "cash"}
        setSelected={() => handleChangePaymentMethod("cash")}
        title="Cash"
        icon={<Cash height={30} width={30} />}
      />

      <View style={{ width: "100%" }}>
        <CustomBtn
          title="Save"
          onPress={isRideBookingScreen ? handleChangePaymentMethodApi : onClose}
          btnBg={"#EA4C89"}
          btnColor={"#fff"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});
