import { Image, StyleSheet, View } from "react-native";
import React from "react";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import Logo from "../../../Utils/Logo/Logo";
import BottomSheet from "../../../Utils/BottomSheet/BottomSheet";

const SignUp = () => {
  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Image
            source={require("../../../assets/images/undraw_profile_pic_re_iwgo 2.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <BottomSheet uiDisplay="signup" />
      </View>
    </AuthScreenLayout>
  );
};

export default SignUp;

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
