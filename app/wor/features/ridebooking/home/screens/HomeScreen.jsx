import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useHomeScreenHook } from "./HomeScreen.hook";
import { useBottomSheetConfig } from "../../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import { allRideBookingScreen } from "../../sharedLogics/styles/ridebookingstyles";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HomeMap from "../components/HomeMap";
import SliderComponent from "../components/SliderComponent";
import HomeCopyBox from "../components/HomeCopyBox";
import HomeWorImage from "../components/HomeWorImage";
import AllServices from "../components/AllServices";
import HomeInput from "../components/HomeInput";
import LocationItem from "../../../../utiles/LocationItem";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.54, 0.6].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.15, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

const HomeScreen = () => {
  const { favoritePlaces, previousOrders, captainMarkers, nearByRandomItems } =
    useHomeScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    [screenHeight * 0.54, screenHeight * 0.6],
    [screenHeight * 0.15, screenHeight * 0.6]
  );

  return (
    <BottomSheetModalProvider>
      <View style={allRideBookingScreen.container}>
        <HomeMap captainMarkers={captainMarkers} />
        <BottomSheetComponent
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
        >
          <View style={styles.bottomSheet}>
            <HomeInput />
            <LocationItem
              placeName={nearByRandomItems[0]?.name}
              placeVicinity={nearByRandomItems[0]?.vicinity}
              entireLocation={nearByRandomItems[0]}
            />
            <LocationItem
              placeName={nearByRandomItems[1]?.name}
              placeVicinity={nearByRandomItems[1]?.vicinity}
              entireLocation={nearByRandomItems[1]}
              iconName="home"
              iconType="Entypo"
            />
            <LocationItem
              placeName={nearByRandomItems[2]?.name}
              placeVicinity={nearByRandomItems[2]?.vicinity}
              entireLocation={nearByRandomItems[2]}
              iconName="work"
              iconType="MaterialIcons"
            />
            <AllServices
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
    gap: 5,
  },
});
