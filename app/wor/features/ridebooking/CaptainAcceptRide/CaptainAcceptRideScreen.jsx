import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import AppBarLayout from "../sharedLogics/AppBarLayout";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import RideOtp from "./Components/RideOtp";
import UserCard from "./Components/UserRideDetailsCard";
import WorSupportCard from "./Components/WorSupportCard";
import HomeCopyBox from "../home/components/HomeCopyBox";
import RideVerified from "./Components/RideVerified";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useCaptainAcceptRideScreenHook } from "./CaptainAcceptRideScreen.hook";
import ShowPollyLine from "../../../utiles/ShowPollyLine";
import AddTip from "./Components/AddTip";
import CopyBox from "../../../utiles/CopyBox";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.4, 0.6].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.35, 0.6].map((p) => screenHeight * p); // Example snap points for iOS

const CaptainAcceptRideScreen = () => {
  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
  );

  const {
    otpVerified,
    isArrived,
    completeRideDetails,
    disFromCaptainLocToPick,
    disFromPickToDrop,
    liveCoordinates,
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

  const navigation = useNavigation();

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
        />
      </View>
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
          {otpVerified && <AddTip />}
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
