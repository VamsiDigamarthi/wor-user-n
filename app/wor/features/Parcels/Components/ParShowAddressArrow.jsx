import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ArrowDonwIcons, ArrowUpIcons } from "../../../Icons/Icons";
import { COLORS } from "../../../../../Constants/colors";

const ParShowAddressArrow = ({
  onShowHideSavedAddress,
  showHideSavedAddress,
}) => {
  return (
    <Pressable onPress={onShowHideSavedAddress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "600" }}>Saved Adress</Text>
        {showHideSavedAddress ? (
          <ArrowDonwIcons size={30} color={COLORS.height} />
        ) : (
          <ArrowUpIcons size={30} color={COLORS.height} />
        )}
      </View>
    </Pressable>
  );
};

export default ParShowAddressArrow;

const styles = StyleSheet.create({});
