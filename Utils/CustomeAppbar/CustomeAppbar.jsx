import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Infopressicons from "../BottomSheet/Components/Infopressicons";
import ModalUI from "../Modal/Modal";
import { infoModalStyles } from "../../Components/InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../Components/InfoUi/OtpInfoUi";
import {
  bookYourRide,
  destinationScreen,
  donationScren,
  walletData,
} from "../../Components/InfoUi/data/infoData";
import { COLORS } from "../../Constants/colors";
const screenWidth = Dimensions.get("window").width;
const CustomeAppbar = ({
  onBack,
  title,
  navigationText,
  rightText,
  showRight,
  top = 45,
}) => {
  const navigation = useNavigation();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  let infoData;
  switch (title) {
    case "Designation":
      infoData = bookYourRide;
      break;
    case "Book Your Ride":
      infoData = destinationScreen;
      break;
    case "Wallet":
      infoData = walletData;
      break;
    case "Donation":
      infoData = donationScren;
      break;
    default:
      infoData = bookYourRide;
  }

  return (
    <View style={[styles.mainContainer, { top }]}>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity style={[styles.btn]} onPress={onBack}>
          <Ionicons name="chevron-back" size={30} color="#E02E88" />
        </TouchableOpacity>
      </View>

      <View style={[styles.textContainer]}>
        <View style={styles.textinnerCard}>
          <Text style={[styles.text]}>{title || "Title"}</Text>
          <Infopressicons onHandleOpenInfoModal={onHandleOpenInfoModal} />
        </View>
        {rightText && (
          <Pressable
            onPress={() => navigation.navigate(navigationText)}
            style={styles.rightIconCard}
          >
            <MaterialIcons name="support-agent" size={15} color="#e02e88" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: COLORS.subHeading,
              }}
            >
              {rightText}
            </Text>
          </Pressable>
        )}
      </View>
      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <OtpInfoUi mainTitle="Book Your Ride" data={infoData} />
      </ModalUI>
    </View>
  );
};

export default CustomeAppbar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderColor: "#FFE2E6",
    elevation: 1,
    borderRadius: 6,
    height: 50,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 10,
    zIndex: 30,
    backgroundColor: "#fff",
    position: "absolute",
    left: 10,
    width: screenWidth - 20,
    top: 45,
  },

  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "100%",
  },

  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    borderColor: "#FFE2E6",
    width: "88.6%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 30,
    paddingRight: 20,
    position: "relative",
    elevation: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "red",
  },
  textinnerCard: {
    flexDirection: "row",
    gap: 10,
    width: "67%",
    marginLeft: 5,
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "blue",
  },
  text: {
    color: "#302f2f",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    // width: "100%",
  },
  icon: {
    marginTop: 2,
  },
  rightIconCard: {
    // width: "35%",
    height: "60%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 7,
    // marginRight: 5,
    // backgroundColor: "red",
  },
});
