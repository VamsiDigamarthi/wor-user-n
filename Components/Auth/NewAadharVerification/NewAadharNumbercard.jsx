import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

const NewAadharNumbercard = ({
  isInput,
  onTextChange,
  isEditable = true,
  value = "",
  onAddharNumberGetOtpHandle,
  aadharError,
  aadharVerified,
  aadharLoader,
}) => {
  return (
    <View style={styles.mainContainer}>
      {aadharError && (
        <Text style={{ color: "red", fontSize: 10 }}>{aadharError}</Text>
      )}
      <View style={styles.container}>
        <View style={[styles.firstCard]}>
          <TextInput
            onChangeText={onTextChange}
            placeholder="Enter your aadhar number"
            value={value}
            keyboardType="numeric"
            editable={isEditable}
            maxLength={12}
          />
        </View>
        <View
          style={[
            styles.secondCard,
            aadharVerified && { backgroundColor: "#808080" },
          ]}
        >
          <Pressable onPress={onAddharNumberGetOtpHandle}>
            {aadharLoader ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.getOtpText}>GET OTP</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewAadharNumbercard;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 1,
  },
  container: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#F7F7F7",
    overflow: "hidden",
  },
  firstCard: {
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  secondCard: {
    width: "30%",
    height: "100%",
    backgroundColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
  getOtpText: {
    color: "#fff",
    fontSize: 16,
  },
});
