import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import PaymentMethodCard from "../../../Components/Dashboard/PaymentMethodsCom/PaymentMethodCard/PaymentMethodCard";
import PaymnetItems from "./PaymentItems/PaymnetItems";
import AddPaymnetCard from "./AddPaymnetCard/AddPaymnetCard";

const screenWidth = Dimensions.get("window").width;

const PaymentMethods = () => {
  const [checkedItems, setCheckedItems] = useState({
    cashPayment: false,
    netBanking: false,
    googlePay: false,
    phonePe: false,
    selectedCard: null, // Track which card is selected
  });

  const handleToggle = (item) => {
    setCheckedItems((prevState) => {
      // If a UPI method is clicked (Google Pay or Phone Pe), deselect any previous UPI or Card selections
      if (item === "googlePay" || item === "phonePe") {
        return {
          ...prevState,
          googlePay: item === "googlePay" ? !prevState.googlePay : false,
          phonePe: item === "phonePe" ? !prevState.phonePe : false,
          selectedCard: null, // Deselect the selected card when UPI is selected
        };
      }

      // If a card is clicked, deselect UPI options and set the selected card
      if (item === "axisCard" || item === "hdfcCard") {
        return {
          ...prevState,
          googlePay: false,
          phonePe: false,
          selectedCard: prevState.selectedCard === item ? null : item, // Toggle card selection
        };
      }

      // Handle Cash Payment and Net Banking toggles
      return {
        ...prevState,
        [item]: !prevState[item],
      };
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 15,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PaymentMethodCard titles="Payment Option">
          <PaymnetItems
            title="Cash Payment"
            iconsText="MaterialCommunityIcons"
            iconName="cash-multiple"
            isChecked={checkedItems.cashPayment}
            onToggle={() => handleToggle("cashPayment")}
          />
          <PaymnetItems
            title="Net Banking"
            iconsText="MaterialCommunityIcons"
            iconName="bank-transfer"
            isChecked={checkedItems.netBanking}
            onToggle={() => handleToggle("netBanking")}
          />
        </PaymentMethodCard>
        <PaymentMethodCard titles="UPI">
          <PaymnetItems
            title="Google Pay"
            imageSource={require("../../../assets/images/Payments/googlepay.png")}
            isChecked={checkedItems.googlePay}
            onToggle={() => handleToggle("googlePay")}
            isOpenIconOrCheckBox={false}
          />
          <PaymnetItems
            title="Phone Pe"
            imageSource={require("../../../assets/images/Payments/phonepe.png")}
            isChecked={checkedItems.phonePe}
            onToggle={() => handleToggle("phonePe")}
            isOpenIconOrCheckBox={false}
          />
          <AddPaymnetCard title="Add New UPI ID" />
        </PaymentMethodCard>
        <PaymentMethodCard titles="Credit & Debit Cards">
          <PaymnetItems
            title="Axis **** **** **** 9877"
            imageSource={require("../../../assets/images/Payments/matercard.png")}
            isChecked={checkedItems.selectedCard === "axisCard"}
            onToggle={() => handleToggle("axisCard")}
            isOpenIconOrCheckBox={false}
          />
          <PaymnetItems
            title="HDFC **** **** **** 8767"
            imageSource={require("../../../assets/images/Payments/visa.png")}
            isChecked={checkedItems.selectedCard === "hdfcCard"}
            onToggle={() => handleToggle("hdfcCard")}
            isOpenIconOrCheckBox={false}
          />
          <AddPaymnetCard title="Add New Card" />
        </PaymentMethodCard>
      </ScrollView>
      <View style={styles.positionCard}>
        <CustomBtn title="Pay Now" btnBg="#e02e88" btnColor="#fff" />
      </View>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
    position: "relative",
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
});
