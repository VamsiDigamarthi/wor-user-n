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
import { useNavigation } from "@react-navigation/native";

export default function PaymentModal({ onClose, isRideBookingScreen }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { installedUpiApps } = useUpiApps();

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
    const data = await onChangePaymentMethod({
      token: token,
      orderId: completeRideDetails?._id,
      paymentMethod: selectedMethod,
    });

    onClose();
    if (!data?.status) return;
    const order = data?.order;
    dispatch(setCompleteRideDetails(order));
  };

  const isWalletSufficient =
    price <= profile?.userWalletBalance &&
    (!completeRideDetails ||
      completeRideDetails?.price <= profile?.userWalletBalance);

  const handleNavigateWalletScreen = () => {
    navigation.navigate("WalletLoad");
  };

  return (
    <View style={styles.container}>
      {price <= profile?.userWalletBalance &&
        (!completeRideDetails ||
          completeRideDetails?.price <= profile?.userWalletBalance) && <></>}

      <CommonCard
        selected={selectedMethod === "wallet"}
        setSelected={
          isWalletSufficient
            ? () => handleChangePaymentMethod("wallet")
            : handleNavigateWalletScreen
        }
        title="Wallet"
        icon={<WalletImg height={30} width={30} />}
        disable={!isWalletSufficient}
      />

      <UpiCard
        installedUpiApps={installedUpiApps}
        selected={selectedMethod === "upi"}
        setSelected={() => handleChangePaymentMethod("upi")}
      />

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
