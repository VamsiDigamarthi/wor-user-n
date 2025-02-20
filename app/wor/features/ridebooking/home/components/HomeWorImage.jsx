import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../../../../fonts/Fonts";
import { colors } from "../../../../colors/colors";
import { woriderimg } from "../../../../Images/Home";

const HomeWorImage = () => {
  return (
    <ImageBackground source={woriderimg} style={styles.backImage}>
      <View style={styles.overlay}>
        <Text style={styles.goTitle}>#WoRider</Text>
        <Text style={styles.madeText}>Made at Nuhvin</Text>
        {/* <Text style={styles.madeText}>Crafted in Hyderbad</Text> */}
      </View>
    </ImageBackground>
  );
};

export default HomeWorImage;

const styles = StyleSheet.create({
  backImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  goTitle: {
    color: colors.maincolor,
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: fonts.robotoBold,
  },
  madeText: {
    color: "#000",
    fontFamily: fonts.robotoRegular,
  },
});
