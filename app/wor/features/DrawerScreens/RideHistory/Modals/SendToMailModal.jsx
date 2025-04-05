import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import MailImg from "../../../../../../assets/MailIcon.png";
import CustomBtn from "../../../../utiles/CustomBtn";

export default function SendToMailModal({ closeModal }) {
  return (
    <ModalUI
      closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Image source={MailImg} style={styles.image} />
        <Text style={styles.text}>Invoice Sent to Mail</Text>
        <Text style={{ textAlign: "center" }}>
          Please check your registered email for the invoice details.
        </Text>
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

  text: {
    fontWeight: "600",
    fontSize: 20,
  },
});
