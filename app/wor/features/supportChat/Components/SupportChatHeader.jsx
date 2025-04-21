import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../../../Constants/colors";
import { BackIcon, SupportIcons } from "../../../Icons/Icons";
import { Ionicons } from "@expo/vector-icons";

const SupportChatHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.iconStyle}>
            <SupportIcons size={20} color="#fff" />
          </View>
        </Pressable>
        <Text
          style={{ fontSize: 17, fontWeight: "600", color: COLORS.heading }}
        >
          Wor Support
        </Text>
      </View>

      <Pressable onPress={() => Linking.openURL(`tel:9392296850`)}>
        <Ionicons size={22} color="#EA4C89" name="call" />
      </Pressable>
    </View>
  );
};

export default SupportChatHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 25,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
    justifyContent: "space-between",
  },
  iconStyle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e02e88",
  },
});
