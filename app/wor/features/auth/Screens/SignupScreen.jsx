import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthAppBar from "./AuthAppBar";
import CustomBtn from "../../../utiles/CustomBtn";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import InputBox from "../../../utiles/InputCard/InputCard";
import { nearPlacesByText } from "../../../../../Constants/displaylocationmap";
import SignUpLocationTextCard from "./Components/SignUpLocationTextCard";
import { API } from "../../../../../Constants/url";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../../../../redux/Features/Auth/LoginSlice";
import { useDispatch } from "react-redux";

const SignupScreen = () => {
  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  const [errors, setErrors] = useState({
    name: "",
  });

  const [apiError, setApiError] = useState("");
  const { mobile } = useRoute().params;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "user",
    referalCode: "",
    mobile,
    longitude: "76.978987",
    latitude: "17.8765678",
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [onOpenTextBasedLocationModal, setOnOpenTextBasedLocationModal] =
    useState(false);
  const [validationCheck, setValidationCheck] = useState({
    name: false,
    email: false,
    address: false,
  });

  const [storeNearLocation, setStoreNearLocation] = useState([]);

  const onFethcNearLocation = async (text) => {
    const data = await nearPlacesByText(text);
    setStoreNearLocation(data);
  };

  const handleInputChange = (field, value) => {
    if (field === "address" && value?.length > 2) {
      setOnOpenTextBasedLocationModal(true);
      onFethcNearLocation(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onAddressSelect = (address) => {
    // console.log(address);
    setOnOpenTextBasedLocationModal(false);
    setFormData((prev) => ({
      ...prev,
      address: `${address?.name} | ${address?.vicinity}`,
    }));
  };

  const signUpValidation = (formData) => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain alphabetic characters";
    } else if (formData.name?.length < 3) {
      newErrors.name = "Name should be at least 3 characters long";
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.address) {
      newErrors.address = "Current Address is required";
    }

    return Object.keys(newErrors)?.length > 0 ? newErrors : {};
  };

  const handleNavigateToOTP = async () => {
    const errors = signUpValidation(formData);
    // console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/auth/new-register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      setIsLoading(false);
      dispatch(setToken(response.data.token));
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Ensures the specified route is the only route in the stack
          routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
        })
      );
    } catch (error) {
      console.log(error?.response?.data?.message);
      setIsLoading(false);
      setApiError(error?.response?.data?.message);
      //   if (error?.response?.data?.message === "User Already Exist ....!") {
      //     navigate.navigate("documentCheck");
      //   }
    }
  };

  useEffect(() => {
    if (
      formData.name &&
      /^[A-Za-z\s]+$/.test(formData.name) &&
      formData.name?.length >= 3
    ) {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        name: true,
      }));
    }

    if (!formData.name && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Full Name is required",
      }));
    } else if (!/^[A-Za-z\s]+$/.test(formData.name) && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should only contain alphabetic characters",
      }));
    } else if (formData.name?.length < 3 && validationCheck.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should be at least 3 characters long",
      }));
    } else {
      delete errors?.name;
    }

    if (/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        email: true,
      }));
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email) && validationCheck.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email address",
      }));
    }

    if (formData.address) {
      setErrors((prevState) => ({
        ...prevState,
        address: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        address: true,
      }));
    }

    if (!formData.address && validationCheck.address) {
      setErrors((prev) => ({
        ...prev,
        address: "Current Address is required",
      }));
    }
  }, [formData]);

  return (
    <View style={styles.container}>
      <AuthAppBar isLoginScreen={false} />
      <View style={styles.loginInnerCard}>
        <View style={{ width: "100%", gap: 10 }}>
          <Text style={{ fontSize: 13, color: "gray" }}>Please Fill Your</Text>
          <Text style={{ fontSize: 22, fontWeight: "600" }}>
            Basic Information
          </Text>
          <InputBox
            label={"Full Name *"}
            icon="person-outline"
            placeholder="Enter Your Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            isValid={errors?.name?.length > 0 ? false : true}
          />
          <InputBox
            label={errors?.email ? errors?.email : "Email *"}
            icon="mail-outline"
            placeholder="Enter your email address"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            isValid={errors?.email?.length > 0 ? false : true}
          />
          <View style={styles.googleNearMapLocationCard}>
            <InputBox
              label={errors?.address ? errors?.address : "Current Address *"}
              icon="location-outline"
              placeholder=" Enter your address"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              value={formData.address?.split("|")[0]}
              onChangeText={(value) => handleInputChange("address", value)}
              isValid={errors?.address?.length > 0 ? false : true}
            />
            {onOpenTextBasedLocationModal && (
              <View style={styles.nearAddress}>
                {storeNearLocation?.map((each, index) => (
                  <SignUpLocationTextCard
                    key={index}
                    mainPlace={each?.name}
                    subPlace={each?.vicinity}
                    onPress={() => onAddressSelect(each)}
                  />
                ))}
              </View>
            )}
          </View>
          <InputBox
            label="Referal Code (optional)"
            icon="contract"
            placeholder="Enter Referal Code"
            value={formData.referalCode}
            onChangeText={(value) => handleInputChange("referalCode", value)}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 30 }}>
          <CustomBtn
            title="continue"
            btnBg={
              errors?.name?.length === 0 &&
              validationCheck?.name &&
              errors?.email?.length === 0 &&
              errors?.address?.length === 0
                ? "#E02E88"
                : "#f7f7f7"
            }
            btnColor={
              errors?.name?.length === 0 &&
              errors?.email?.length === 0 &&
              errors?.address?.length === 0
                ? "#FFF"
                : "#E02E88"
            }
            onPress={handleNavigateToOTP}
            width="100%"
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

export default SignupScreen;

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
  googleNearMapLocationCard: {
    position: "relative",
    zIndex: 6,
    height: 60,
    marginBottom: 15,
    // backgroundColor: "yellow",
  },
  nearAddress: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: 245,
    overflow: "scroll",
    elevation: 2,
    // zIndex: 31,
  },
});
