import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const InviteCard = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/profile/gift (1).png")}
      />
      <Text style={styles.text}>Invite Friends to Women Rider</Text>
      <Pressable>
        <Text style={styles.textInvite}>INVITE</Text>
      </Pressable>
    </View>
  );
};

export default InviteCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    color: "black",
  },
  textInvite: {
    color: "#EA4C89",
    fontWeight: "bold",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
