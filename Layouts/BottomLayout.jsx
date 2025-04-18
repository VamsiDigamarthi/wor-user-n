import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  ImageBackground,
} from "react-native";
import React from "react";
import BottomSheetTitle from "../Utils/BottomSheet/Components/BottomSheetTitle/BottomSheetTitle";
import { useNavigation } from "@react-navigation/native";

const BottomLayout = ({
  title,
  subTitle,
  dynamicText,
  children,
  displayChangeNumber,
  onHandleOpenInfoModal,
}) => {
  const navigation = useNavigation();
  const onHandleChangeLogin = () => {
    navigation.navigate("login");
  };

  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    // <ImageBackground
    //   style={{
    //     width: "100%",
    //     height: "fit-content",
    //     borderTopLeftRadius: 24,
    //     borderTopRightRadius: 24,
    //     overflow: "hidden",
    //   }}
    //   source={require("../assets/images/bgImages/bgImage2.png")}
    // >
    <View style={styles.container}>
      <BottomSheetTitle
        title={title}
        onHandleOpenInfoModal={onHandleOpenInfoModal}
      />

      <View style={styles.sibTextCard}>
        <Text style={styles.subText}>{subTitle}</Text>
        {displayChangeNumber && (
          <Pressable onPress={onHandleChangeLogin} style={styles.changeNumber}>
            <Text style={{ fontSize: 11, color: "#EA4C89" }}>
              Change Number
            </Text>
          </Pressable>
        )}
      </View>
      {children}
      <View style={styles.loginBottomCard}>
        <Text style={styles.loginBottomCardText}>A Product From</Text>
        <Pressable onPress={openLink}>
          <Text style={styles.companyName}>Nuhvin</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BottomLayout;

const width = Dimensions.width;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "fit-content",
    paddingHorizontal: 26,
    paddingVertical: 12,
    justifyContent: "center",
    // alignItems: "center",
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff5f9",

    paddingBottom: 60,
    paddingTop: 20,
    // position: "relative",
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "#EA4C89",
    borderRadius: 100,
  },
  sibTextCard: {
    position: "relative",
    // backgroundColor: "red",
  },
  subText: {
    fontSize: 12,
    color: "#595959",
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
  loginBottomCard: {
    position: "absolute",
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(202, 193, 198, 0.38)",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 4,
  },

  loginBottomCardText: {
    color: "#2d2d2d",
    fontSize: 15,
  },

  companyName: {
    color: "#ff6600",
    textDecorationColor: "#000000",
    textDecorationLine: "underline",
  },
});
