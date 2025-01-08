import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CaptainTime from "../../../Components/Dashboard/CaptainAcceptCom/CaptainTime/CaptainTime";
import CaptainRideOpt from "../../../Components/Dashboard/CaptainAcceptCom/CaptainRideOtp/CaptainRideOpt";
import CaptainDetails from "../../../Components/Dashboard/CaptainAcceptCom/CaptainDetails/CaptainDetails";
import RatingMsgCall from "../../../Components/Dashboard/CaptainAcceptCom/RatingMsgCall/RatingMsgCall";
import ReferAndEarn from "../../../Components/Dashboard/CaptainAcceptCom/ReferAndEarn/ReferAndEarn";
import { useCaptainAcceptRideHook } from "./CaptainAcceptRide.hook";
import CaptainAcceptRideDetails from "../../../Components/Dashboard/CaptainAcceptCom/CaptainAcceptRideDetails/CaptainAcceptRideDetails";
import RideDetailAmount from "../../../Components/Dashboard/CaptainAcceptCom/RideDetails/RideDetailAmount";
import CaptainRideCompletePriceCard from "../../../Components/Dashboard/CaptainAcceptCom/CapatinRideComplete/CaptainRideCompletePriceCard";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { useNavigation } from "@react-navigation/native";

import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

import { useCallback, useMemo, useRef, useState } from "react";
import { COLORS } from "../../../Constants/colors";

const CaptainAcceptRide = () => {
  const {
    orderDetails,
    otpVerified,
    travellingTimeAndDistnace,
    liveCoordinates,
  } = useCaptainAcceptRideHook();
  const navigation = useNavigation();

  let pickCoor = {
    lat: orderDetails?.pickup?.coordinates?.[1],
    lng: orderDetails?.pickup?.coordinates?.[0],
  };

  let drop = {
    lat: orderDetails?.drop?.coordinates?.[1],
    lng: orderDetails?.drop?.coordinates?.[0],
  };

  // console.log("captainOrder", orderDetails?.captainCoor);

  const onShowFullMap = () => {
    navigation.navigate("FullMapPreview", {
      origin: otpVerified ? pickCoor : orderDetails?.captainCoor,
      destination: otpVerified ? drop : pickCoor,
      liveCoordinates: liveCoordinates ?? {
        latitude: 17.234532,
        longitude: 78.987667,
      },
    });
  };

  const screenHeight = Dimensions.get("window").height;
  const androidHeight = [screenHeight * 0.57, screenHeight * 0.37]; // Adjust snap points
  const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

  const bottomSheetRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(androidHeight[0]); // Initial map height
  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosHeight : androidHeight),
    []
  );

  const handleSheetChange = useCallback((index) => {
    let height = screenHeight * 0.95; // Default map height
    // console.log(index);
    if (index === 1) {
      height = screenHeight * 0.6; // Map height at middle snap point
    }
    setMapHeight(height);
  }, []);

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Rider On the Way"
        onBack={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.mapContainer}>
        {orderDetails?.captainCoor ? (
          <ShowPollyLine
            origin={otpVerified ? pickCoor : orderDetails?.captainCoor}
            destination={otpVerified ? drop : pickCoor}
            height={mapHeight}
            liveCoordinates={liveCoordinates}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={30} color={"#e02e88"} />
          </View>
        )}
      </View>
      {/* <View style={styles.mapFullCardIocn}>
        <Pressable onPress={onShowFullMap}>
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            color="#e02e88"
            size={30}
          />
        </Pressable>
      </View> */}

      <BottomSheet
        ref={bottomSheetRef}
        index={1} // Initial snap point
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={false} // Prevent closing
        style={styles.bottomSheet} // Apply custom styles
        backgroundStyle={styles.backgroundStyle} // Set pink background
        handleIndicatorStyle={styles.handleIndicator}

      >
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          {/* <View style={styles.bottomSheet}> */}
          {/* <Text style={styles.text}></Text> */}
          <View
            style={{
              width: "100%",
              elevation: 1,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <CaptainTime
              title={otpVerified ? "Total Ride Time" : "Rider on the way"}
              time={travellingTimeAndDistnace?.durationInMinutes ?? "03:59"}
            />
            {!otpVerified && (
              <CaptainRideOpt orderOtp={orderDetails?.orderOtp} />
            )}
          </View>
          <View style={styles.userCalCard}>
            <CaptainDetails captainDetails={orderDetails?.acceptCaptain} />
            <RatingMsgCall
              otpVerified={otpVerified}
              orderId={orderDetails?._id} // this id join chat room
              captainDetails={orderDetails?.acceptCaptain} // this prop display user profile in chat header
            />
          </View>
          {!otpVerified && (
            <CaptainAcceptRideDetails
              travellingTimeAndDistnace={travellingTimeAndDistnace}
              orderDetails={orderDetails}
            />
          )}
          {otpVerified && (
            <CaptainRideCompletePriceCard
              travellingTimeAndDistnace={travellingTimeAndDistnace}
              orderDetails={orderDetails}
            />
          )}
          {otpVerified && (
            <RideDetailAmount
              payButton={true}
              orderDetails={orderDetails}
              travellingTimeAndDistnace={travellingTimeAndDistnace}
            />
          )}
          {/* <ReferAndEarn /> */}
          {/* <RatingCard /> */}
          {/* </View> */}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default CaptainAcceptRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 20,
    // paddingTop: 12,
    position: "relative",
  },
  userCalCard: {
    gap: 20,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    // borderWidth: 1,
    elevation: 1,
    borderColor: "#ffe2e6",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
  },
  sheetContent: {
    // padding: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.bottomSheetBg,
    gap: 10,
  },
  contentText: {
    fontSize: 16,
    // lineHeight: 24,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingTop: 430,
    // backgroundColor: "red",
    zIndex: 8,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make sure the image covers the container
    borderRadius: 10,
  },
  bottomSheet: {
    borderTopLeftRadius: 20, // Top-left corner radius
    borderTopRightRadius: 20, // Top-right corner radius
  },
  backgroundStyle: {
    backgroundColor: COLORS.bottomSheetBg,
    gap: 5, // Pink background color for BottomSheet
  },
});
