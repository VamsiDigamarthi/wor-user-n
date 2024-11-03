import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CaptainTime from "../../../Components/Dashboard/CaptainAcceptCom/CaptainTime/CaptainTime";
import CaptainRideOpt from "../../../Components/Dashboard/CaptainAcceptCom/CaptainRideOtp/CaptainRideOpt";
import CaptainDetails from "../../../Components/Dashboard/CaptainAcceptCom/CaptainDetails/CaptainDetails";
import RatingMsgCall from "../../../Components/Dashboard/CaptainAcceptCom/RatingMsgCall/RatingMsgCall";
import ReferAndEarn from "../../../Components/Dashboard/CaptainAcceptCom/ReferAndEarn/ReferAndEarn";
import RatingCard from "../../../Components/Dashboard/CaptainAcceptCom/RatingCard/RatingCard";

const CaptainAcceptRide = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
            }}
            style={styles.mapImage} // Define your desired styles here
          />
        </View>
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <CaptainTime />
          <CaptainRideOpt />
          <CaptainDetails />
          <RatingMsgCall />
          <ReferAndEarn />
          <RatingCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default CaptainAcceptRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingTop: 12,
  },
  mapContainer: {
    width: "100%",
    paddingHorizontal: 20,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
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
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
  },
});
