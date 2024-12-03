import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";

const InfoModalIconsWithText = ({ headerText, suHeading }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "600", color: COLORS.heading }}>
        {headerText}
      </Text>
    </View>
  );
};

export default InfoModalIconsWithText;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 5,
  },
});
