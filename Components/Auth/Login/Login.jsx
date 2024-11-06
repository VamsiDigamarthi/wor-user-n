import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../Constants/url";

const LoginRelatedInput = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async () => {
    if (!mobile || mobile.length !== 10) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    try {
      console.log(mobile);
      await API.post("/auth/send-otp", { mobile: mobile });
      console.log("kjhgc");
      navigation.navigate("otp", {
        mobile: mobile,
        termsAndCondition: isChecked,
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
      <CustomCheckbox handleCheck={handleCheck} isChecked={isChecked} />
      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      )}
      <CustomBtn
        title="continue"
        btnBg="#fff"
        btnColor="#E02E88"
        onPress={handleLogin}
        width="100%"
      />
    </>
  );
};

export default LoginRelatedInput;

const styles = StyleSheet.create({
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
