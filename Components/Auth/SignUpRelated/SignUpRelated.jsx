import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useSignUpRelatedHook } from "./SignUpRelated.hook";
import BottomLayout from "../../../Layouts/BottomLayout";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustDatePickBtn from "../../../Utils/CustDatePickBtn/CustDatePickBtn";
import SignUpLocationTextCard from "./SignUpLocationTextCard";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../InfoUi/OtpInfoUi";
import { signUpData } from "../../InfoUi/data/infoData";

const SignUpRelated = ({ mobile }) => {
  const {
    formData,
    handleInputChange,
    handleNavigateToOTP,
    apiError,
    errors,
    hideDatePicker,
    handleConfirm,
    isDatePickerVisible,
    showDatePicker,
    onOpenTextBasedLocationModal,
    storeNearLocation,
    onAddressSelect,
    validationCheck,
    isLoading,
  } = useSignUpRelatedHook({
    mobile,
  });

  // console.log(validationCheck?.name);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    console.log("press");
    setIsInfoModalOpen(!isInfoModalOpen);
  };
  return (
    <BottomLayout
      title="Create Your Account"
      subTitle="By sharing your information, we’ll set up your account."
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        <InputBox
          label={errors.name ? errors.name : "Full Name *"}
          icon="person-outline"
          placeholder="Enter Your Name"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
          isValid={errors?.name?.length > 0 ? false : true}
        />

        <CustDatePickBtn
          onPress={showDatePicker}
          title={formData?.dob?.length > 0 ? formData?.dob : "1999-10-11"}
          isValid={errors?.dob?.length > 0 ? false : true}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
        {/* <InputBox
          label="Emergency Contact Number (optional)"
          icon="contract"
          placeholder="Enter your emergency contact"
          value={formData.emergencyContact}
          onChangeText={(value) => handleInputChange("emergencyContact", value)}
          maxLength={10}
          keyboardType="numeric"
        /> */}
        <InputBox
          label="Referal Code (optional)"
          icon="contract"
          placeholder="Enter Referal Code"
          value={formData.referalCode}
          onChangeText={(value) => handleInputChange("referalCode", value)}
        />

        {apiError && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{apiError}</Text>
          </View>
        )}
        <View style={{ height: 10 }} />
        <CustomBtn
          title="continue"
          btnBg={
            errors?.name?.length === 0 &&
            validationCheck?.name &&
            errors?.dob?.length === 0 &&
            errors?.email?.length === 0 &&
            errors?.address?.length === 0
              ? "#EA4C89"
              : "#fdfdfd"
          }
          btnColor={
            errors?.name?.length === 0 &&
            errors?.dob?.length === 0 &&
            errors?.email?.length === 0 &&
            errors?.address?.length === 0
              ? "#FFF"
              : "#EA4C89"
          }
          onPress={handleNavigateToOTP}
          width="100%"
          isLoding={isLoading}
        />
      </View>
      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <OtpInfoUi mainTitle="Details For New User" data={signUpData} />
      </ModalUI>
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

  googleNearMapLocationCard: {
    position: "relative",
    zIndex: 6,
    height: 60,
    // backgroundColor: "yellow",
  },
  nearAddress: {
    position: "absolute",
    top: 60,
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
