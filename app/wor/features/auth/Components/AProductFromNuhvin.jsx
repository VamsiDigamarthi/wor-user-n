import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { fonts } from "../../../fonts/Fonts";

const AProductFromNuhvin = ({ bottom = 0 }) => {
  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <View style={[styles.nuhvinProduct, { bottom: bottom }]}>
      <Text style={{ fontSize: 14, fontFamily: fonts.robotoMedium }}>
        A Product From
      </Text>
      <Pressable onPress={openLink}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.robotoMedium,
            color: "#ff6600",
          }}
        >
          Nuhvin
        </Text>
      </Pressable>
    </View>
  );
};

export default AProductFromNuhvin;

const styles = StyleSheet.create({
  nuhvinProduct: {
    position: "absolute",
    width: "100%",
    height: 50,
    // backgroundColor: "#f7f7f7",
    // bottom: 0,
    left: 0,
    zIndex: 10000,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 10,
  },
});
