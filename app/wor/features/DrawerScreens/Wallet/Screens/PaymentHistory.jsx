import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import PaymentHistoryCard from "../Components/PaymentHistoryCard";

export default function PaymentHistory() {
  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar
        title="Payment History"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
      {
        [1,2,3,4,5,6,7,8,0].map((e)=>  <PaymentHistoryCard key={e} />)
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    marginTop:10
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
