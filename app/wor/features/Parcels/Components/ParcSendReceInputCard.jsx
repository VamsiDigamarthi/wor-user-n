import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MicIcon, SearchIcons, UserIcons } from "../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ParcSendReceInputCard = ({ sendOrReceiveTextDisplay }) => {
  const navigation = useNavigation();
  const { nearPlaces } = useSelector((state) => state.nearPlaces);

  const onNavigateToSelectDropLocationScreen = ({ isMic = false }) => {
    navigation.navigate("SelectDropLocation", {
      nearbyPlaces: nearPlaces,
      isMic,
      isFromParcelScreen: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.addDetails}>
        <UserIcons size={22} color="#e02e88" />
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Add {sendOrReceiveTextDisplay === "send" ? "Recevier" : "Sender"}{" "}
          Details
        </Text>
      </View>
      <View style={styles.inputCard}>
        <Pressable
          style={styles.input}
          onPress={onNavigateToSelectDropLocationScreen}
        >
          <SearchIcons size={25} color="gray" />
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#222222" }}>
            Search {sendOrReceiveTextDisplay === "send" ? "Recevier" : "Sender"}{" "}
            Location
          </Text>
        </Pressable>
        <Pressable
          style={styles.micIcons}
          onPress={() => onNavigateToSelectDropLocationScreen({ isMic: true })}
        >
          <MicIcon size={22} color="#e02e88" />
        </Pressable>
      </View>
    </View>
  );
};

export default ParcSendReceInputCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 13,

    paddingVertical: 20,
    gap: 20,
  },
  addDetails: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    alignItems: "center",
  },
  inputCard: {
    flexDirection: "row",
    gap: 3,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor: "#efefef",
  },
  input: {
    width: "85%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // backgroundColor: "red",
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 42.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
