import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MicIcon, SearchIcons } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";

const HomeInput = () => {
  const navigation = useNavigation();
  const navigateSelectDestinationScreen = () => {
    navigation.navigate("SelectDropLocation");
  };
  return (
    <View style={styles.container}>
      <SearchIcons size={22} color="#222222" />
      <Pressable style={{ flex: 1 }} onPress={navigateSelectDestinationScreen}>
        <Text style={{ fontSize: 18, fontWeight: "500", flex: 1 }}>
          Search Destination
        </Text>
      </Pressable>
      <Pressable style={styles.micIcons}>
        <MicIcon size={22} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default HomeInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 10,
    gap: 10,
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 42.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    height: 40,
  },
});
