import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DonationSelectBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="How It Works"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        theme="LIGHT" // Explicitly set the theme (if 'light' is causing the issue)
      />
    </View>
  );
};

export default DonationSelectBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 9,
  },
  dropdown: {
    backgroundColor: "#ffe2e6",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
