import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";
import CustomCheckbox from "../../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import { useParcelEnterSenderReciverDetailsHook } from "./ParcelEnterSenderReciverDetails.hook";

const ParcelEnterSenderReciverDetails = ({
  pickUpLocationCoorWithName,
  typeOfLocation,
}) => {
  const {
    handleInputChange,
    formData,
    saveAddressChecked,
    onHandlerSaveAddress,
    onHandlerContinueNext,
    errors,
  } = useParcelEnterSenderReciverDetailsHook({
    pickUpLocationCoorWithName,
    typeOfLocation,
  });
  //   console.log(errors);
  return (
    <View style={styles.container}>
      <Text style={styles.senterText}>Enter Sender Details</Text>
      <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
        Located Address in Map
      </Text>
      <SingleInput
        iconType="Feather"
        iconName="user"
        placeholder="Name"
        value={formData.senderName}
        onChangeText={(text) => handleInputChange("senderName", text)}
        isValid={errors?.senderName?.length > 0 ? true : false}
      />
      <SingleInput
        iconType="Feather"
        iconName="phone"
        placeholder="Mobile Number"
        value={formData.senderPhone}
        onChangeText={(text) => handleInputChange("senderPhone", text)}
        keyboardType="number-pad"
        maxLength={10}
        isValid={errors?.senderPhone?.length > 0 ? true : false}
      />
      <SingleInput
        iconType="Entypo"
        iconName="pin"
        placeholder="Land Mark"
        value={formData.landmark}
        onChangeText={(text) => handleInputChange("landmark", text)}
        isValid={errors?.landmark?.length > 0 ? true : false}
      />
      <SingleInput
        iconType="FontAwesome6"
        iconName="location-arrow"
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        isValid={errors?.address?.length > 0 ? true : false}
      />
      <View style={{ height: 10 }} />
      <CustomCheckbox
        title="Save Address"
        isChecked={saveAddressChecked}
        handleCheck={onHandlerSaveAddress}
      />
      <View style={{ height: 10 }} />
      <CustomBtn
        title="Continue"
        btnBg={
          (errors?.senderName?.length === 0 &&
            errors?.senderPhone?.length === 0 &&
            errors?.landmark?.length === 0 &&
            errors?.address?.length === 0) ||
          Object.keys(errors).length === 0
            ? "#EA4C89"
            : "#fdfdfd"
        }
        btnColor={
          (errors?.senderName?.length === 0 &&
            errors?.senderPhone?.length === 0 &&
            errors?.landmark?.length === 0 &&
            errors?.address?.length === 0) ||
          Object.keys(errors).length === 0
            ? "#fdfdfd"
            : "#EA4C89"
        }
        borderColor="#EA4C89"
        borderWidth={1}
        onPress={onHandlerContinueNext}
      />
    </View>
  );
};

export default ParcelEnterSenderReciverDetails;

const SingleInput = ({
  iconType,
  iconName,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isValid = false,
  maxLength = undefined,
}) => {
  let Icon;
  switch (iconType) {
    case "Feather":
      Icon = Feather;
      break;
    case "Entypo":
      Icon = Entypo;
      break;
    case "FontAwesome6":
      Icon = FontAwesome6;
      break;
    default:
      Icon = Feather;
  }
  return (
    <View
      style={[styles.singleInput, isValid && { borderBottomColor: "#fc0303" }]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name={iconName}
          size={20}
          color={isValid ? "#fc0303" : "#EA4C89"}
        />
      </View>
      <View style={{ gap: 0 }}>
        <Text
          style={{ fontSize: 7, color: isValid ? "red" : COLORS.subHeading }}
        >
          {placeholder}
        </Text>
        <TextInput
          style={{ flex: 1, border: "none" }}
          placeholder={`Enter ${placeholder}`}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    gap: 5,
  },
  senterText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.heading,
  },
  singleInput: {
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    borderStyle: "dashed",
  },
});
