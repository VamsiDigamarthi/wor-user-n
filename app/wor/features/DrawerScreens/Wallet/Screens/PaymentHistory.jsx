import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import PaymentHistoryCard from "../Components/PaymentHistoryCard";
import { useWallet } from "../Hooks/useWallet.hook";

export default function PaymentHistory({ navigation }) {
  const { getWalletTransactions, trxns } = useWallet();

  useEffect(() => {
    getWalletTransactions();
  }, []);

  console.log(trxns);

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar
        title="Payment History"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
        {trxns?.map((e, index) => (
          <PaymentHistoryCard key={index} type={e?.type} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
