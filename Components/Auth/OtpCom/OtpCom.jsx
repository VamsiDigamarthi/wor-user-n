import { StyleSheet, Text, TextInput, View } from "react-native";

import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOtpComHook } from "./OtpCom.hook";
import { useEffect, useState } from "react";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { API } from "../../../Constants/url";
import BottomLayout from "../../../Layouts/BottomLayout";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/Features/Auth/LoginSlice";

const OtpRelatedInput = ({ btnShow = true }) => {
  const { otp, handleChange, handleKeyPress, inputs } = useOtpComHook();

  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { mobile, termsAndCondition, message } = route.params;

  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (otp[5]?.length >= 0) {
      setOtpError("");
    }
  }, [otp]);

  const justLog = async () => {
    console.log(otp);
    if (otp[5]?.length <= 0) {
      setOtpError("Please enter OTP");
      return;
    }
    try {
      const response = await API.post("/auth/verify-otp", {
        mobile,
        otp: otp.join(""),
        termsAndCondition: termsAndCondition,
      });

      if (response.data.token) {
        console.log(response.data.token);
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        dispatch(setToken(response.data.token));
        // navigation.navigate("AuthenticatedStack");
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // Ensures the specified route is the only route in the stack
            routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
          })
        );
      }
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message === "Invalid OTP") {
        setOtpError("Invalid Otp");
      } else if (error.response?.data?.message === "User does not exist") {
        console.log("navigating");

        navigation.navigate("signup", { mobile });
      }
    }
  };

  return (
    <BottomLayout
      title={`Welcom Back ${message}`}
      subTitle={`Please Enter the 6-digit code sent to your registered number +91 ${mobile.slice(
        0,
        2
      )}****${mobile.slice(6)}.`}
      displayChangeNumber={true}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(input) => (inputs.current[index] = input)} // Store refs for each input
              maxLength={1}
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  borderColor: value ? "#E02E88" : "#A9A9A9", // Change to pink if filled, else light gray
                },
              ]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)} // Detect backspace
              value={value}
              textAlign="center" // Ensure text is centered
              onFocus={() => {
                inputs.current[index].setNativeProps({
                  style: { borderColor: "#E02E88" }, // Change border color to pink on focus
                });
              }}
              onBlur={() => {
                inputs.current[index].setNativeProps({
                  style: { borderColor: value ? "#E02E88" : "#A9A9A9" }, // Revert based on value
                });
              }}
            />
          ))}
        </View>
        <View style={styles.resentOtpCard}>
          <Text style={{ color: "#E02E88", fontSize: 13 }}>Resend Otp</Text>
        </View>
        {otpError && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{otpError}</Text>
          </View>
        )}
        {btnShow && (
          <CustomBtn
            title="continue"
            btnBg={otp[5]?.length <= 0 ? "#fdfdfd" : "#e02e88"}
            btnColor={otp[5]?.length <= 0 ? "#e02e88" : "#fff"}
            onPress={justLog}
            width="100%"
          />
        )}
      </View>
    </BottomLayout>
  );
};

export default OtpRelatedInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  input: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 25, // Fully rounded input
    // borderWidth: 1,
    textAlign: "center", // Center the text
    fontSize: 18, // Adjust font size
    color: "#000000",
    elevation: 2,
  },
  resentOtpCard: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
