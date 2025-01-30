import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CommonCard from "../Components/CommonCard";
import { Cash, CreditCard, WalletImg } from "../../../../Images/Payment";
import UpiCard from "../Components/UpiCard";
import CustomBtn from "../../../../utiles/CustomBtn";
import { fonts } from "../../../../fonts/Fonts";
export default function PaymentModal() {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const backPaymentMethod = "cash";
  const handleSave = () => {};
  return (
    <View style={styles.container}>
      <CommonCard
        selected={paymentMethod === "wallet"}
        setSelected={() => setPaymentMethod("wallet")}
        title="Wallet"
        icon={<WalletImg height={30} width={30} />}
      />

      <UpiCard
        selected={paymentMethod === "upi"}
        setSelected={() => setPaymentMethod("upi")}
      />
      <CommonCard
        selected={paymentMethod === "card"}
        setSelected={() => setPaymentMethod("card")}
        title="Credit / Debit Cards"
        icon={<CreditCard height={30} width={30} />}
      />

      <CommonCard
        selected={paymentMethod === "cash"}
        setSelected={() => setPaymentMethod("cash")}
        title="Cash"
        icon={<Cash height={30} width={30} />}
      />

      {backPaymentMethod !== paymentMethod && (
        <View style={{ width: "100%" }}>
          <CustomBtn
            title="save"
            onPress={handleSave}
            btnBg={"#EA4C89"}
            btnColor={"#fff"}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});
