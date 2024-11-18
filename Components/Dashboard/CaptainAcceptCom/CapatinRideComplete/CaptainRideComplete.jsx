import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import CaptainDetails from "../CaptainDetails/CaptainDetails";
import RatingCard from "../RatingCard/RatingCard";
import CaptainRideCompletePriceCard from "./CaptainRideCompletePriceCard";

const CaptainRideComplete = () => {
  const route = useRoute();
  const { orderDetails, travellingTimeAndDistnace } = route.params;
  return (
    <View style={styles.conatiner}>
      <ScrollView
        contentContainerStyle={{
          //   paddingBottom: 20, // Ensure padding at the bottom for scroll
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.firstCard}>
          <CaptainDetails captainDetails={orderDetails?.acceptCaptain} />
          <View style={styles.vehicleConfirm}>
            <Text style={styles.vehicleText}>
              was the vehicle number is correct
            </Text>
            <View style={{ flexDirection: "row", gap: 7 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#e02e88" }}
              >
                Yes
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "600" }}>No</Text>
            </View>
          </View>
        </View>
        <RatingCard />
        <CaptainRideCompletePriceCard
          orderDetails={orderDetails}
          travellingTimeAndDistnace={travellingTimeAndDistnace}
        />
        <Text style={styles.skip}>skip to home screen</Text>
      </ScrollView>
    </View>
  );
};

export default CaptainRideComplete;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  firstCard: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 20,
  },
  vehicleConfirm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleText: {
    fontSize: 11,
  },
  skip: {
    fontSize: 14,
    fontWeight: "600",
    paddingBottom: 20,
  },
});
