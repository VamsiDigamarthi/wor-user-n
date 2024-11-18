import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const DonationSelectBox = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: "Java", value: "java", key: "java" },
          { label: "JavaScript", value: "javascript", key: "javascript" },
          { label: "Python", value: "python", key: "python" },
          { label: "C++", value: "cpp", key: "cpp" },
        ]}
        value={selectedValue}
        style={pickerSelectStyles}
        placeholder={{
          label: "How It Works",
          value: null,
          color: "#9EA0A4",
        }}
      />
    </View>
  );
};

export default DonationSelectBox;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#fff",
    borderColor: "#ffe2e6",
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#ffff",
    color: "#ffe2e6",
  },
  inputAndroid: {
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#ffff",
    color: "black",
  },
});
