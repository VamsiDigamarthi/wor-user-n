import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const AadharFrontBackImageCard = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleImagePick = async (side) => {
    // Request permission to access the camera roll
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      if (side === "front") {
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };
  return (
    <View style={styles.imageContainer}>
      <Pressable
        style={[styles.imageBox, styles.frontBox]}
        onPress={() => handleImagePick("front")}
      >
        {frontImage ? (
          <Image source={{ uri: frontImage }} style={styles.image} />
        ) : (
          <Text style={styles.boxText}>Front</Text>
        )}
      </Pressable>
      <Pressable
        style={[styles.imageBox, styles.backBox]}
        onPress={() => handleImagePick("back")}
      >
        {backImage ? (
          <Image source={{ uri: backImage }} style={styles.image} />
        ) : (
          <Text style={styles.boxText}>Back</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AadharFrontBackImageCard;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imageBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  frontBox: {
    backgroundColor: "#E02E88", // Pink background for front
  },
  backBox: {
    backgroundColor: "#A9A9A9", // Gray background for back
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
