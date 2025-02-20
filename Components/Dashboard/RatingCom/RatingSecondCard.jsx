import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";
import { Entypo } from "@expo/vector-icons";
const RatingSecondCard = ({ avgRating }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 40 }}>
        <Entypo name="star" color="#EA4C89" size={30} />
      </View>
      <View style={{ width: "82%", gap: 2 }}>
        <Text style={{ fontWeight: "600", fontSize: 17 }}>{avgRating}/5</Text>
        <Text style={{ fontSize: 12, color: COLORS.subHeading }}>
          We use weighted average of all reviews submittedby users
        </Text>
      </View>
    </View>
  );
};

export default RatingSecondCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 10,
    borderRadius: 10,
    gap: 5,
    elevation: 1,
  },
});
