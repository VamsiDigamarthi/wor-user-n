import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { CalendarIcons } from "../../../../Icons/Icons";
import CustomBtn from "../../../../utiles/CustomBtn";
import DatePicker from "react-native-date-picker";
import { formatToIndiaISO } from "../../../../../../Constants/calculateKM";
import { useNavigation } from "@react-navigation/native";
import { DateFormatModal } from "../Hooks/DateFormatInModal.hook";

const ShceduleOrderModal = ({ shceduleOrderModal, timerSetModalOpen }) => {
  const {
    setNewDate,
    normalDateFormat,
    minimumDate,
    maximumDate,
    onTimeModalOpenCloseHandler,
    isTimeModalOpenClose,
    date,
    isDateTimeData,
    setMinimumDate,
    setDate,
  } = DateFormatModal();

  return (
    <ModalUI
      openCloseState={shceduleOrderModal}
      closeModalFun={timerSetModalOpen}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <View style={styles.rowCard}>
          <View style={styles.rowCardWithGap}>
            <CalendarIcons size={25} color="gray" />
            <Text style={styles.heding}>Schedule</Text>
          </View>
        </View>
        <View style={styles.innerCard}>
          <Text style={styles.subTitle}>
            Choose your required pickup time upto 7 days in advance. No
            cancellation charges upto 15 mins before the booking
          </Text>
          <View style={styles.pickUpcard}>
            <Text style={styles.subTitle}>Your Pickup will be on</Text>
            <Text style={styles.largeHeading}>{normalDateFormat}</Text>
          </View>
          <View style={styles.dateTimeCard}>
            <DatePicker
              // modal //use this if you want in popup style instead of bottom modal
              open={isTimeModalOpenClose}
              date={date}
              theme="light"
              title="Select Future Time"
              cancelText="cancel"
              confirmText="confirmText"
              collapsable={true}
              minimumDate={minimumDate} // Dynamically set to the next valid time
              maximumDate={maximumDate}
              minuteInterval={15} // Enforce 15-minute intervals
              onDateChange={setDate}
              onCancel={onTimeModalOpenCloseHandler}
              style={styles.datePicker}
            />
          </View>
          <CustomBtn
            title="Confirm Pickup Time"
            btnBg="#e02e88"
            btnColor="#fff"
            // onPress={onPlaceTheOrder}
          />
        </View>
      </View>
    </ModalUI>
  );
};

export default ShceduleOrderModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  rowCardWithGap: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  heding: {
    fontSize: 20,
    fontWeight: "600",
  },
  innerCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  subTitle: {
    fontSize: 12,
    color: "gray",
    lineHeight: 20,
  },
  pickUpcard: {
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
  },
  largeHeading: {
    fontSize: 22,
    fontWeight: "600",
  },
  dateTimeCard: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  timeFirsText: {
    fontSize: 15,
    fontWeight: "600",
    color: "gray",
    width: "40%",
    // backgroundColor: "red",
  },
  secondTimeText: {
    fontSize: 15,
    color: "gray",
    fontWeight: "600",
  },

  datePicker: {
    // backgroundColor: "red",
    width: 350,
  },
});
