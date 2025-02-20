import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import RideOtp from "./Components/RideOtp";
import UserCard from "./Components/UserRideDetailsCard";
import WorSupportCard from "./Components/WorSupportCard";
import RideVerified from "./Components/RideVerified";
import ShowPollyLine from "../../../utiles/ShowPollyLine";
import AddTipNew from "./Components/AddTipNew";
import CopyBox from "../../../utiles/CopyBox";
import { useCaptainAcceptRideScreenHook } from "./Hooks/CaptainAcceptRideScreen.hook";
import TrackMe from "./Components/TrackMe";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.4, 0.6].map((p) => screenHeight * p);
const iosSnapPoints = [0.4, 0.6].map((p) => screenHeight * p);

const CaptainAcceptRideScreen = () => {
  const { mapHeight, snapPoints, handleSheetChange, trackMeTranslateY } =
    useBottomSheetConfig(
      androidSnapPoints,
      iosSnapPoints,
      kownBotSheetChangeUpOrDown
    );

  const {
    otpVerified,
    isArrived,
    completeRideDetails,
    disFromCaptainLocToPick,
    disFromPickToDrop,
    liveCoordinates,
    kownBotSheetChangeUpOrDown,
  } = useCaptainAcceptRideScreenHook();

  let captainCoordinates = {
    lat: completeRideDetails.captainCoor[1],
    lng: completeRideDetails.captainCoor[0],
  };

  let pickUpCoordinates = {
    lat: completeRideDetails?.pickup?.coordinates?.[1],
    lng: completeRideDetails?.pickup?.coordinates?.[0],
  };

  let dropCoordinates = {
    lat: completeRideDetails?.drop?.coordinates?.[1],
    lng: completeRideDetails?.drop?.coordinates?.[0],
  };

  return (
    <AppBarLayout
      isDrawerIcon={true}
      title={
        otpVerified
          ? completeRideDetails?.dropAddress
          : isArrived
          ? "Rider has arrived"
          : "Ride On the way"
      }
      vicinity={
        otpVerified
          ? completeRideDetails?.dropVicinity
          : isArrived && "Your 3m free waiting Timer has started"
      }
      isPositionAppbar={true}
      isArrived={isArrived}
      otpVerified={otpVerified}
      rideTide={otpVerified ? disFromPickToDrop : disFromCaptainLocToPick}
      isRideBookingScree={true}
    >
      <View style={styles.mapContainer}>
        <ShowPollyLine
          origin={otpVerified ? pickUpCoordinates : captainCoordinates}
          destination={otpVerified ? dropCoordinates : pickUpCoordinates}
          liveCoordinates={liveCoordinates}
          height={mapHeight}
        />
      </View>

      <TrackMe trackMeTranslateY={trackMeTranslateY} />

      <BottomSheetComponent
        backgroundColor="#f7f7f7"
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
      >
        <View style={styles.innerCard}>
          {otpVerified ? (
            <RideVerified />
          ) : (
            <RideOtp otp={completeRideDetails?.orderOtp} />
          )}
          <UserCard
            otpVerified={otpVerified}
            disFromPickToDrop={disFromPickToDrop}
            completeRideDetails={completeRideDetails}
          />
          <WorSupportCard />
          {otpVerified && <AddTipNew />}
          <CopyBox backgroundColor="#fff" />
        </View>
      </BottomSheetComponent>
    </AppBarLayout>
  );
};

export default CaptainAcceptRideScreen;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  innerCard: {
    gap: 10,
    padding: 10,
  },
});
