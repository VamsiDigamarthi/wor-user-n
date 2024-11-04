import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../Constants/url";

const LoginRelatedInput = () => {
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!mobile || mobile.length !== 10) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    try {
      console.log(mobile);
      await API.post("/auth/send-otp", { mobile: mobile });
      navigation.navigate("otp", {
        mobile: mobile,
      });
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <InputBox
        label="Mobile Number"
        isIconsNotText={false}
        keyboardType="numeric"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
        isValid={isValid}
      />
      <CustomCheckbox />
      {error && <Text style={styles.errorMsg}>{error}</Text>}
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleLogin}
      />
    </>
  );
};

export default LoginRelatedInput;

const styles = StyleSheet.create({
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
