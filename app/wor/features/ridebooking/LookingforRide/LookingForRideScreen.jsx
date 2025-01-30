import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useBottomSheetConfig } from "../sharedLogics/BottomSheetComponent/useBottomSheetConfig";
import ShowPollyLine from "../../../utiles/ShowPollyLine";
import { useLookingForRideScreenHook } from "./LookingForRideScreen.hook";
import { useSelector } from "react-redux";
import BottomSheetComponent from "../sharedLogics/BottomSheetComponent/BottomSheetComponent";
import ProgressBar from "./components/ProgressBar";
import CustomBtn from "../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.48, 0.5].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.42, 0.42].map((p) => screenHeight * p); // Example snap points for iOS

const LookingForRideScreen = () => {
  const {
    isParcScreen,
    dropDetails,
    selectedVehicleType,
    isSendOrReceiveParcel,
    parcelType,
    price,
    pickUpDetails,
    howManyMens,
  } = useSelector((state) => state.allRideDetails);

  const {
    progressWidth,
    handleCancelRide,
    handleRplaceRide,
    showCancelWithReOrderBtn,
    onNewCancelHandle,
    futureTime,
  } = useLookingForRideScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <ShowPollyLine
          height={mapHeight}
          origin={
            isSendOrReceiveParcel === "send"
              ? pickUpDetails?.location
              : dropDetails?.location
          }
          destination={
            isSendOrReceiveParcel === "send"
              ? dropDetails?.location
              : pickUpDetails?.location
          }
        />
      </View>
      <BottomSheetComponent
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
      >
        <View style={{ padding: 15 }}>
          {futureTime ? (
            <View style={styles.loadingContainer}>
              <Chase size={60} color="#e02e88" />
            </View>
          ) : (
            <ProgressBar progressWidth={progressWidth} />
          )}
          <View style={styles.cancelBtnWithImage}>
            <Image
              style={styles.images}
              source={require("../../../../../assets/images/loadingbg.png")}
            />
          </View>
          <View style={styles.cancelBtn}>
            <CustomBtn
              title={showCancelWithReOrderBtn ? "Cancel Ride" : "Re-Place Ride"}
              btnBg="#F7F7F7"
              btnColor="#e02e88"
              borderRadius={10}
              width="100%"
              onPress={
                showCancelWithReOrderBtn ? handleCancelRide : handleRplaceRide
              }
              // onPress={() => navigation.navigate("captaineacceptride")}
            />
            {!showCancelWithReOrderBtn && (
              <CustomBtn
                title="Cancel Order"
                btnBg="#fff"
                btnColor="#001"
                width="100%"
                onPress={onNewCancelHandle}
              />
            )}
          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
};

export default LookingForRideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: { width: "100%", height: "100%" },
  cancelBtnWithImage: { width: "100%", height: 250, position: "relative" },
  images: { width: "100%", height: "90%", marginBottom: 20, borderRadius: 10 },
  loadingContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
});
