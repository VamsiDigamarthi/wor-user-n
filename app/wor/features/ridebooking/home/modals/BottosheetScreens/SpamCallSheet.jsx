import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PersonIconWithName from "./components/PersonIconWithName";
import UnorderList from "./components/UnorderList";
import { useFakeCallHook } from "./SpamCallHook";
const instructions = [
  "You can try Fake incoming calls from your trusted numbers.",
  // "Inform your saved numbers that it's just a spam call drill alert.",
  // "After selecting, they will get a call within 10 seconds.",
];
export default function SpamCallSheet({ onPress }) {
  const { profile, navigateToFakeCall, handlerNavigateEmergencyConcatScreen } =
    useFakeCallHook();

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
            <FontAwesome name="chevron-left" size={15} color="#EA4C89" />
            <Text>back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Security Spam calls Alert
          </Text>

          <UnorderList instructions={instructions} />
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 10,
            paddingBottom: 60,
          }}
        >
          {profile?.emergencyContact?.map((each, index) => (
            <PersonIconWithName
              key={index}
              name={each?.name}
              mobile={each?.mobile}
              onClick={() => navigateToFakeCall(each?.mobile, each?.name)}
            />
          ))}

          {profile?.emergencyContact?.length < 5 && (
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: -10,
                display:
                  profile?.emergencyContact?.length < 5 ? "flex" : "none", // Make sure it's hidden after 5 contacts
              }}
            >
              <TouchableOpacity
                onPress={handlerNavigateEmergencyConcatScreen}
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "#EA4C89",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Ionicons name="add-circle-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
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
