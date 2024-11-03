import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";
import ShowVehicle from "../../../Components/Dashboard/ShowPrices/ShowVehicle/ShowVehicle";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

const ShowPrice = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f2f2" />
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
          <ShowPickDropCard />
          <ShowVehicle />
          <ShowVehicle />

          <ShowVehicle />
        </View>
        <View style={styles.coupneWithBtn}>
          <View style={styles.couponTextCard}>
            <Text style={styles.coupnText}>Coupons</Text>
            <Text style={styles.textLine}></Text>
            <Text style={styles.coupnText}>
              <Text>Cash</Text>
            </Text>
          </View>
          <CustomBtn
            width="100%"
            btnBg="#e02e88"
            btnColor="#fff"
            title="Book Ride"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingTop: 12,
  },
  mapContainer: {
    width: "100%",
    paddingHorizontal: 20,
    height: 200,
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
    gap: 12,
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
  coupneWithBtn: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,

    alignItems: "center",
  },
  couponTextCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLine: {
    width: 1,
    height: 25,
    backgroundColor: "#e02e87",
    // marginHorizontal: 8,
  },
  coupnText: {
    width: 67,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
