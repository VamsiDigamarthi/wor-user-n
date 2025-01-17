import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { useCheckMPinModalHook } from "./CheckMPinModal.hook";
import { COLORS } from "../../../../../Constants/colors";

const CheckMPinModal = ({
  isOpenEnterConfirmMPinModal,
  onOpenIsEnterConfirmPinModal,
  dropDetails,
  selectedVehicle,
  time,
  ridePrice,
  selectedCard,
  parcelDetails,
  isPickLocationFromParc,
  isRideBookingScreen,
  pickUpPlace,
  newMarker,
  parcelPrice,
  howManyMans,
}) => {
  const { mPin, inputRefs, handleChange } = useCheckMPinModalHook({
    dropDetails,
    selectedVehicle,
    time,
    ridePrice,
    selectedCard,
    parcelDetails,
    isPickLocationFromParc,
    isRideBookingScreen,
    pickUpPlace,
    newMarker,
    onOpenIsEnterConfirmPinModal,
    parcelPrice,
    howManyMans,
  });

  return (
    <ModalUI
      openCloseState={isOpenEnterConfirmMPinModal}
      closeModalFun={onOpenIsEnterConfirmPinModal}
    >
      <View style={{ gap: 10 }}>
        <Text>Enter M-Pin</Text>
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
  );
};

export default CheckMPinModal;

const styles = StyleSheet.create({
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
});
