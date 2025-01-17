import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NavigateMPinScreenModal = ({
  rideBookBeforeCheckMPinAddhar,
  onChangeRideBookBeforeCheckPinAddharHandler,
}) => {
  const { profile } = useSelector((state) => state.profileSlice);

  const navigation = useNavigation();
  const onNavigateAadharUploadUi = () => {
    navigation.navigate("DashBoardAadharCard", {
      isPriceScreen: true,
    });
  };

  const onMpinScreen = () => {
    navigation.navigate("DashBoardMPinCard", {
      isPriceScreen: true,
    });
  };

  return (
    <ModalUI
      openCloseState={rideBookBeforeCheckMPinAddhar}
      closeModalFun={onChangeRideBookBeforeCheckPinAddharHandler}
    >
      {profile?.adhar === null && (
        <Pressable onPress={onNavigateAadharUploadUi}>
          <Text>Your not set Aadhar please set Aadhar first to book ride</Text>
        </Pressable>
      )}
      {!profile?.mpin && (
        <Pressable onPress={onMpinScreen}>
          <Text>Your not set MPIN please set M-pin first to book ride </Text>
        </Pressable>
      )}
    </ModalUI>
  );
};

export default NavigateMPinScreenModal;

const styles = StyleSheet.create({});
