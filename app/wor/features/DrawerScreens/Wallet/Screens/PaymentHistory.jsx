import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import PaymentHistoryCard from "../Components/PaymentHistoryCard";
import { useWallet } from "../Hooks/useWallet.hook";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import { COLORS } from "../../../../../../Constants/colors";
import NoRideMessage from "../../RideHistory/Components/NoRideMessage";

export default function PaymentHistory({ navigation }) {
  const { getWalletTransactions, trxns } = useWallet();

  useEffect(() => {
    getWalletTransactions();
  }, []);

  console.log(trxns, "---------------trancasj-------------------");

  // {"__v": 0, "_id": "67f0ca125c5e0f5f3c47aaa2", "amount": 41, "createdAt": "2025-04-05T06:13:38.209Z", "date": "2025-04-05T06:13:38.208Z", "description": "Deducted for Order", "trxnType": "ride", "type": "debit", "updatedAt": "2025-04-05T06:13:38.209Z", "userId": "677cc42947aac41f9ff808f9"}

  return (
    <AppBarLayout title="Payment History" isPositionAppbar={true}>
      <FlatList
        scrollEnabled
        data={trxns}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PaymentHistoryCard
            amount={item?.amount}
            date={item.date}
            desc={item.description}
            status={item?.type}
            trxnType={item?.trxnType}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyPatmentHistory />}
        contentContainerStyle={{
          paddingTop: 90,
          paddingBottom: 30, // Increase padding to ensure last item is visible
        }}
        style={{
          backgroundColor: COLORS.mainBackgroundColor,
        }}
        // ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </AppBarLayout>
  );
}

const EmptyPatmentHistory = () => (
  <View style={styles.centerCard}>
    <Text
      style={{
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 21,
      }}
    >
      Payment history refers to the record of all past transactions made by a
      user, including payments received, pending payments, refunds, and
      failed transactions.
    </Text>
    {/* <Text
      style={{
        fontSize: 16,
        fontWeight: 600,
        textAlign: "center",
        lineHeight: 21,
      }}
    >
      Kepp track of your trips anytime, all in one place.
    </Text> */}
  </View>
);

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
  centerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    gap: 14,
  },
});
