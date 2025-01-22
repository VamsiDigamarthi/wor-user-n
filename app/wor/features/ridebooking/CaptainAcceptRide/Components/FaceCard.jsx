import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InfoIcons, UserIcons } from "../../../../Icons/Icons";

const FaceCard = ({ price }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222222",
          borderRadius: 20,
        }}
      >
        <UserIcons size={20} color="#fff" />
      </View>
      <View style={styles.fireCard}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Total Fare *</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 15 }}>₹{price}</Text>
          <InfoIcons size={14} color="gray" />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Payment Mode : Cash</Text>
          <Pressable>
            <Text style={{ color: "#e02e88", fontWeight: "500" }}>Change</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FaceCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
  },
  fireCard: {
    width: "85%",
    gap: 3,
  },
});
