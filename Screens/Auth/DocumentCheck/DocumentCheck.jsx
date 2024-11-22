import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Logo from "../../../Utils/Logo/Logo";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import BottomSheet from "../../../Utils/BottomSheet/BottomSheet";
import DocumentRelatedCheck from "../../../Components/Auth/DocumentRelatedCheck/DocumentRelatedCheck";

const DocumentCheck = () => {
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Image
            source={require("../../../assets/images/Screenshot 2024-10-07 at 4.58.25 PM 3.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <DocumentRelatedCheck />
      </View>
    </AuthScreenLayout>
  );
};

export default DocumentCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
  image: {
    width: "70%",
    height: 200,
  },
});
