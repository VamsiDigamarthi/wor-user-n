import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioItem = ({ id, label, checked, onSelect }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
      }}
      onPress={() => onSelect(label)}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: checked ? "#007BFF" : "#ccc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {checked && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#007BFF",
            }}
          />
        )}
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontWeight: "600",
          color: "gray",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioItem;
