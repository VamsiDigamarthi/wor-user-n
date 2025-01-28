import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { fonts } from "../../../../fonts/Fonts";
export default function InviteBtn({ text, icon, onclick }) {
  return (
    <TouchableOpacity onPress={onclick} style={styles.btn}>
      {icon}
      <Text style={{ fontFamily:fonts.robotoSemiBold, fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderRadius: 20,
    borderWidth: 1,

    width: "100%",
    marginVertical: 10,
  },
});
