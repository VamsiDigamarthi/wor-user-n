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
import CancelRideModal from "../CaptainAcceptRide/Modals/CancelRideModal";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { fonts } from "../../../fonts/Fonts";
import PollyLineNew from "../../../utiles/PollyLineNew";

const screenHeight = Dimensions.get("window").height;
const androidSnapPoints = [0.48, 0.5].map((p) => screenHeight * p); // Example snap points for Android
const iosSnapPoints = [0.42, 0.42].map((p) => screenHeight * p); // Example snap points for iOS

const LookingForRideScreen = () => {
  const {
    dropDetails,
    isSendOrReceiveParcel,
    pickUpDetails,
    price,
    selectedVehicleType,
  } = useSelector((state) => state.allRideDetails);
  // console.log(
  //   useSelector((state) => state.allRideDetails),
  //   "useSelector((state) => state.allRideDetails);"
  // );

  const {
    progressWidth,
    handleCancelRide,
    handleRplaceRide,
    showCancelWithReOrderBtn,
    onNewCancelHandle,
    futureTime,
    cancelRideModal,

    setCancelModal,
    cancelModal,
    orderId,
  } = useLookingForRideScreenHook();

  const { mapHeight, snapPoints, handleSheetChange } = useBottomSheetConfig(
    androidSnapPoints,
    iosSnapPoints
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <PollyLineNew
          selectedVehicleType={selectedVehicleType}
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
          otpVerified={false}
          rideStarted={false}
        />
      </View>
      <BottomSheetComponent
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
      >
        <View style={{ padding: 15 }}>
          {futureTime ? (
            <View style={styles.loadingContainer}>
              <Chase size={60} color="#EA4C89" />
            </View>
          ) : (
            <ProgressBar progressWidth={progressWidth} />
          )}
          <View style={styles.cancelBtnWithImage}>
            <Image
              style={styles.images}
              source={require("../../../../../assets/images/loadingbg.png")}
            />
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -100 }, { translateY: -100 }], // half of width & height of content
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "600", marginBottom: 10 }}
              >
                Looking for Captain
              </Text>
              <Image
                style={{ width: 180, height: 180 }}
                source={require("../../../../../assets/searching.gif")}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.cancelBtn}>
            <CustomBtn
              title={showCancelWithReOrderBtn ? "Cancel Ride" : "Re-Place Ride"}
              btnBg="#F7F7F7"
              btnColor="#EA4C89"
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

          <View style={styles.rideDetailsContainer}>
            <Entypo name="location-pin" size={24} color="green" />

            <View style={styles.innerContainer}>
              <View>
                <Text style={styles.text}>{dropDetails?.name}</Text>
                <Text style={styles.text}>{dropDetails?.vicinity}</Text>
              </View>

              <View style={styles.infoContainer}>
                <AntDesign name="infocirlceo" size={14} color="#FF6600" />
                <Text style={styles.text}>Total you pay Rs. {price}</Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetComponent>
      <CancelRideModal
        closeCancelModal={() => setCancelModal(false)}
        openCancelModal={cancelModal}
        orderId={orderId}
        isLookingForRideScreen={true}
      />
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
  rideDetailsContainer: {
    backgroundColor: "#F7F7F7",
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    // backgroundColor:"green"
  },

  innerContainer: {
    width: "100%",
    gap: 10,
  },

  infoContainer: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 60,

    alignItems: "center",
    // justifyContent:"center",
    // marginHorizontal: "auto",
    // width: "100%",
    // backgroundColor:"red"
  },

  text: {
    fontFamily: fonts.robotoRegular,
  },
});
