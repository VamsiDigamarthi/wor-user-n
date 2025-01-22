import { Dimensions, StyleSheet, Text, View } from "react-native";
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
import HomePlaceNearPlaceCard from "../components/HomePlaceNearPlaceCard";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.54, 0.6].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.15, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

const HomeScreen = () => {
  const { captainMarkers, nearByRandomItems } = useHomeScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
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
            <HomePlaceNearPlaceCard nearByRandomItems={nearByRandomItems} />
            <AllServices />
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
