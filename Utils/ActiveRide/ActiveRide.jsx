import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { getTravelDetails } from "../../Constants/displaylocationmap";

const ActiveRide = ({ activeOrder, location }) => {
  const navigation = useNavigation();

  //   const onFetchDistanceRideOtpScreen = async () => {
  //     try {
  //       const dropData = await getTravelDetails(
  //         activeOrder?.pickup?.coordinates,
  //         activeOrder?.drop?.coordinates,
  //         activeOrder?.vehicleType
  //       );
  //       return dropData;
  //     } catch (error) {
  //       console.error("Error fetching travel details:", error);
  //       return null;
  //     }
  //   };

  const onPressActiveRide = async () => {};

  return (
    <View style={styles.activeOrder}>
      <Pressable style={{ gap: 5 }} onPress={onPressActiveRide}>
        <View style={styles.pickDropCard}>
          <Text style={styles.pickLocation}>{activeOrder?.pickupAddress}</Text>
          <Feather
            name="arrow-down"
            color="#fff"
            size={20}
            style={{ marginTop: 2 }}
          />
          <Text style={styles.pickLocation}>{activeOrder?.dropAddress}</Text>
        </View>
        <Text style={{ color: "#fff", fontSize: 14 }}>
          Vehicle Type: {activeOrder?.vehicleType}
        </Text>
      </Pressable>
    </View>
  );
};

export default ActiveRide;

const styles = StyleSheet.create({
  activeOrder: {
    position: "absolute",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    gap: 5,
  },
  pickDropCard: {
    gap: 5,
    alignItems: "flex-start",
  },
  pickLocation: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
