import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const SignUpLocationTextCard = ({ onPress, mainPlace, subPlace }) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#f7e1ec",
          borderless: false,
        }}
        style={styles.pressableCard}
        onPress={onPress}
      >
        <View style={styles.first}>
          <Image
            style={styles.firstImage}
            source={require("../../../../../../assets/images/locationIcons/pin locator 2.png")}
          />
        </View>
        <View style={styles.second}>
          <Text style={styles.locText} numberOfLines={1}>
            {mainPlace}
          </Text>
          <Text style={styles.subLocText} numberOfLines={1}>
            {subPlace}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SignUpLocationTextCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pressableCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignItems: "center",
    position: "relative",
    // borderBottomWidth: 2,
    borderColor: "#fff",
    paddingVertical: 5,
  },
  first: {
    width: 35,
    height: 35,
    borderRadius: 30,
    // backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
  firstImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    // backgroundColor: "red",
  },

  second: {
    width: "90%",
    // gap: 2,
  },
  locText: {
    fontSize: 13,
    fontWeight: "600",
  },
  subLocText: {
    fontSize: 11,
    color: "#666666",
    overflow: "hidden", // Ensure any overflow is hidden
    whiteSpace: "nowrap",
  },
});
