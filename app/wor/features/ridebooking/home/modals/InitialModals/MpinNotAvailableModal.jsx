import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { shield } from "../../../../../Images/Ride";
import { fonts } from "../../../../../fonts/Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDisplayMPinModal } from "../../redux/initialModals";

export default function MpinNotAvailableModal() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isDisplayMPinModal } = useSelector((state) => state.initialModals);

  const closeAadharModal = () => {
    dispatch(setDisplayMPinModal(false));
  };

  const navigateMPinVerificationScreen = () => {
    navigation.navigate("SetNewMpin");
  };
  return (
    <ModalUI
      modalStyle="slide"
      openCloseState={isDisplayMPinModal}
      closeModalFun={closeAadharModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={[infoModalStyles.insideCardStyle]}
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
        <View style={{ gap: 10, marginVertical: 20, paddingVertical: 20 }}>
          <Image source={shield} style={styles.img} />
        </View>

        <CustomBtn
          title={"Verify Now"}
          btnBg={"#EA4C89"}
          btnColor={"#fff"}
          width="100%"
          onPress={navigateMPinVerificationScreen}
        />
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    // backgroundColor: "red",
    // flex: 1,
    width: "100%",
  },
  heading: {
    fontFamily: fonts.robotoBold,
    fontSize: 18,
  },
  text: {
    fontFamily: fonts.robotoRegular,
    fontSize: 12,
    lineHeight: 20,
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
