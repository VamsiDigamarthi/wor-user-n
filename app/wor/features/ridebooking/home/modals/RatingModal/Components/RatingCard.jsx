import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import StarRating from "../../../../../../utiles/StarRating/StarRating";

const RatingCard = ({ rating, setRatingData, handleRatingChange }) => {
  const handleRatingChangeStar = (newRating) => {
    setRatingData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>Ride Details</Text>
      </View>
      <View style={styles.userImageCard}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
          }}
        />
        <View style={styles.bikeImage}></View>
      </View>
      <Text>Shared Ride Experience with Dharani </Text>
      <StarRating
        initialRating={rating}
        width="50%"
        iconSize={30}
        gap={10}
        onRatingChange={handleRatingChangeStar}
      />
      <View style={styles.vehicleConfirm}>
        <Text style={styles.vehicleText}>
          was the vehicle number is correct
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() =>
              setRatingData((prev) => ({
                ...prev,
                giveVehicleNumber: "Yes",
              }))
            }
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#e02e88" }}>
              Yes
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setRatingData((prev) => ({
                ...prev,
                giveVehicleNumber: "No",
              }))
            }
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>No</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", gap: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "500" }}>
          Write your Expereinece
        </Text>
        <TextInput
          placeholder="Write your expereinece"
          style={styles.inputCard}
          onChangeText={(value) => handleRatingChange("reviewTest", value)}
        />
      </View>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
    borderWidth: 2,
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
  vehicleConfirm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  vehicleText: {
    fontSize: 11,
  },
  inputCard: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e02e88",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
