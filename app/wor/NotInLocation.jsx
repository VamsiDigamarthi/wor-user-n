import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import locationnotfound from "../../assets/images/location-not-found.png";
import logo from "../../assets/images/logo.png";
import { fonts } from "./fonts/Fonts";
import CustomBtn from "./utiles/CustomBtn";

import { useCheckLocation } from "../../LocationCheck";
import ModalUI from "./utiles/Modal/Modal";
import { infoModalStyles } from "../../Components/InfoUi/Styles/InfoModalStyles";

export default function NotInLocation() {
  const { getUserLocation } = useCheckLocation();

  return (
    <ModalUI
      // openCloseState={openModal}
      //   closeModalFun={closeModal}
      modalStyle="slide"
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        {/* <Image source={logo} style={styles.logo} /> */}
        <Image source={locationnotfound} style={styles.image} />
        <Text style={styles.heading}>
          Looks like our service isn't available in your area just yet. We're
          working to bring it to you soon! Stay Tuned.
        </Text>

        <View style={{width:"100%" , marginTop:10}}>
          
          <CustomBtn
            onPress={() => getUserLocation()}
            btnBg={"#EA4C89"}
            title={"Refresh Location"}
            btnColor={"#FFF"}
            width="100%"
          />
        </View>
      </View>
    </ModalUI>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    width:"100%",
    gap:10
  },

  image: {
    height: 250,
    width: 250,
  },

  logo: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    position: "relative",
    // bottom: 170,
  },

  heading: {
    fontFamily: fonts.robotoMedium,
    fontSize: 20,
    textAlign: "center",
  },

  btnContainer: {
    width: "100%",
    // position: "absolute",
    // bottom: 20,
  },
});
