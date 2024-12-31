import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import PersonIconWithName from "./components/PersonIconWithName";
import UnorderList from "./components/UnorderList";
const instructions = [
  "You can try spam calls to your trusted numbers.",
  "Inform your saved numbers that it's just a spam call drill alert.",
  "After selecting, they will get a call within 10 seconds.",
];
export default function SpamCallSheet({ onPress }) {
  return (
    <>
      <View style={styles.mainCard}>
        <View style={{ justifyContent: "center", paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => onPress("main")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: 8,
            }}
          >
            <FontAwesome name="chevron-left" size={15} color="#e02e88" />
            <Text>back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Security Spam calls Alert
          </Text>

          <UnorderList instructions={instructions} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PersonIconWithName name="Narasimha" />
          <PersonIconWithName name="Narasimha" />
          <PersonIconWithName name="Narasimha" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PersonIconWithName name="Narasimha" />
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              backgroundColor: "#ff5f39",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <CustomBtn title="Continue" btnBg="#e02e88" btnColor="#fff" />
    </>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    gap: 8,
    marginBottom: 10,
  },

  list: {
    gap: 10,
    marginLeft: 8,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
