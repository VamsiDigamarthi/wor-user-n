import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomRadioBtn from "./CustomRadioBtn";
import { CreditCard } from "../../../../Images/Payment";
import { fonts } from "../../../../fonts/Fonts";

export default function CommonCard({
  title = "Credit / Debit Cards",
  icon,
  setSelected,
  selected,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={setSelected}
      selected={selected}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {icon && icon}
        <Text style={styles.text}>{title}</Text>
      </View>
      <CustomRadioBtn onPress={setSelected} selected={selected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
  },

  text: {
    fontFamily: fonts.robotoSemiBold,
  },
});
