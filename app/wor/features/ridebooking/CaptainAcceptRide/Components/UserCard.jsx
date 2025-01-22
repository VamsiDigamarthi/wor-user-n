import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imageUrl } from "../../../../../../Constants/url";

const UserCard = ({ captainDetails }) => {
  const captainImageUrl = captainDetails?.profilePic
    ? `${imageUrl}/${captainDetails.profilePic}`
    : "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png";

  return (
    <View style={styles.container}>
      <View style={styles.userImageCard}>
        <Image
          style={styles.userImage}
          source={{
            uri: captainImageUrl,
          }}
        />
        <View style={styles.bikeImage}></View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameWithRating}>
          <Text style={{ fontWeight: "500", fontSize: 15, color: "gray" }}>
            {captainDetails?.name}
          </Text>
          <Text style={{ fontSize: 12, color: "gray" }}>4.3</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {captainDetails?.vehicleNumber}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>
          {captainDetails?.vehicleName}
        </Text>
        <Text style={{ fontSize: 11, color: "gray" }}>
          Speaks in English, Telugu, Hindi
        </Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  userImageCard: {
    width: 60,
    height: 60,
    // backgroundColor: "red",
    position: "relative",
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e02e88",
  },
  bikeImage: {
    position: "absolute",
    right: -10,
    bottom: -5,
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 20,
  },
  userInfo: {
    gap: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  nameWithRating: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
