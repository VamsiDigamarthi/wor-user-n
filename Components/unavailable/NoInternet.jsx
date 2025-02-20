import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../../Utils/CustomBtn/CustomBtn";

import img from "../../assets/images/nointernet.png";

export default function NoInternet({ onclick }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={img} style={styles.image} />
      <Text style={styles.mainText}>OOPS!</Text>
      <Text style={styles.subText}>
        It looks like you’re not connected to the internet.
      </Text>
      <Text style={styles.subText}>Check your connection and try again.</Text>
      <CustomBtn
        onPress={onclick}
        title="Try Again"
        btnBg="#EA4C89"
        btnColor="white"
      />
      <StatusBar backgroundColor="black" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8", // Slightly off-white for a clean look
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#EA4C89", // Retained original color
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    width: "80%",
    fontSize: 18,
    color: "#757575",
    marginBottom: 15,
  },
});
