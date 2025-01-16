import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../../../Constants/colors";
import { Entypo } from "@expo/vector-icons";
const RatingSliderCard = ({ title, subtitle, icon }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ffe2e6",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Entypo name={icon} color="#e02e88" size={20} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default RatingSliderCard;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 10,
    borderRadius: 10,
    gap: 5,
    elevation: 1,
    shadowColor: "red",
    marginRight: 10,
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
