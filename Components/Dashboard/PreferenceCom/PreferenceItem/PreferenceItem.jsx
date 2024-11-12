import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const CheckBox = ({ label, isChecked, onToggle }) => {
  return (
    <View style={styles.cardItem}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checked]}
        onPress={onToggle}
      >
        {isChecked && <View style={styles.checkedMark} />}
      </TouchableOpacity>
    </View>
  );
};

const PreferenceItem = ({ name, values }) => {
  const [checkedState, setCheckedState] = useState(values.map(() => false));

  const toggleCheckbox = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const checkedValues = values.filter((_, index) => checkedState[index]);

  console.log(
    "Checked Values:",
    checkedValues.map((v) => v.label)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.card}>
        {values.map((value, index) => (
          <CheckBox
            key={index}
            label={value.label}
            isChecked={checkedState[index]}
            onToggle={() => toggleCheckbox(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default PreferenceItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  text: {
    color: "#e02e88",
    fontWeight: "600",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    width: "100%",
  },
  cardItem: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ffe2e6",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#e02e88",
  },
  checkedMark: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    // fontWeight: "600",
  },
});
