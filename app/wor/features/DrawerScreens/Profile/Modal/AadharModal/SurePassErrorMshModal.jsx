import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import CustomBtn from "../../../../../utiles/CustomBtn";

const SurePassErrorMshModal = ({ openModal, closeModal }) => {
  return (
    <ModalUI
      openCloseState={openModal}
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          We apologize for the error in gender verification during Aadhaar
          verification.
        </Text>
        <View style={styles.imageCard}>
          <Image
            style={styles.image}
            source={require("../../../../../../../assets/aadhar-otp.png")}
          />
        </View>
        <Text style={styles.subHeading}>
          Gender verification ensures only female drivers and passengers,
          creating a safe and trusted platform.
        </Text>
        <Text style={styles.subHeading}>
          Please try again after 10 minutes or contact our support team for
          assistance.
        </Text>
        <Text style={styles.subHeading}>Thank you for your patience!</Text>
        <CustomBtn
          width="100%"
          onPress={closeModal}
          title="Continue"
          btnBg={"#EA4C89"}
          btnColor={"#fff"}
        />
      </View>
    </ModalUI>
  );
};

export default SurePassErrorMshModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 10,
    width: "100%",
  },
  imageCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    // backgroundColor: "red",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    // borderRadius: 50,
    // backgroundColor: "yellow",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 25,
  },
  subHeading: {
    fontSize: 12,
    color: "gray",
    lineHeight: 22,
  },
});
