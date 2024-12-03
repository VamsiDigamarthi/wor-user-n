import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import React, { useCallback, useMemo, useRef, useState } from "react";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";
import ShowVehicle from "../../../Components/Dashboard/ShowPrices/ShowVehicle/ShowVehicle";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useShowPriceHook } from "./ShowPrice.hook.js";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine.jsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalUI from "../../../Utils/Modal/Modal.jsx";
import { COLORS } from "../../../Constants/colors.js";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar.jsx";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.4, screenHeight * 0.8]; // Adjust snap points
const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

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
    onTimeModalOpenCloseHandler,
    isTimeModalOpenClose,
    onHandleTimeValueHandler,
    normalDateFormat,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    profile,
    onNavigateAadharUploadUi,
    onMpinScreen,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
    handleChange,
    inputRefs,
    mPin,
    mPinError,
    navigation,
    isDateTimeData,
  } = useShowPriceHook();

  let shoRightIcons = false;
  let timeShow = true;

  const currentDate = new Date();

  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 7);

  // bottomsheet

  console.log(isDateTimeData);

  const bottomSheetRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(androidHeight[0]); // Initial map height
  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosHeight : androidHeight),
    []
  );

  const handleSheetChange = useCallback((index) => {
    let height = screenHeight * 0.95; // Default map height
    // console.log(index);
    if (index === 2) {
      height = screenHeight * 0.6; // Map height at middle snap point
    }
    setMapHeight(height);
  }, []);

  // console.log(profile);
  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Book Your Ride"
        onBack={() => navigation.goBack()}
      />
      <View style={[styles.mapContainer, { height: mapHeight }]}>
        <ShowPollyLine
          origin={pickUpCoordinated}
          destination={dropDetails?.location}
        />
      </View>
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
          <View style={styles.bottomSheetInner}>
            {/* this show pick drop card use show price screens also */}
            <ShowPickDropCard
              placeName={placeName}
              isInputShow={false}
              dropLocation={dropDetails?.name}
              shoRightIcons={shoRightIcons}
              timeShow={timeShow}
              onTimeModalOpenCloseHandler={onTimeModalOpenCloseHandler}
            />
            <View style={{ height: 10 }} />
            {!isDateTimeData && (
              <ShowVehicle
                image={require("../../../assets/images/scooty.png")}
                personCount={1}
                price={pricesInKM?.scooty}
                isSelected={selectedVehicle === "scooty"}
                onPress={() => handleVehiclePress("scooty")}
                vehicleType="Scooty"
              />
            )}

            <ShowVehicle
              image={require("../../../assets/images/car.png")}
              personCount={4}
              price={pricesInKM?.car}
              isSelected={selectedVehicle === "car"}
              onPress={() => handleVehiclePress("car")}
              vehicleType="Car"
            />
            {!isDateTimeData && (
              <ShowVehicle
                image={require("../../../assets/images/auto.png")}
                personCount={3}
                price={pricesInKM?.auto}
                isSelected={selectedVehicle === "auto"}
                onPress={() => handleVehiclePress("auto")}
                vehicleType="Auto"
              />
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
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
          title={
            selectedVehicle
              ? `Book ${selectedVehicle} ${
                  normalDateFormat && `@ ${normalDateFormat}`
                }`
              : `Book Ride ${normalDateFormat}`
          }
          onPress={onPlaceTheOrder}
          disabled={true}
          borderColor="#e02e88"
          borderWidth={1}
        />

        <DateTimePickerModal
          isVisible={isTimeModalOpenClose}
          mode="datetime"
          onConfirm={onHandleTimeValueHandler}
          onCancel={onTimeModalOpenCloseHandler}
          minimumDate={currentDate}
          maximumDate={maxDate}
        />
      </View>
      <ModalUI
        openCloseState={rideBookBeforeCheckMPinAddhar}
        closeModalFun={onChangeRideBookBeforeCheckPinAddharHandler}
      >
        {profile?.adhar === null && (
          <Pressable onPress={onNavigateAadharUploadUi}>
            <Text>
              Your not set Aadhar please set Aadhar first to book ride
            </Text>
          </Pressable>
        )}
        {!profile?.mpin && (
          <Pressable onPress={onMpinScreen}>
            <Text>Your not set MPIN please set M-pin first to book ride </Text>
          </Pressable>
        )}
      </ModalUI>
      <ModalUI
        openCloseState={isOpenEnterConfirmMPinModal}
        closeModalFun={onOpenIsEnterConfirmPinModal}
      >
        <View style={{ gap: 10 }}>
          <Text>Enter M-Pin</Text>
          {mPinError && <Text style={styles.error}>{mPinError}</Text>}
          <View style={styles.inputContainer}>
            {mPin.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.inputBox}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                ref={(el) => (inputRefs.current[index] = el)} // Assign refs to inputs
              />
            ))}
          </View>
        </View>
      </ModalUI>
    </View>
  );
};

export default ShowPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: "100%",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make sure the image covers the container
    borderRadius: 10,
  },

  scrollContainer: {
    paddingTop: 250,
    // backgroundColor: "red",
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
    height: 180,
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  inputBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: COLORS.border,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    elevation: 1,
  },
  error: {
    fontSize: 10,
    color: "red",
  },
});
