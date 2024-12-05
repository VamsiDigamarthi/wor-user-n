import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import Logo from "../../../Utils/Logo/Logo";
import BottomSheet from "../../../Utils/BottomSheet/BottomSheet";
import LoginRelatedInput from "../../../Components/Auth/Login/Login";
// import Logo from "../components/logo";
// import BottomSheet from "../components/BottomSheet/BottomSheet";

export default function Login() {
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
        <LoginRelatedInput />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginTop:20
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
    height:"50%"
  },
  image: {
    width: "80%",
  },
});
