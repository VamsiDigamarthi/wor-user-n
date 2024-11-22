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
import { useShowPriceHook } from "./ShowPrice.hook.js";
import { coordinationMap } from "../../../Constants/displaylocationmap.js";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine.jsx";
const ShowPrice = () => {
  const {
    placeName,
    dropDetails,
    pricesInKM,
    handleVehiclePress,
    selectedVehicle,
    onPlaceTheOrder,
    apiError,
    pickUpCoordinated,
  } = useShowPriceHook();

  let shoRightIcons = false;
  let timeShow = true;
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#f5f2f2" /> */}

      <View style={styles.mapContainer}>
        <ShowPollyLine
          origin={pickUpCoordinated}
          // origin={{ lat: 17.4587171, lng: 78.3705414 }}
          destination={dropDetails?.location}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <View style={styles.bottomSheetInner}>
            <ShowPickDropCard
              placeName={placeName}
              isInputShow={false}
              dropLocation={dropDetails?.name}
              shoRightIcons={shoRightIcons}
              timeShow={timeShow}
            />
            <View style={{ height: 10 }} />
            <ShowVehicle
              image={require("../../../assets/images/scooty.png")}
              personCount={1}
              price={pricesInKM?.scooty}
              isSelected={selectedVehicle === "scooty"}
              onPress={() => handleVehiclePress("scooty")}
              vehicleType="Scooty"
            />
            <ShowVehicle
              image={require("../../../assets/images/car.png")}
              personCount={4}
              price={pricesInKM?.car}
              isSelected={selectedVehicle === "car"}
              onPress={() => handleVehiclePress("car")}
              vehicleType="Car"
            />
            <ShowVehicle
              image={require("../../../assets/images/auto.png")}
              personCount={3}
              price={pricesInKM?.auto}
              isSelected={selectedVehicle === "auto"}
              onPress={() => handleVehiclePress("auto")}
              vehicleType="Auto"
            />
            <ShowVehicle
              image={require("../../../assets/images/car.png")}
              personCount={4}
              price={pricesInKM?.car}
              isSelected={selectedVehicle === "car"}
              onPress={() => handleVehiclePress("car")}
              vehicleType="Car 1"
            />
            <ShowVehicle
              image={require("../../../assets/images/auto.png")}
              personCount={3}
              price={pricesInKM?.auto}
              isSelected={selectedVehicle === "auto"}
              onPress={() => handleVehiclePress("auto")}
              vehicleType="Car 2"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.coupneWithBtn}>
        <View style={styles.couponTextCard}>
          <Text style={styles.coupnText}>Coupons</Text>
          <Text style={styles.textLine}></Text>
          <Text style={styles.coupnText}>
            <Text>Cash</Text>
          </Text>
        </View>
        {apiError && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{apiError}</Text>
          </View>
        )}
        <CustomBtn
          width="100%"
          btnBg={selectedVehicle ? "#e02e88" : "#fff"}
          btnColor={selectedVehicle ? "#fff" : "#e02e88"}
          title={selectedVehicle ? `Book ${selectedVehicle}` : "Book Ride"}
          onPress={onPlaceTheOrder}
          disabled={true}
          borderColor="#e02e88"
          borderWidth={1}
        />
      </View>
    </View>
  );
};

export default ShowPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    // paddingTop: 12,
    position: "relative",
  },
  mapContainer: {
    width: "100%",
    // paddingHorizontal: 20,
    height: 230,
    position: "absolute",
    top: -80,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make sure the image covers the container
    borderRadius: 10,
  },

  scrollContainer: {
    paddingTop: 250,
  },

  bottomSheet: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 5,
    backgroundColor: "#fff5f9",
    marginBottom: 150,
  },

  bottomSheetInner: {
    backgroundColor: "#fff",
    // borderWidth: 1,
    borderColor: "#ffe3e6",
    elevation: 1,
    shadowColor: "red",
    gap: 0,
    borderRadius: 10,
  },
  text: {
    width: 60,
    height: 3,
    backgroundColor: "#ffe2e6",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
  coupneWithBtn: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
    height: 150,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
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
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
