import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthAppBar from "./AuthAppBar";
import InputBox from "../../../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../utiles/CustomBtn";
import { API } from "../../../../../Constants/url";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const handleCheck = () => {
    const url = "https://womenrider.nuhvin.com/privacypolicy"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const onNavigateTermsAndConditions = () => {
    const url = "https://womenrider.nuhvin.com/termsandconditions"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const [mobile, setMobile] = useState("");
  const [errorState, setErrorState] = useState({
    mobile: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigation = useNavigation();
  const handleMobileChange = (text) => {
    setMobile(text);
  };

  useEffect(() => {
    if (mobile?.length === 10) {
      setErrorState((prevState) => ({
        ...prevState,
        mobile: "",
      }));
    }
    if (mobile?.length === 10) {
      setErrorState({});
    }
  }, [mobile]);

  const loginValidation = (mobile) => {
    const errors = { mobile: "" };

    if (!mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    return errors.mobile ? errors : {};
  };

  const handleLogin = async () => {
    const error = loginValidation(mobile);
    setErrorState(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await API.post("/auth/send-otp", { mobile: mobile });
      setIsLoading(false);
      navigation.navigate("otp", {
        mobile: mobile,
        message:
          response.data?.name === "user not found"
            ? "WOR"
            : response.data?.name,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setApiError(error?.response?.data?.message);
    }
  };

  console.log("kiuygf", Object.keys(errorState));

  return (
    <View style={styles.container}>
      <AuthAppBar />
      <View style={styles.loginInnerCard}>
        <View style={{ width: "100%", gap: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            Enter Your Mobile Number For Verification
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}>
            This number is used for all ride related communication. you shall
            receive and otp for this
          </Text>
          <InputBox
            isIconsNotText={false}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Enter mobile number"
            label="Mobile Number"
            value={mobile}
            onChangeText={handleMobileChange}
            isValid={!errorState.mobile}
          />
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
            <Text style={{ fontSize: 13 }}>I agree to women rider's </Text>
            <TouchableOpacity onPress={onNavigateTermsAndConditions}>
              <Text style={{ fontSize: 13, color: "#e02e88" }}>
                Terms of Services
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13 }}> and </Text>
            <TouchableOpacity onPress={handleCheck}>
              <Text style={{ fontSize: 13, color: "#e02e88" }}>
                privacy Policy
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
            btnBg={Object.keys(errorState)?.length > 0 ? "#f7f7f7" : "#e02e88"}
            btnColor={Object.keys(errorState)?.length > 0 ? "#000" : "#fff"}
            onPress={handleLogin}
            isLoding={isLoading}
          />
        </View>
      </View>
      <View style={styles.nuhvinProduct}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>A Product From</Text>
        <Pressable onPress={openLink}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#e02e88" }}>
            Visit NuHvin
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
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
    height: 40,
    backgroundColor: "#b0b0b0",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 11,
  },
});
