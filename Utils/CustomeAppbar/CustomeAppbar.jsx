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
  isTimer = false,
  appTitCenStyles,
  appTitCenWidth,
  vicinity,
  timerFunction,
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
    <View style={styles.superContainer}>
      <View style={[styles.mainContainer]}>
        <View style={[styles.btnContainer]}>
          <TouchableOpacity style={[styles.btn]} onPress={onBack}>
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={[styles.textContainer]}>
          <View style={[styles.textinnerCard, appTitCenStyles]}>
            <View
              style={[
                { flexDirection: "row", gap: 5, alignItems: "center" },
                appTitCenWidth,
              ]}
            >
              <Text
                numberOfLines={2}
                style={[
                  styles.text,
                  vicinity && { fontSize: 13, fontWeight: "600" },
                ]}
              >
                {title || "Title"}
              </Text>
              {vicinity ? (
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 10 }}
                  ellipsizeMode="tail"
                >
                  {vicinity}
                </Text>
              ) : (
                <Infopressicons onHandleOpenInfoModal={onHandleOpenInfoModal} />
              )}
            </View>
          </View>
          {isTimer ? (
            <Pressable onPress={timerFunction}>
              <View
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons size={24} name="timer" color="#f98600" />
                <Text style={{ fontSize: 12, color: "gray" }}>Now</Text>
              </View>
            </Pressable>
          ) : (
            <>
              {rightText && (
                <Pressable
                  onPress={() => navigation.navigate(navigationText)}
                  style={styles.rightIconCard}
                >
                  <MaterialIcons
                    name="support-agent"
                    size={15}
                    color="#e02e88"
                  />
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
            </>
          )}
        </View>
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
  superContainer: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#FFE2E6",
    // elevation: 1,
    borderRadius: 6,
    height: 50,
    zIndex: 30,
    backgroundColor: "#fff",
    width: "100%",
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
    width: "85%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    // borderRadius: 30,
    paddingRight: 20,
    position: "relative",
    // elevation: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "red",
  },
  textinnerCard: {
    flexDirection: "row",
    gap: 10,
    width: "70%",
    marginLeft: 5,
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "blue",
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // width: "100%",
  },
  icon: {
    marginTop: 2,
  },
  rightIconCard: {
    // width: "35%",
    height: "60%",
    // borderWidth: 1,
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
