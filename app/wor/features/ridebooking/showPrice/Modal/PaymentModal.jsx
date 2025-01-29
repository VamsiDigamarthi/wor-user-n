import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import UpiCard from "../Components/UpiCard";
import { fonts } from "../../../../fonts/Fonts";
import CommonCard from "../Components/CommonCard";
import { Cash, CreditCard, WalletImg } from "../../../../Images/Payment";

export default function PaymentModal({
  onClose,
  paymentMethod,
  setPaymentMethod,
}) {
  const [coupons, setCoupons] = useState([0]);

  return (
    <ModalUI
      // openCloseState={shceduleOrderModal}
      closeModalFun={onClose}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View
        style={{
          width: "100%",
          padding: 10,
          gap: 10,
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.heading}>Pay By Wallet</Text>
        <CommonCard
          setSelected={() => setPaymentMethod("wallet")}
          selected={paymentMethod === "wallet"}
          icon={<WalletImg height={50} width={50} />}
          title="Available Banalce 500 /-"
        />

        <Text style={styles.heading}>Pay By Upi</Text>
        <UpiCard
          setSelected={() => setPaymentMethod("upi")}
          // onPress={}
          selected={paymentMethod === "upi"}
        />

        <Text style={styles.heading}>Credit / Debit Cards</Text>
        <CommonCard
          setSelected={() => setPaymentMethod("card")}
          selected={paymentMethod === "card"}
          icon={<CreditCard height={50} width={50} />}
          title="Credit / Debit Cards"
        />
        <Text style={styles.heading}>Cash</Text>

        <CommonCard
          setSelected={() => setPaymentMethod("cash")}
          selected={paymentMethod === "cash"}
          icon={<Cash height={50} width={50} />}
          title="Cash"
        />
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  upiCard: {
    elevation: 1,
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 20,
    marginBottom: 5,
  },
});
