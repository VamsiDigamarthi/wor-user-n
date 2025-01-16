import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { imageUrl } from "../../../../../Constants/url";

const SettingprofileCardLeft = () => {
  const { profile } = useSelector((state) => state.profileSlice);

  let image = profile?.profilePic
    ? { uri: `${imageUrl}/${profile.profilePic}` }
    : require("../../../../../assets/images/profile/Services.png");

  return (
    <View style={styles.leftCard}>
      <View style={styles.imageCard}>
        <Image style={styles.image} source={image} />
      </View>
      <View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.phone}>{profile?.mobile}</Text>
      </View>
    </View>
  );
};

export default SettingprofileCardLeft;

const styles = StyleSheet.create({
  leftCard: {
    width: "70%",
    height: "100%",
    flexDirection: "row",
    gap: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  imageCard: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 30,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  phone: {
    fontSize: 13,
    color: "#808080",
  },
});
