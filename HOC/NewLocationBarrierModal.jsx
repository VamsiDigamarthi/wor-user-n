import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../app/wor/utiles/Modal/Modal";
import { infoModalStyles } from "../Components/InfoUi/Styles/InfoModalStyles";

const NewLocationBarrierModal = ({
  handleCloseModal,
  isOpenLocationBarrierModal,
}) => {
  return (
    <ModalUI
      openCloseState={isOpenLocationBarrierModal}
      closeModalFun={handleCloseModal}
      modalStyle="slide"
      closebtn={false}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Available Rides</Text>
        <View style={styles.imgCard}>
          <Image
            style={{ width: 250, height: 250, resizeMode: "contain" }}
            source={require("../assets/location-barrier.png")}
          />
        </View>
        <Text style={styles.subHeading}>
          Currently, we are not servicing your area, but we plan to expand to
          more locations soons
        </Text>
      </View>
    </ModalUI>
  );
};

export default NewLocationBarrierModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 35,
    gap: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  imgCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subHeading: {
    textAlign: "center",
    lineHeight: 22,
    fontSize: 14,
    fontWeight: "600",
  },
});
