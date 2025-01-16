import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useHomeScreenHook } from "./HomeScreen.hook";
import { useBottomSheetConfig } from "../../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import { allRideBookingScreen } from "../../sharedLogics/styles/ridebookingstyles";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HomeMap from "../components/HomeMap/HomeMap";
import SliderComponent from "../components/SliderComponent/SliderComponent";
import AllServices from "../components/AllServices/AllServices";
import HomeCopyBox from "../components/HomeCopyBox/HomeCopyBox";
import HomeWorImage from "../components/HomeWorImage/HomeWorImage";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.54, 0.6].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.15, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

const HomeScreen = () => {
  const {
    location,
    placeName,
    nearbyPlaces,
    favoritePlaces,
    previousOrders,
    captainMarkers,
  } = useHomeScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    [screenHeight * 0.54, screenHeight * 0.6],
    [screenHeight * 0.15, screenHeight * 0.6]
  );

  return (
    <BottomSheetModalProvider>
      <View style={allRideBookingScreen.container}>
        <HomeMap location={location} captainMarkers={captainMarkers} />
        <BottomSheetComponent
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
        >
          <View style={styles.bottomSheet}>
            <AllServices
              placeName={placeName}
              nearbyPlaces={nearbyPlaces}
              location={location}
              favoritePlaces={favoritePlaces}
              previousOrders={previousOrders}
            />
            <SliderComponent />
            <HomeCopyBox />
            <HomeWorImage />
          </View>
        </BottomSheetComponent>
      </View>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 35, // Top-left corner radius
    borderTopRightRadius: 35, // Top-right corner radius
    // elevation: 1,ele
  },
});
