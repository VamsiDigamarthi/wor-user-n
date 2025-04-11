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
import { RatingLady } from "../../../../../../Images/Rating";
import { imageUrl } from "../../../../../../../../Constants/url";

const RatingCard = ({
  rating,
  setRatingData,
  handleRatingChange,
  penRatOrderIdCaptainId,
}) => {
  const handleRatingChangeStar = (newRating) => {
    setRatingData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const returnVehicleImage = (imageName) => {
    switch (imageName) {
      case "scooty":
        return require("../../../../../../../../assets/images/HomeServiceImages/scooty.png");
      case "card":
        return require("../../../../../../../../assets/images/HomeServiceImages/cab.png");

      case "auto":
        return require("../../../../../../../../assets/images/HomeServiceImages/auto.png");

      case "bookany":
        return require("../../../../../../../../assets/images/HomeServiceImages/cab.png");

      case "wor-premium":
        return require("../../../../../../../../assets/images/HomeServiceImages/cab.png");

      default:
        return null;
    }
  };

  const sanitizedImageUrl = penRatOrderIdCaptainId?.userId?.profilePic
    ? `${imageUrl}/${penRatOrderIdCaptainId?.userId.profilePic}`.replace(
        /\\/g,
        "/"
      )
    : null;

  const imageSrc = sanitizedImageUrl
    ? { uri: sanitizedImageUrl }
    : require("../../../../../../../../assets/images/profile/Services.png");

  // console.log("penRatOrderIdCaptainId", penRatOrderIdCaptainId);

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
        <Image style={styles.userImage} source={imageSrc} />
        <View style={styles.bikeImage}>
          <Image
            style={styles.img}
            source={returnVehicleImage(penRatOrderIdCaptainId?.vehicleType)}
          />
        </View>
      </View>
      <Text style={{ textAlign: "center", lineHeight: 22 }}>
        Shared Ride Experience with {penRatOrderIdCaptainId?.userId?.name}{" "}
      </Text>
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
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#EA4C89" }}>
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
    borderColor: "#EA4C89",
  },
  bikeImage: {
    position: "absolute",
    right: -10,
    bottom: -5,
    width: 30,
    height: 30,
    // backgroundColor: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EA4C89",
    backgroundColor: "#FFF",
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
    borderColor: "#EA4C89",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  img: {
    height: "80%",
    width: "80%",
  },
});
