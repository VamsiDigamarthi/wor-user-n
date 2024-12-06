import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import InputBox from "../../../Utils/InputCard/InputCard";
import { useNavigation } from "@react-navigation/native";

const ParcelMapInputCard = ({ pickUpLocationCoorWithName, typeOfLocation }) => {
  // State to manage all input values

  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    address: "",
    landmark: "",
    fullName: "",
    mobileNumber: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    address: "",
  });

  const [validationCheck, setValidationCheck] = useState({
    fullName: false,
    mobileNumber: false,
    address: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    const containsNumber = /\d/;

    if (containsNumber.test(formData.fullName)) {
      newErrors.fullName = "Enter a Valid Name";
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    }

    // Return true if no errors
    return Object.keys(newErrors)?.length > 0 ? newErrors : {};
  };

  const onAddDetailsAdded = () => {
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (typeOfLocation === "Pick Up") {
      navigation.navigate("ParcelHome", {
        pickUpLocationCoorWithName: {
          ...pickUpLocationCoorWithName,
          ...formData,
        },
      });
    } else {
      navigation.navigate("ParcelHome", {
        dropLocationCoorWithName: {
          ...pickUpLocationCoorWithName,
          ...formData,
        },
      });
    }
  };

  useEffect(() => {
    if (formData?.address && formData.address?.length >= 3) {
      setErrors((prevState) => ({
        ...prevState,
        address: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        address: true,
      }));
    }

    if (!formData.address?.trim() && validationCheck.address) {
      setErrors((prev) => ({
        ...prev,
        address: "Address is required.",
      }));
    }

    if (formData.mobileNumber?.trim() && formData.mobileNumber?.length === 10) {
      console.log("enter moile");
      setErrors((prevState) => ({
        ...prevState,
        mobileNumber: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        mobileNumber: true,
      }));
    }

    if (!formData.mobileNumber?.trim() && validationCheck.mobileNumber) {
      setErrors((prevState) => ({
        ...prevState,
        mobileNumber: "Mobile Number is required!",
      }));
    }

    if (
      !/^\d{10}$/.test(formData.mobileNumber?.trim()) &&
      validationCheck.mobileNumber
    ) {
      setErrors((prevState) => ({
        ...prevState,
        mobileNumber: "Enter a valid 10-digit mobile number.",
      }));
    }

    if (formData?.fullName && formData.fullName?.length >= 3) {
      setErrors((prevState) => ({
        ...prevState,
        fullName: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        fullName: true,
      }));
    }

    if (!formData.fullName?.trim() && validationCheck.fullName) {
      setErrors((prev) => ({
        ...prev,
        fullName: "Address is required.",
      }));
    }
  }, [formData]);

  return (
    <View style={styles.container}>
      <InputBox
        label={errors?.address ? errors?.address : "Address *"}
        placeholder="Enter Address"
        iconType="Entypo"
        icon="address"
        value={formData.address} // Controlled input value
        onChangeText={(value) => handleInputChange("address", value)}
        isValid={errors?.address?.length > 0 ? false : true}
      />
      <InputBox
        iconType="FontAwesome5"
        icon="landmark"
        label="Landmark (optional)"
        placeholder="Enter Landmark"
        value={formData.landmark}
        onChangeText={(value) => handleInputChange("landmark", value)}
      />
      <InputBox
        iconType="Feather"
        icon="user"
        label={errors?.fullName ? errors?.fullName : "Full Name *"}
        placeholder="Enter Full Name"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
        isValid={errors?.fullName?.length > 0 ? false : true}
      />
      <InputBox
        iconType="Feather"
        icon="phone"
        label={errors?.mobileNumber ? errors?.mobileNumber : "Mobile Number"}
        placeholder="Enter Mobile Number"
        value={formData.mobileNumber}
        keyboardType="phone-pad"
        onChangeText={(value) => handleInputChange("mobileNumber", value)}
        isValid={errors?.mobileNumber?.length > 0 ? false : true}
        maxLength={10}
      />
      <View style={styles.btnWithCheckCard}>
        <CustomCheckbox
          title="Add to Save Address"
          isChecked={isChecked} // Pass the checked state
          handleCheck={handleCheck}
        />
        <CustomBtn
          title="Continue"
          btnBg="#fff"
          btnColor="#e02e88"
          borderWidth={1}
          borderColor="#e02e88"
          // You can handle form submission here
          onPress={onAddDetailsAdded} // Log form data on button press
        />
      </View>
    </View>
  );
};

export default ParcelMapInputCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  btnWithCheckCard: {
    gap: 20,
    marginTop: 15,
  },
});
