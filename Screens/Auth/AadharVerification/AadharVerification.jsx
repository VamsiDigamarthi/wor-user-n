import React from "react";
import { Image, View, StyleSheet } from "react-native";
import BottomSheet from "../../../Utils/BottomSheet/BottomSheet";
import Logo from "../../../Utils/Logo/Logo";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import AadharVerificationCom from "../../../Components/Auth/AadharVerificationCom/AadharVerificationCom";

const AadharVerification = () => {
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Image
            source={require("../../../assets/images/5052617 2.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <AadharVerificationCom />
      </View>
    </AuthScreenLayout>
  );
};

export default AadharVerification;

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
