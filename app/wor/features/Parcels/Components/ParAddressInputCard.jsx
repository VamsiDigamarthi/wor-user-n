import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ParAddressInputItem from "./ParAddressInputItem";
import CustomCheckbox from "../../../utiles/CustomCheckbox";
import { useParcelSavedAddressHook } from "../Hooks/ParcelSaveAddreddHook";
import CustomBtn from "../../../utiles/CustomBtn";

const ParAddressInputCard = () => {
  const {
    handleInputChange,
    formData,
    saveAddressChecked,
    onHandlerSaveAddress,
    errors,
    onHandlerContinueNext,
    clearFormData,
  } = useParcelSavedAddressHook();
  // console.log(errors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Details</Text>
      <ParAddressInputItem
        iconType="Feather"
        iconName="user"
        placeholder="Name"
        value={formData.senderName}
        onChangeText={(text) => handleInputChange("senderName", text)}
        isValid={errors?.senderName?.length > 0 ? true : false}
      />
      <ParAddressInputItem
        iconType="Feather"
        iconName="phone"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChangeText={(text) => handleInputChange("mobile", text)}
        keyboardType="number-pad"
        maxLength={10}
        isValid={errors?.mobile?.length > 0 ? true : false}
      />
      <ParAddressInputItem
        iconType="Entypo"
        iconName="pin"
        placeholder="Land Mark"
        value={formData.landmark}
        onChangeText={(text) => handleInputChange("landmark", text)}
        isValid={errors?.landmark?.length > 0 ? true : false}
      />
      <ParAddressInputItem
        iconType="FontAwesome6"
        iconName="location-arrow"
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        isValid={errors?.address?.length > 0 ? true : false}
      />
      <View style={{ marginLeft: 5 }}>
        <CustomCheckbox
          title="Save Address"
          isChecked={saveAddressChecked}
          handleCheck={onHandlerSaveAddress}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <CustomBtn
          width={100}
          title="Clean"
          btnColor={"#757575"}
          borderColor="#757575"
          borderWidth={1}
          onPress={clearFormData}
        />
        <CustomBtn
          width={100}
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
    </View>
  );
};

export default ParAddressInputCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
