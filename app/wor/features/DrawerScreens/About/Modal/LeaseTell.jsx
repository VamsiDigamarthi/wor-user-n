import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RadioItem from "../components/RadioItem";
import CustomBtn from "../../../../utiles/CustomBtn";

const LeaseTell = ({
  selectedValue,
  handleSelect,
  setDisplayModalType,
  handleDeleteAcoountModal,
}) => {
  const items = [
    { id: 1, label: "I’m getting to many emails/sms" },
    { id: 2, label: "I’m getting to many notifications" },
    { id: 3, label: "I’m concerned about privacy" },
    { id: 4, label: "I have another account" },
    { id: 5, label: "I don’t need this service anymore" },
    { id: 6, label: "Other" },
  ];

  const [error, setError] = useState("");
  const handleShowError = () => {
    console.log(selectedValue);
    if (selectedValue === null) {
      setError("Please Select Reason");
      return;
    }
    setDisplayModalType("areYourSure");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Lease tell us why you're leaving women rider
      </Text>
      {items.map((item) => (
        <RadioItem
          key={item.id}
          id={item.id}
          label={item.label}
          checked={selectedValue === item.label}
          onSelect={handleSelect}
        />
      ))}
      {error && <Text style={{ fontSize: 11, color: "red" }}>{error}</Text>}
      <CustomBtn
        title="Confirm Deletion"
        btnBg={selectedValue ? "#e02e88" : "#f7f7f7"}
        btnColor={selectedValue ? "#fff" : "#000"}
        height={50}
        onPress={handleShowError}
      />
      <CustomBtn
        onPress={handleDeleteAcoountModal}
        title="Cancel"
        btnBg="#f7f7f7"
        btnColor="#000"
        height={50}
      />
    </View>
  );
};

export default LeaseTell;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
  },
});
