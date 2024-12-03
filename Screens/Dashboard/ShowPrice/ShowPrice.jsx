import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";
import ShowVehicle from "../../../Components/Dashboard/ShowPrices/ShowVehicle/ShowVehicle";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useShowPriceHook } from "./ShowPrice.hook.js";
import ShowPollyLine from "../../../Components/Dashboard/ShowPrices/ShowPollyLine/ShowPollyLine.jsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalUI from "../../../Utils/Modal/Modal.jsx";
import { COLORS } from "../../../Constants/colors.js";
import DatePicker from "react-native-date-picker";

console.log("Show");

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
  } = useShowPriceHook();

  let shoRightIcons = false;
  let timeShow = true;

  const currentDate = new Date();

  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 7);
  // console.log(profile);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());

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
    if (open) {
      calculateNextInterval(); // Recalculate when modal is opened
    }
  }, [open]); // Runs only when modal is toggled open

  // Trigger recalculation of minimumDate whenever the user picks a new time
  useEffect(() => {
    if (date) {
      calculateNextInterval(); // Recalculate when date is updated by user
    }
  }, [date]); // Runs whenever date state changes

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <ShowPollyLine
          origin={pickUpCoordinated}
          destination={dropDetails?.location}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
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
            <ShowVehicle
              image={require("../../../assets/images/scooty.png")}
              personCount={1}
              price={pricesInKM?.scooty}
              isSelected={selectedVehicle === "scooty"}
              onPress={() => handleVehiclePress("scooty")}
              vehicleType="Scooty"
            />
            <ShowVehicle
              image={require("../../../assets/images/car.png")}
              personCount={4}
              price={pricesInKM?.car}
              isSelected={selectedVehicle === "car"}
              onPress={() => handleVehiclePress("car")}
              vehicleType="Car"
            />
            <Button onPress={() => setOpen(!open)} title="open" />
            <ShowVehicle
              image={require("../../../assets/images/auto.png")}
              personCount={3}
              price={pricesInKM?.auto}
              isSelected={selectedVehicle === "auto"}
              onPress={() => handleVehiclePress("auto")}
              vehicleType="Auto"
            />
            {/* <ShowVehicle
              image={require("../../../assets/images/car.png")}
              personCount={4}
              price={pricesInKM?.car}
              isSelected={selectedVehicle === "car"}
              onPress={() => handleVehiclePress("car")}
              vehicleType="Car 1"
            /> */}
            {/* <ShowVehicle
              image={require("../../../assets/images/auto.png")}
              personCount={3}
              price={pricesInKM?.auto}
              isSelected={selectedVehicle === "auto"}
              onPress={() => handleVehiclePress("auto")}
              vehicleType="Car 2"
            /> */}
          </View>
        </View>
      </ScrollView>
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

        <DatePicker
          modal
          open={open}
          date={date}
          theme="light"
          title="Select Future Time"
          cancelText="Cancel"
          confirmText="Confirm"
          minimumDate={minimumDate} // Dynamically set to the next valid time
          maximumDate={new Date("2024-12-06")}
          minuteInterval={15} // Enforce 15-minute intervals
          onConfirm={(selectedDate) => {
            if (selectedDate.getTime() >= new Date().getTime()) {
              setDate(selectedDate);
            } else {
              Alert.alert("You selected a past time");
            }
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          style={styles.datePicker}
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
    gap: 0,
    // paddingTop: 12,
    position: "relative",
  },
  mapContainer: {
    width: "100%",
    // paddingHorizontal: 20,
    height: 350,
    position: "absolute",
    top: -80,
    left: 0,
    right: 0,
    zIndex: -1,
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
