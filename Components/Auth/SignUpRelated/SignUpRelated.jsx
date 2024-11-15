import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useSignUpRelatedHook } from "./SignUpRelated.hook";
import BottomLayout from "../../../Layouts/BottomLayout";

const SignUpRelated = ({
  selectedImage,
  mobile,
  onImageError,
  imageBorder,
}) => {
  const { formData, handleInputChange, handleNavigateToOTP, apiError, errors } =
    useSignUpRelatedHook({ selectedImage, mobile, onImageError, imageBorder });

  return (
    <BottomLayout
      title="Details"
      subTitle="okiuytfdrszxdfgh uohidrseztdxcyug iudreztxdfcg y7t6fdrtfgyug 78tftuygvh"
    >
      <View style={styles.container}>
        <InputBox
          label={errors.name ? errors.name : "Name *"}
          icon="person-outline"
          placeholder="Enter Your Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
          isValid={errors?.name?.length > 0 ? false : true}
        />
        <InputBox
          label={errors?.dob ? errors?.dob : "Date of Birth *"}
          icon="calendar-clear-outline"
          placeholder="09-12-2015"
          value={formData.dob}
          onChangeText={(value) => handleInputChange("dob", value)}
          isValid={errors?.dob?.length > 0 ? false : true}
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
        <InputBox
          label={errors?.address ? errors?.address : "Address *"}
          icon="location-outline"
          placeholder=" Enter your address"
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
          isValid={errors?.address?.length > 0 ? false : true}
        />
        <InputBox
          label="Alternate Number"
          icon="contract"
          placeholder="Enter your emergency contact"
          value={formData.emergencyContact}
          onChangeText={(value) => handleInputChange("emergencyContact", value)}
        />
        {apiError && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{apiError}</Text>
          </View>
        )}
        <View style={{ height: 10 }} />
        <CustomBtn
          title="continue"
          btnBg={Object.keys(errors)?.length > 0 ? "#fff" : "#E02E88"}
          btnColor={Object.keys(errors)?.length > 0 ? "#E02E88" : "#fff"}
          onPress={handleNavigateToOTP}
          width="100%"
        />
      </View>
    </BottomLayout>
  );
};

export default SignUpRelated;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
