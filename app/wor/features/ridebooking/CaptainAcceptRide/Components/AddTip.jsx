import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const AddTip = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, fontWeight: "600" }}>Add tip to Rider</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={styles.tipCard}>
          <Text>10</Text>
        </View>
        <View style={[styles.tipCard, { borderColor: "gray" }]}>
          <Text>20</Text>
        </View>
        <View style={[styles.tipCard, { width: 120, borderColor: "gray" }]}>
          <TextInput placeholder="Enter Amount" />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          style={[styles.tipCard, { width: 100, borderColor: "gray" }]}
        >
          <Text>Clear</Text>
        </Pressable>
        <Pressable style={[styles.tipCard, { width: 100 }]}>
          <Text>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddTip;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  tipCard: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: "#e02e88",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});
