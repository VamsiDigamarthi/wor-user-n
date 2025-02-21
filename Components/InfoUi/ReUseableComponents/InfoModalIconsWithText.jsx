import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";
import { fonts } from "../../../app/wor/fonts/Fonts";

const InfoModalIconsWithText = ({ headerText, suHeading }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontFamily:fonts.robotoSemiBold, color: COLORS.heading }}>
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
