import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import alreadyVerifiedImage from "../../../../../../../assets/genderVerified.png";
import CustomBtn from "../../../../../utiles/CustomBtn";

export default function AlreadyVerifiedModal({ closeModal }) {
  return (
    <ModalUI
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Image source={alreadyVerifiedImage} style={styles.image} />
        <Text>Gender Identity Already Verified</Text>
        <View style={{ width: "100%" }}>
          <CustomBtn
            onPress={closeModal}
            btnBg={"#EA4C89"}
            btnColor={"#FFF"}
            title={"OKAY"}
            width="100%"
          />
        </View>
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },

  image: {
    height: 100,
    resizeMode: "contain",
  },
});
