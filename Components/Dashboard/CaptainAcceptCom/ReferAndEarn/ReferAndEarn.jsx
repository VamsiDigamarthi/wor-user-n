import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";

const ReferAndEarn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textCard}>
        <Text style={styles.earnText}>Refer & Earn</Text>
        <Text style={styles.useCode}>use code</Text>
        <CustomBtn title="$UFJB7" btnBg="#EA4C89" btnColor="#fff" height={4} />
      </View>
      <Image
        style={styles.image}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/5303/5303784.png",
        }}
      />
    </View>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EA4C89",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  textCard: {
    gap: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: "90%",
    resizeMode: "contain",
  },
  earnText: {
    color: "#EA4C89",
    fontSize: 15,
    fontWeight: "600",
  },
  useCode: {
    fontSize: 12,
    color: "gray",
  },
});
