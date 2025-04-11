import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserCard from "./UserCard";
import MessageCall from "./MessageCall";
import RideDetails from "./RideDetails";
import AddTip from "./AddTip";

const UserRideDetailsCard = ({
  otpVerified,
  completeRideDetails,
  disFromPickToDrop,
}) => {
  return (
    <View style={styles.container}>
      <UserCard
        vehcleType={completeRideDetails?.vehicleType}
        captainDetails={completeRideDetails?.acceptCaptain}
      />
      {!otpVerified && (
        <MessageCall
          orderId={completeRideDetails?._id}
          captainDetails={completeRideDetails?.acceptCaptain}
        />
      )}
      <RideDetails
        otpVerified={otpVerified}
        disFromPickToDrop={disFromPickToDrop}
      />
    </View>
  );
};

export default UserRideDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 15,
  },
});
