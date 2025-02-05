import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React, { useEffect } from "react";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import PaymentHistoryCard from "../Components/PaymentHistoryCard";
import { useWallet } from "../Hooks/useWallet.hook";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import { COLORS } from "../../../../../../Constants/colors";

export default function PaymentHistory({ navigation }) {
  const { getWalletTransactions, trxns } = useWallet();

  useEffect(() => {
    getWalletTransactions();
  }, []);

  // console.log(trxns);

  return (
    <AppBarLayout title="Payment History" isPositionAppbar={true} >

      <ScrollView style={[styles.container,{paddingTop : Platform.OS=="ios" ? 110 : 100}]}>
        {trxns?.map((e, index) => (
          <PaymentHistoryCard
            date={e.date}
            amount={e?.amount}
            key={index}
            desc={e.description}
            type={e?.type}
          />
        ))}
      </ScrollView>
    
      </AppBarLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 16,
  
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
