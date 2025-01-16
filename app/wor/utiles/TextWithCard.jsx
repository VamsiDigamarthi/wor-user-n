import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const TextWithCard = ({ title, subTitle, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default TextWithCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    elevation: 1,
    shadowColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.heading,
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.subHeading,
  },
});
