import { View, Text, Image, Pressable, Linking, Alert } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import ad from "../../assets/ad.png";

export default function Ad() {
  const openWeb = () => {
    Linking.openURL("https://www.womenrider.com").catch(() => {
      Alert.alert("Something Went Wrong");
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={{ flex: 1 }} onPress={openWeb}>
        <Image source={ad} style={styles.img} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    resizeMode: "contain",
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
