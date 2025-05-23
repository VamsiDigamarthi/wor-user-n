import { Dimensions, StyleSheet, View } from "react-native";
import { useHomeScreenHook } from "./HomeScreen.hook";
import { useBottomSheetConfig } from "../../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import { allRideBookingScreen } from "../../sharedLogics/styles/ridebookingstyles";
import HomeMap from "../components/HomeMap";
import SliderComponent from "../components/SliderComponent";
import HomeWorImage from "../components/HomeWorImage";
import AllServices from "../components/AllServices";
import HomeInput from "../components/HomeInput";
import HomePlaceNearPlaceCard from "../components/HomePlaceNearPlaceCard";
import CopyBox from "../../../../utiles/CopyBox";
import { StatusBar } from "expo-status-bar";
import RatingModal from "../modals/RatingModal/RatingModal";
import AadharNotVerifiedModal from "../modals/InitialModals/AadharNotVerifiedModal";
import MpinNotAvailableModal from "../modals/InitialModals/MpinNotAvailableModal";
import FutureOrderBox from "../modals/FutureOrderBox";
import { withLocationBarrierHoc } from "../../../../../../HOC/withLocationBarrier";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.54, 0.6].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.5, 0.59].map((p) => screenHeight * p); // Example snap points for iOS

const HomeScreen = () => {
  const {
    captainMarkers,
    nearByRandomItems,
    openRatingModal,
    setOpenRatingModal,
    handleCloseRatModAndUpdRatNotGivenToserver,
    penRatOrderIdCaptainId,
    ownUser,
  } = useHomeScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
  );

  return (
    <>
      <StatusBar style="dark" />

      <View style={allRideBookingScreen.container}>
        <HomeMap captainMarkers={captainMarkers} mapHeight={mapHeight} />
        <BottomSheetComponent
          snapPoints={snapPoints}
          handleSheetChange={handleSheetChange}
          enableContentPanningGesture={true} // Allows gestures inside BottomSheet
          enableHandlePanningGesture={true} // Allows gestures on the handle
          enableOverDrag={true}
        >
          <View style={styles.bottomSheet}>
            <HomeInput />
            <HomePlaceNearPlaceCard nearByRandomItems={nearByRandomItems} />
            <AllServices />
            <SliderComponent />
            <CopyBox />
            <HomeWorImage />
          </View>
        </BottomSheetComponent>
      </View>
      <RatingModal
        openModal={openRatingModal}
        setOpenRatingModal={setOpenRatingModal}
        closeModal={handleCloseRatModAndUpdRatNotGivenToserver}
        penRatOrderIdCaptainId={penRatOrderIdCaptainId}
      />

      <FutureOrderBox />
      <AadharNotVerifiedModal />
      <MpinNotAvailableModal />
    </>
  );
};

export default withLocationBarrierHoc(HomeScreen);

const styles = StyleSheet.create({
  bottomSheet: {
    gap: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
