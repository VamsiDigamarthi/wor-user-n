import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CaptainTime from "../../../Components/Dashboard/CaptainAcceptCom/CaptainTime/CaptainTime";
import CaptainRideOpt from "../../../Components/Dashboard/CaptainAcceptCom/CaptainRideOtp/CaptainRideOpt";
import CaptainDetails from "../../../Components/Dashboard/CaptainAcceptCom/CaptainDetails/CaptainDetails";
import RatingMsgCall from "../../../Components/Dashboard/CaptainAcceptCom/RatingMsgCall/RatingMsgCall";
import ReferAndEarn from "../../../Components/Dashboard/CaptainAcceptCom/ReferAndEarn/ReferAndEarn";
import RatingCard from "../../../Components/Dashboard/CaptainAcceptCom/RatingCard/RatingCard";
import { useCaptainAcceptRideHook } from "./CaptainAcceptRide.hook";
import { coordinationMap } from "../../../Constants/displaylocationmap";
import CaptainAcceptRideDetails from "../../../Components/Dashboard/CaptainAcceptCom/CaptainAcceptRideDetails/CaptainAcceptRideDetails";
import RideDetailAmount from "../../../Components/Dashboard/CaptainAcceptCom/RideDetails/RideDetailAmount";
import CaptainRideCompletePriceCard from "../../../Components/Dashboard/CaptainAcceptCom/CapatinRideComplete/CaptainRideCompletePriceCard";

const CaptainAcceptRide = () => {
  const { orderDetails, otpVerified, travellingTimeAndDistnace } =
    useCaptainAcceptRideHook();
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: coordinationMap(
              orderDetails?.pickup?.coordinates[1],
              orderDetails?.pickup?.coordinates[0]
            ),
          }}
          style={styles.mapImage} // Define your desired styles here
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <CaptainTime
            title={otpVerified ? "Total Ride Time" : "Rider on the way"}
            time={travellingTimeAndDistnace?.durationInMinutes ?? "03:59"}
          />
          {!otpVerified && <CaptainRideOpt orderOtp={orderDetails?.orderOtp} />}
          <View style={styles.userCalCard}>
            <CaptainDetails captainDetails={orderDetails?.acceptCaptain} />
            <RatingMsgCall otpVerified={otpVerified} />
          </View>
          {!otpVerified && (
            <CaptainAcceptRideDetails
              travellingTimeAndDistnace={travellingTimeAndDistnace}
              orderDetails={orderDetails}
            />
          )}
          {otpVerified && (
            <CaptainRideCompletePriceCard
              travellingTimeAndDistnace={travellingTimeAndDistnace}
              orderDetails={orderDetails}
            />
          )}
          {otpVerified && (
            <RideDetailAmount
              payButton={true}
              orderDetails={orderDetails}
              travellingTimeAndDistnace={travellingTimeAndDistnace}
            />
          )}
          <ReferAndEarn />
          {/* <RatingCard /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default CaptainAcceptRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 20,
    // paddingTop: 12,
  },
  userCalCard: {
    gap: 20,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
  },
  mapContainer: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContainer: {
    paddingTop: 250,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make sure the image covers the container
    borderRadius: 10,
  },
  bottomSheet: {
    width: "100%",
    height: "fit-content",
    paddingHorizontal: 26,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
    paddingBottom: 50,
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
  },
});
