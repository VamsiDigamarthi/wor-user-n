import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import livelocationimage from "../../../../../../../assets/images/sosimages/liveloc.png";

import sosimage from "../../../../../../../assets/images/sosimages/spam.png";
import callimage from "../../../../../../../assets/images/sosimages/call.png";
import policestation from "../../../../../../../assets/images/sosimages/policestation.png";

import { Linking } from "react-native";

const openDialer = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Dialer is not supported on this device");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export default function MainSelectingScreens({ onPress }) {
  return (
    <>
      <CustomImageComp
        image1={livelocationimage}
        image2={sosimage}
        text1="Safety"
        text2="SOS Helipline"
        click1={() => onPress("liveloc")}
        click2={() => openDialer("100")}
      />
      <CustomImageComp
        image1={sosimage}
        image2={sosimage}
        text1="Fake Calls"
        text2="WoR Support"
        click1={() => onPress("spam")}
        click2={() => onPress("chat")}
      />
      {/* <CustomImageComp
        image1={callimage}
        image2={policestation}
        text1="Women Helpline 1092"
        text2="Nearby Police Station"
        click1={() => onPress("main")}
        click2={() => onPress("police")}
      /> */}
    </>
  );
}

function CustomImageComp({ image1, image2, text1, text2, click1, click2 }) {
  return (
    <View style={styles.imageRow}>
      <TouchableOpacity onPress={click1} style={{ alignItems: "center" }}>
        <Image source={image1} style={styles.iconImage} />
        <Text style={{ width: "100%", fontSize: 10, textAlign: "center" }}>
          {text1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={click2} style={{ alignItems: "center" }}>
        <Image source={image2} style={styles.iconImage} />
        <Text style={{ width: "100%", fontSize: 10, textAlign: "center" }}>
          {text2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    width: "100%",
  },

  iconImage: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
});
