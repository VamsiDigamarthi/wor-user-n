import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomRadioBtn from "./CustomRadioBtn";
import { CreditCard } from "../../../../Images/Payment";

export default function CommonCard({
  title = "Credit / Debit Cards",
  icon,
  setSelected,
  selected,
}) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {icon}
        <Text>{title}</Text>
      </View>
      <CustomRadioBtn onPress={setSelected} selected={selected} />
    </View>
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
});
