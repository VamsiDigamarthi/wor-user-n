import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import RideHistoryFirst from "./RideHistoryFirst";
import { COLORS } from "../../../Constants/colors";
import { useNavigation } from "@react-navigation/native";

const RideHistoryItem = ({ ride }) => {
  let color;
  switch (ride.status) {
    case "cancelled":
      color = "red";
      break;
    case "completed":
      color = "#1dad07";
      break;
    default:
      color = "red";
  }

  const navigation = useNavigation();

  const onNavigateToRideDetailScreen = () => {
    navigation.navigate("RideHistoryDetailView", { ride });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowWithGap}>
        <Text style={styles.rideDetailsText}>Ride Details</Text>
        <Text style={[styles.completedText, { color: color }]}>
          {ride?.status}
        </Text>
      </View>
      <View style={styles.rowWithGap}>
        <View style={styles.iconContainer}>
          <FontAwesome size={25} name="location-arrow" color="#e02e88" />
        </View>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.headingText}
          >
            {ride?.dropAddress}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.subHeadingText}
          >
            {ride?.dropVicinity}
          </Text>
        </View>
        <Pressable onPress={onNavigateToRideDetailScreen}>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#e02e88" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default RideHistoryItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    elevation: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  rowWithGap: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  rideDetailsText: {
    fontSize: 14,
    fontWeight: "600",
  },
  completedText: {
    fontSize: 11,
    color: "red",
  },
  iconContainer: {
    width: 30,
  },
  textContainer: {
    width: "77%",
    overflow: "hidden",
  },
  headingText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.heading,
  },
  subHeadingText: {
    fontSize: 11,
    color: COLORS.subHeading,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#f2f2f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d1d1cb",
    justifyContent: "center",
    alignItems: "center",
  },
});
