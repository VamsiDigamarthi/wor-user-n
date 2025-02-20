import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const RideHistoryFirst = ({ ride }) => {
  // console.log(ride);
  const [isDisplayRideDetails, setIsDisplayRideDetails] = useState(true);
  const toggleRideDetails = () => {
    setIsDisplayRideDetails(!isDisplayRideDetails);
  };
  return (
    <View style={styles.conatiner}>
      <View
        style={[
          styles.firstCard,
          !isDisplayRideDetails && { marginBottom: 10 },
        ]}
      >
        <Text style={styles.rideDetails}>Ride Details</Text>
        <Text style={styles.status}>{ride?.status}</Text>
      </View>
      {isDisplayRideDetails && (
        <>
          <View style={styles.iconWithLocationCard}>
            <Ionicons name="locate-outline" size={18} color="#EA4C89" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: "90%" }}
            >
              {ride?.pickupAddress}
            </Text>
          </View>
          <View style={styles.iconWithLocationCardSeond}>
            <Ionicons name="lock-closed" size={18} color="#EA4C89" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: "90%" }}
            >
              {ride?.dropAddress}
            </Text>
          </View>
        </>
      )}
      <View style={styles.iconsCard}>
        <Pressable onPress={toggleRideDetails}>
          {isDisplayRideDetails ? (
            <AntDesign name="arrowup" size={20} color="#EA4C89" />
          ) : (
            <Ionicons name="arrow-down" size={20} color="#EA4C89" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default RideHistoryFirst;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#fff",
    borderColor: "#ffe2e6",
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
  },
  firstCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  rideDetails: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    color: "red",
  },
  iconWithLocationCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EA4C89",
    padding: 10,
  },
  iconWithLocationCardSeond: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    paddingVertical: 15,
  },
  iconsCard: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#f5f5f5",
    top: 10,
    right: 10,
    borderRadius: 5,
  },
});
