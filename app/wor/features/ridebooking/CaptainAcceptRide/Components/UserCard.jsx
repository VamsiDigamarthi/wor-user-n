import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { imageUrl } from "../../../../../../Constants/url";

import defaultImg from "../../../../../../assets/images/profile/Services.png";
import { fonts } from "../../../../fonts/Fonts";

const UserCard = ({ captainDetails, vehcleType }) => {
  const sanitizedImageUrl = captainDetails?.profilePic
    ? `${imageUrl}/${captainDetails?.profilePic}`.replace(/\\/g, "/")
    : null;

  const [imageSource, setImageSource] = useState(
    sanitizedImageUrl ? { uri: sanitizedImageUrl } : defaultImg
  );

  const [vehImage, setVehImage] = useState(null);
  const [activeService, setActiveService] = useState({});

  const returnVehicleImage = (imageName) => {
    switch (imageName) {
      case "scooty":
        return require("../../../../../../assets/images/HomeServiceImages/scooty.png");
      case "card":
        return require("../../../../../../assets/images/HomeServiceImages/cab.png");

      case "auto":
        return require("../../../../../../assets/images/HomeServiceImages/auto.png");

      case "bookany":
        return require("../../../../../../assets/images/HomeServiceImages/cab.png");

      case "wor-premium":
        return require("../../../../../../assets/images/HomeServiceImages/cab.png");

      default:
        return null;
    }
  };

  useEffect(() => {
    if (vehcleType) {
      const data = returnVehicleImage(vehcleType);
      setVehImage(data);
      const filterActiveService = captainDetails?.services?.find(
        (ser) => ser.serviceType?.toLowerCase() === vehcleType?.toLowerCase()
      );

      setActiveService(filterActiveService ?? {});
    }
  }, [vehcleType]);

  // console.log("captainDetails", captainDetails);

  return (
    <View style={styles.container}>
      <View style={styles.userImageCard}>
        <Image style={styles.userImage} source={imageSource} />
        <View style={styles.bikeImage}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            source={vehImage}
          />
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameWithRating}>
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: 15,
              color: "gray",
            }}
          >
            {captainDetails?.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "gray",
              fontFamily: fonts.robotoRegular,
            }}
          >
            {captainDetails?.averageRating}
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontFamily: fonts.robotoSemiBold }}>
          {activeService?.makerModel}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            fontFamily: fonts.robotoRegular,
          }}
        >
          {activeService?.rcNumber?.toUpperCase()}
        </Text>
        {captainDetails?.languages?.length > 0 && (
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 11,
                color: "gray",
                fontFamily: fonts.robotoRegular,
              }}
            >
              Speaks in
            </Text>
            {captainDetails?.languages?.map((each, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 11,
                  color: "gray",
                  fontFamily: fonts.robotoRegular,
                }}
              >
                {each}
              </Text>
            ))}
          </View>
        )}
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
    borderColor: "#EA4C89",
  },
  bikeImage: {
    position: "absolute",
    right: -10,
    bottom: -5,
    width: 30,
    height: 30,
    backgroundColor: "#f7adca",
    borderRadius: 20,
    padding: 3,
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
