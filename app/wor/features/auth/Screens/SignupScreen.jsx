import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import AuthAppBar from "./AuthAppBar";
import CustomBtn from "../../../utiles/CustomBtn";
import Input from "../../../utiles/Input";
import AProductFromNuhvin from "../Components/AProductFromNuhvin";
import SignUpLocationTextCard from "../Components/SignUpLocationTextCard";
import { useSignupForm } from "../Hooks/useSignupForm.hook";
import { useRoute } from "@react-navigation/native";
import { fonts } from "../../../fonts/Fonts";

const SignupScreen = () => {
  const { mobile } = useRoute().params || {};

  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleNavigateToOTP,
  } = useSignupForm({ mobile });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <AuthAppBar faqs="Signup" isLoginScreen={false} />
          <View style={styles.loginInnerCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Text style={{ fontSize: 13, color: "gray", fontFamily:fonts.robotoRegular }}>
                Please Fill Your
              </Text>
              <Text style={{ fontSize: 22, fontFamily:fonts.robotoSemiBold}}>
                Basic Information
              </Text>

              <Input
                label={"Full Name *"}
                icon="person-outline"
                placeholder="Enter Your Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                isValid={!errors?.name}
              />

              <Input
                label={errors?.email ? errors?.email : "Email "}
                icon="mail-outline"
                placeholder="Enter your email address"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                isValid={!errors?.email}
              />

              <Input
                label="Referral Code (optional)"
                icon="contract"
                placeholder="Enter Referral Code"
                value={formData.referalCode}
                onChangeText={(value) =>
                  handleInputChange("referalCode", value)
                }
              />
            </View>
          </View>

          <View style={{ gap: 30, height: 100, backgroundColor: "#fff", alignItems:"center" }}>
            <CustomBtn
              title="continue"
              btnBg={formData.name ? "#EA4C89" : "#f7f7f7"}
              btnColor={formData.name ? "#FFF" : "#EA4C89"}
              onPress={handleNavigateToOTP}
              width="95%"
              isLoading={isLoading}
            />
            <AProductFromNuhvin bottom={-20} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  loginInnerCard: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  googleNearMapLocationCard: {
    position: "relative",
    zIndex: 6,
    height: 60,
    marginBottom: 15,
  },
  nearAddress: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    elevation: 10,
  },
});
