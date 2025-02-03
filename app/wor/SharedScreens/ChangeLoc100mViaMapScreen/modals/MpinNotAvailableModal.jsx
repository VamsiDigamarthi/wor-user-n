import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { shield } from "../../../Images/Ride";
import { fonts } from "../../../fonts/Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomBtn from "../../../utiles/CustomBtn";

export default function MpinNotAvailableModal() {
  return (
    <ModalUI
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={[
        infoModalStyles.insideCardStyle,
        // { backgroundColor: "blue", paddingHorizontal: 8 },
      ]}
      //   closeModalFun={onChangeRideBookBeforeCheckPinAddharHandler}
      closebtn={false}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Set M-Pin</Text>
          <Text style={styles.text}>
            MPIN is a secure 4-digit code for safe account access and ride
            protection.
          </Text>
        </View>
        <View style={{ gap: 10, marginVertical: 20 }}>
          <Image source={shield} style={styles.img} />
        </View>

        <CustomBtn
          title={"Verify now"}
          btnBg={"#EA4C89"}
          btnColor={"#fff"}
          width="100%"
        />
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: "center",
    // backgroundColor: "red",
    // flex: 1,
    width: "100%",
  },
  heading: {
    fontFamily: fonts.robotoBold,
    fontSize: 14,
  },
  text: {
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
  },

  img: {
    height: 130,
    width: 130,
    marginHorizontal: "auto",
  },
  verifyText: {
    color: "red",
  },
  btnContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 30,
    justifyContent: "space-between",
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
