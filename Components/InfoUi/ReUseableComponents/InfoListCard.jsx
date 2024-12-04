import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const InfoListCard = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#e02e88",
          borderRadius: 5,
          marginTop: 7,
        }}
      ></Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: COLORS.subHeading,
          // lineHeight: 22,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default InfoListCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
