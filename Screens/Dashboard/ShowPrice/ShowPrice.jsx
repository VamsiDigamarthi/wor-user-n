import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";
import ShowVehicle from "../../../Components/Dashboard/ShowPrices/ShowVehicle/ShowVehicle";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useShowPriceHook } from "./ShowPrice.hook.js";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine.jsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalUI from "../../../Utils/Modal/Modal.jsx";
import { COLORS } from "../../../Constants/colors.js";

import DatePicker from "react-native-date-picker";

import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar.jsx";
import CustomBottomSheet from "../../../Utils/BottomSheetForMap/BottomSheet.jsx";
import MainSelectingScreens from "../Home/BottosheetScreens/MainSelectingScreens.jsx";
import LiveLocation from "../Home/BottosheetScreens/LiveLocation.jsx";
import SpamCallSheet from "../Home/BottosheetScreens/SpamCallSheet.jsx";
import PoliceStatons from "../Home/BottosheetScreens/PoliceStatons.jsx";
import ChatWithCaptain from "../Home/BottosheetScreens/components/ChatUi/ChatWithCaptain.jsx";

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

  const [date, setDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());

  const maximumDate = new Date(minimumDate);
  maximumDate.setDate(minimumDate.getDate() + 6);

  const calculateNextInterval = () => {
    const now = date; // Use the selected date from state
    let currentMinutes = now.getMinutes();
    console.log(currentMinutes);

    let nextTime = new Date(now); // Start with the selected date

    // Apply minute intervals based on the current time
    if (currentMinutes === 0) {
      nextTime.setMinutes(15);
    } else if (currentMinutes >= 1 && currentMinutes <= 15) {
      nextTime.setMinutes(30);
    } else if (currentMinutes >= 16 && currentMinutes <= 30) {
      nextTime.setMinutes(45);
    } else if (currentMinutes >= 31 && currentMinutes <= 45) {
      nextTime.setHours(nextTime.getHours() + 1);
      nextTime.setMinutes(0);
    } else if (currentMinutes >= 46 && currentMinutes <= 59) {
      nextTime.setHours(nextTime.getHours() + 1);
      nextTime.setMinutes(15);
    }

    nextTime.setSeconds(0);
    console.log(nextTime.getHours());

    setMinimumDate(nextTime); // Set the minimum date based on calculated time
  };
  useEffect(() => {
    if (isTimeModalOpenClose) {
      calculateNextInterval(); // Recalculate when modal is opened
    }
  }, [isTimeModalOpenClose]); // Runs only when modal is toggled open

  // Trigger recalculation of minimumDate whenever the user picks a new time
  useEffect(() => {
    if (date) {
      calculateNextInterval(); // Recalculate when date is updated by user
    }
  }, [date]); // Runs whenever date state changes

  // 3 btn related stuf
  const bottomSheetRefSOS = useRef(null);
  const handleOpenSafetySheet = useCallback(() => {
    bottomSheetRefSOS.current?.present();
  }, []);

  const [screen, setScreen] = useState("main");
  const changeScreen = (screen) => {
    setScreen(screen);
  };

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Book Your Ride"
        onBack={() => navigation.goBack()}

        rightText="Support"
        navigationText="FaqHome"

      />
      <View style={[styles.mapContainer, { height: mapHeight }]}>
        <ShowPollyLine
          origin={pickUpCoordinated}
          destination={dropDetails?.location}
          height={mapHeight}
          handleOpenSafetySheet={handleOpenSafetySheet} // this function open safety bottomsheet
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
        {/* <CustomBottomSheet
          bottomSheetRef={bottomSheetRefSOS}
          bgcolor="#fff5f9"
          snapPoints={["50%", "70%"]}
          manualCloseSheet={() => setScreen("main")}
        >
          {screen === "main" && <MainSelectingScreens onPress={changeScreen} />}
          {screen === "liveloc" && <LiveLocation onPress={changeScreen} />}
          {screen === "spam" && <SpamCallSheet onPress={changeScreen} />}
          {screen === "police" && <PoliceStatons onPress={changeScreen} />}
          {screen === "chat" && <ChatWithCaptain onPress={changeScreen} />}
        </CustomBottomSheet> */}
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
      <DatePicker
        modal
        open={isTimeModalOpenClose}
        date={date}
        theme="light"
        title="Select Future Time"
        cancelText="Cancel"
        confirmText="Confirm"
        minimumDate={minimumDate} // Dynamically set to the next valid time
        maximumDate={maximumDate}
        minuteInterval={15} // Enforce 15-minute intervals
        onConfirm={(selectedDate) => {
          if (selectedDate.getTime() >= new Date().getTime()) {
            onHandleTimeValueHandler(selectedDate);
          } else {
            Alert.alert("You selected a past time");
          }
          // setOpen(false);
        }}
        onCancel={onTimeModalOpenCloseHandler}
        style={styles.datePicker}
      />
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

  datePicker: {
    backgroundColor: "lightblue", // Custom background color for the date picker modal
    borderRadius: 10, // Add rounded corners
    width: 300, // Adjust width of the date picker modal
    padding: 10, // Add padding inside the modal
  },
});
