import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomRadioBtn from "./CustomRadioBtn";
import { CreditCard } from "../../../../Images/Payment";
import { fonts } from "../../../../fonts/Fonts";
import { useSelector } from "react-redux";

export default function CommonCard({
  title = "Credit / Debit Cards",
  icon,
  setSelected,
  selected,
  disable = false,
}) {
  const { profile } = useSelector((state) => state.profileSlice);

  return (
    <TouchableOpacity
      style={[styles.card, disable && styles.disableStyle]}
      onPress={setSelected}
      selected={selected}
    >
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        {icon && icon}
        <View>
          <Text style={styles.text}>{title}</Text>
          {title === "Wallet" && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: disable && "red",
              }}
            >
              {`${disable ? "low balance :" : ""} ₹ ${profile?.walletBalance}`}
            </Text>
          )}
        </View>
      </View>
      {!disable && <CustomRadioBtn onPress={setSelected} selected={selected} />}
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
  disableStyle: {
    backgroundColor: "#f2f2f2",
  },
});
