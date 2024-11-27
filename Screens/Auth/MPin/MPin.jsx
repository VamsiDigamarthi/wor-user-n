import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import Logo from "../../../Utils/Logo/Logo";
import MPinRelatedUi from "../../../Components/Auth/MPinCom/MPinRelatedUi";

const MPin = () => {
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Image
            source={require("../../../assets/images/undraw_two_factor_authentication_namy 2.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <MPinRelatedUi />
      </View>
    </AuthScreenLayout>
  );
};

export default MPin;

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
    padding: 16,
  },
  image: {
    width: "80%",
  },
});
