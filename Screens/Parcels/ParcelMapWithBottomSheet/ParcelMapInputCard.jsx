import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import InputBox from "../../../Utils/InputCard/InputCard";

const ParcelMapInputCard = () => {
  // State to manage all input values
  const [formData, setFormData] = useState({
    address: "",
    landmark: "",
    fullName: "",
    mobileNumber: "",
  });
  // State to manage the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Handler to update the form data
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Toggle checkbox
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <InputBox
        label="Address"
        placeholder="Enter Address"
        iconType="Entypo"
        icon="address"
        value={formData.address} // Controlled input value
        onChangeText={(value) => handleInputChange("address", value)} // Update state
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
        label="Full Name"
        placeholder="Enter Full Name"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
      />
      <InputBox
        iconType="Feather"
        icon="phone"
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        value={formData.mobileNumber}
        keyboardType="phone-pad"
        onChangeText={(value) => handleInputChange("mobileNumber", value)}
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
          onPress={() => console.log(formData)} // Log form data on button press
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
