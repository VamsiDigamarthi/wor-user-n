import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ParcelBtnCard = ({ children, hasSoftwareNavigationBar }) => {
  console.log("hasSoftwareNavigationBar", hasSoftwareNavigationBar);

  return (
    <View
      style={[styles.container, { bottom: hasSoftwareNavigationBar ? 30 : 0 }]}
    >
      {children}
    </View>
  );
};

export default ParcelBtnCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    left: 0,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    paddingHorizontal: 15,
    paddingVertical: 25,
    shadowColor: "#000",

    shadowOffset: { width: 0, height: -10 },
  },
});
