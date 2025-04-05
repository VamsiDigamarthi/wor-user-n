import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { fonts } from "../../../../fonts/Fonts";
import CustomBtn from "../../../../utiles/CustomBtn";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LogoutModal({ onOkPress, onCancelPress }) {
  return (
    <ModalUI
      // openCloseState={openDestinationModal}
      // closeModalFun={closeDestinationModal}
      // style={infoModalStyles.aadharModalStyles}
      // insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <AntDesign name="logout" size={40} color="#EA4C89" />
        <Text style={styles.heading}>Are You Sure Want to Logout?</Text>
        <Text style={styles.text}>
          You will need to log in again to access your account.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <CustomBtn
          title="Okay"
          onPress={onOkPress}
          width="45%"
          borderWidth={1}
        />
        <CustomBtn
          title="Cancel"
          onPress={onCancelPress}
          width="45%"
          btnBg={"#EA4C89"}
          btnColor={"#fff"}
        />
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 20,
    textAlign: "center",
  },

  subText: {
    fontFamily: fonts.robotoRegular,
    textAlign: "center",
    fontSize: 12,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    fontSize: 10,
  },
});
