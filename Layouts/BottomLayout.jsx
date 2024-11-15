import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheetTitle from "../Utils/BottomSheet/Components/BottomSheetTitle/BottomSheetTitle";
import { useNavigation } from "@react-navigation/native";

const BottomLayout = ({
  title,
  subTitle,
  dynamicText,
  children,
  displayChangeNumber,
}) => {
  const navigation = useNavigation();
  const onHandleChangeLogin = () => {
    navigation.navigate("login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <BottomSheetTitle title={title} />

      <View style={styles.sibTextCard}>
        <Text style={styles.subText}>{subTitle}</Text>
        {displayChangeNumber && (
          <Pressable onPress={onHandleChangeLogin} style={styles.changeNumber}>
            <Text style={{ fontSize: 11, color: "#E02e88" }}>
              Change Number
            </Text>
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
};

export default BottomLayout;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    paddingHorizontal: 26,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
    paddingBottom: 60,
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#E02E88",
    borderRadius: 100,
  },
  sibTextCard: {
    position: "relative",
    // backgroundColor: "red",
  },
  subText: {
    fontSize: 12,
    color: "gray",
    lineHeight: 17,
  },
  changeNumber: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  changeNumberText: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
