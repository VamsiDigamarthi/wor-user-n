import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { ladyGlassesAnime } from "../../../Images/Ride";
import { fonts } from "../../../fonts/Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomBtn from "../../../utiles/CustomBtn";

export default function AadharNotVerifiedModal() {
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
          <Text style={styles.heading}>Verify Your Gender Identity</Text>
          <Text style={styles.text}>
            MPIN is a secure 4-digit code for safe account access and ride
            protection.
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Image source={ladyGlassesAnime} style={styles.img} />
          <View style={styles.iconContainer}>
            <AntDesign name="warning" size={15} color="red" />
            <Text style={[styles.text, styles.verifyText]}>
              Verify your gender identity
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <CustomBtn
            title={"Cancel"}
            borderColor={"#e0e0e0"}
            borderWidth={1}
            btnBg={"#fff"}
            btnColor={"#EA4C89"}
            width="45%"
          />
          <CustomBtn
            title={"Verify now"}
            btnBg={"#EA4C89"}
            btnColor={"#fff"}
            width="45%"
          />
        </View>
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // paddingHorizontal: 6,
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
