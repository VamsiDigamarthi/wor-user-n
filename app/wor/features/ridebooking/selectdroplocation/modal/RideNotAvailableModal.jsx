import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { Aishwarya } from "../../../../Images/Ride";
import { fonts } from "../../../../fonts/Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomBtn from "../../../../utiles/CustomBtn";

export default function RideNotAvailableModal() {
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
          <Text style={styles.heading}>Rides Not Available</Text>
        </View>
        <View style={{ width: "100%" }}>
          <Image source={Aishwarya} style={styles.img} />
        </View>

        <View style={styles.btnContainer}>
          <Text style={styles.text}>
            At this Moment, we are not offering services in this area
          </Text>
          <Text style={styles.text}>
            but we are planning as soon as possible
          </Text>
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
    fontFamily: fonts.robotoMedium,
    fontSize: 14,
    textAlign: "center",
  },

  img: {
    height: 180,
    width: 180,
    marginHorizontal: "auto",
    resizeMode: "contain",
  },
  verifyText: {
    color: "red",
  },
  btnContainer: {
    // flexDirection: "row",
    // width: "80%",

    marginTop: 30,
    // justifyContent: "space-between",
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
