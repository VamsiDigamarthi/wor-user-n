import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/colors";

const RatingFirstCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>How Your Rating</Text>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Calculated</Text>
        <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
          We ensure fairness and transparancey in everyrating
        </Text>
      </View>
      <View style={styles.right}>
        <Image
          source={require("../../../../assets/images/staticscreens/rating.png")}
          style={styles.rightImage}
        />
      </View>
    </View>
  );
};

export default RatingFirstCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    elevation: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-end",
    shadowColor: "red",
  },
  left: {
    gap: 5,
    width: "70%",
  },
  right: {
    width: "30%",
    position: "relative",
  },
  rightImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    top: -65,
    left: -5,
    right: 0,
    bottom: 0,
  },
});
