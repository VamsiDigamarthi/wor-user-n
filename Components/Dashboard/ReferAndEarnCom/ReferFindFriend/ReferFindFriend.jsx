import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";

const { width: screenWidth } = Dimensions.get("window");

const ReferFindFriend = () => {
  return (
    <View style={styles.constainer}>
      <CustomBtn
        title="Find Friend to Refer"
        btnColor="#000"
        btnBg="white"
        borderWidth={1}
        borderColor="#e02e88"
      />

      <CustomBtn title="Refer Now" btnBg="#e02e88" btnColor="#fff" />
    </View>
  );
};

export default ReferFindFriend;

const styles = StyleSheet.create({
  constainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: screenWidth,
    backgroundColor: "#fff",
    paddingHorizontal: 26,
    paddingVertical: 15,
    gap: 20,
  },
});
