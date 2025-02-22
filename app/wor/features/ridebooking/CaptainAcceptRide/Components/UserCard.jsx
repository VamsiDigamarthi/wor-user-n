import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { imageUrl } from "../../../../../../Constants/url";

import defaultImg from "../../../../../../assets/images/profile/Services.png";
import { fonts } from "../../../../fonts/Fonts";

const UserCard = ({ captainDetails, vehcleType }) => {
  // const imageSrc = captainDetails?.profilePic
  //   ? { uri: `${imageUrl}/${captainDetails.profilePic}` }
  //   : defaultImg;

  const sanitizedImageUrl = captainDetails?.profilePic
    ? `${imageUrl}/${captainDetails?.profilePic}`.replace(/\\/g, "/")
    : null;


    // console.log(captainDetails);
    /*
    
     LOG  {"_id": "67b575d859b84c418535b0d7", "activeService": "scooty", "email": "v@gmail.com", "languages": ["Telugu", "English"], "mobile": "9100480805", "name": "Vamsi", "profilePic": "uploads/1740156908399.jpg", "services": [{"_id": "67b575f459b84c418535b0e2", "color": null, "fatherName": null, "fitUpTo": null, "fuelType": null, "makerDescription": null, "makerModel": null, "ownerName": null, "permanentAddress": null, "presentAddress": null, "rcBackImage": "uploads\\1739947170149.jpg", "rcFrontImage": "uploads\\1739947170130.jpg", "rcNumber": "Ts07ev4520", "rcVerificationStatuc": "verified", "registeredAt": null, "registrationDate": null, "serviceType": "scooty"}, {"_id": "67b5b4bdc35096e841bcf616", "color": null, "fatherName": null, "fitUpTo": null, "fuelType": null, "makerDescription": null, "makerModel": null, "ownerName": null, "permanentAddress": null, "presentAddress": null, "rcBackImage": "uploads\\1739962133716.jpg", "rcFrontImage": "uploads\\1739962133708.jpg", "rcNumber": "Ts07ev4530", "rcVerificationStatuc": "verified", "registeredAt": null, "registrationDate": null, "serviceType": "auto"}]}ˀ
    
    */

  const [imageSource, setImageSource] = useState(
    sanitizedImageUrl ? { uri: sanitizedImageUrl } : defaultImg
  );

  const [vehImage, setVehImage] = useState(null);

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
    }
  }, [vehcleType]);

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
          {captainDetails?.vehicleNumber}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            fontFamily: fonts.robotoRegular,
          }}
        >
          {captainDetails?.services[1]?.rcNumber.toUpperCase()}
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
