import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthAppBar from "./AuthAppBar";
import CustomBtn from "../../../utiles/CustomBtn";
import { useLoginHook } from "../Hooks/Login.hook";
import Input from "../../../utiles/Input";
import { fonts } from "../../../fonts/Fonts";

const LoginScreen = () => {
  const {
    handleLogin,
    mobile,
    handleMobileChange,
    handleCheck,
    onNavigateTermsAndConditions,
    openLink,
    errorState,
    isLoading,
    apiError,
  } = useLoginHook();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containers}>
          <AuthAppBar />
          <View style={styles.loginInnerCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Text style={styles.heading}>
                Enter Your Mobile Number For Verification
              </Text>
              <Text style={styles.subHeading}>
                This number will be used for all ride-related communication. You
                will receive an OTP via SMS.
              </Text>
              <Input
                isIconsNotText={false}
                keyboardType="numeric"
                maxLength={10}
                label="Mobile Number"
                value={mobile}
                onChangeText={handleMobileChange}
              />
              {errorState?.mobile?.length > 0 && (
                <Text style={{ fontSize: 10, color: "red", marginTop: -8 }}>
                  {errorState?.mobile}
                </Text>
              )}
            </View>
            <View
              style={{
                width: "100%",
                gap: 10,
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 11 }}>I agree to Women Rider's </Text>
                <TouchableOpacity onPress={onNavigateTermsAndConditions}>
                  <Text style={{ fontSize: 11, color: "#0597ff" }}>
                    Terms of Services
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 11 }}> and </Text>
                <TouchableOpacity onPress={handleCheck}>
                  <Text style={{ fontSize: 11, color: "#0597ff" }}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
              {apiError && (
                <View style={styles.errorCard}>
                  <Text style={styles.errorMsg}>{apiError}</Text>
                </View>
              )}
              <CustomBtn
                title="Continue"
                btnBg={
                  Object.keys(errorState)?.length > 0 ? "#f7f7f7" : "#EA4C89"
                }
                btnColor={Object.keys(errorState)?.length > 0 ? "#000" : "#fff"}
                onPress={handleLogin}
                isLoding={isLoading}
                width="100%"
                height={55}
              />
            </View>
          </View>
          <View
            style={[
              styles.nuhvinProduct,
              { paddingHorizontal: Platform.OS === "ios" && 30 },
            ]}
          >
            <Text style={styles.linkText}>A Product From</Text>
            <Pressable onPress={openLink}>
              <Text style={[styles.linkText, { color: "#FF6600" }]}>
                Nuhvin
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    // backgroundColor: "blue",
  },
  containers: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    // backgroundColor: "red",
  },
  loginInnerCard: {
    // width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  nuhvinProduct: {
    position: "absolute",
    width: "100%",
    height: 50,
    // backgroundColor: "#f7f7f7",
    bottom: 10,
    left: 0,
    zIndex: 10000,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 50,
    paddingLeft: 30,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 11,
  },

  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 24,
  },
  subHeading: {
    fontSize: 13,
    color: "gray",
    fontFamily: fonts.robotoRegular,
    lineHeight: 21,
  },
  linkText: { fontSize: 14, fontFamily: fonts.robotoRegular },
});
