import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { imageUrl } from "../../../../Constants/url";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import defaultImg from "../../../../assets/images/profile/Services.png";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../fonts/Fonts";

const DrawerProfil = () => {
  const navigation = useNavigation();

  const { profile } = useSelector((state) => state.profileSlice);

  const { isDisplayMPinModal, isDisplayAadharModal } = useSelector(
    (state) => state.initialModals
  );

  const [avgRating, setAvgRating] = useState("");
  const [verifyText, setVerifyText] = useState(null);

  // const imageSrc = profile?.profilePic
  //   ? { uri: `${imageUrl}/${profile.profilePic}` }
  //   : defaultImg;

  // Sanitize the image URL to replace backslashes with forward slashes
  const sanitizedImageUrl = profile?.profilePic
    ? `${imageUrl}/${profile.profilePic}`.replace(/\\/g, "/")
    : null;

  const imageSrc = sanitizedImageUrl ? { uri: sanitizedImageUrl } : defaultImg;

  const onNavigateRatingScreen = () => {
    navigation.navigate("Rating", {
      avgRating,
    }); // Navigate to the RatingScreen
  };

  const handleItemPress = (itemName) => {
    navigation.navigate(itemName); // Navigate to the corresponding screen
  };

  const calculateAverageRating = (reviews) => {
    if (reviews?.length === 0) return 0; // Avoid division by zero

    const totalRating = reviews?.reduce((sum, order) => sum + order.rating, 0);
    return totalRating / reviews?.length;
  };

  useEffect(() => {
    if (profile) {
      // console.log(profile);

      console.log(profile?.averageRating?.toFixed(1));

      // setAvgRating(calculateAverageRating(profile?.reviews)?.toFixed(1));
      setAvgRating(profile?.averageRating?.toFixed(1));
    }
  }, [profile]);

  const renderContext = () => {
    if (isDisplayAadharModal) {
      setVerifyText("Verify your gender Identify");
    } else if (isDisplayMPinModal) {
      setVerifyText("Set Your M-Pin");
    } else {
      setVerifyText("");
    }
  };

  const handleVericationNavigation = () => {
    if (isDisplayAadharModal) {
      navigation.navigate("ProfileDocumentScreen");
    } else if (isDisplayMPinModal) {
      navigation.navigate("SetNewMpin");
    } else {
      setVerifyText("");
    }
  };

  useEffect(() => {
    renderContext();
  }, [isDisplayMPinModal, isDisplayAadharModal]);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableWithoutFeedback onPress={() => handleItemPress("Profile")}>
          <Image
            source={imageSrc}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.rightSideCard}>
        <Pressable
          onPress={() => handleItemPress("Profile")}
          style={styles.rowCard}
        >
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {profile?.name}
          </Text>
          <FontAwesome
            style={{ marginTop: 3 }}
            name="chevron-right"
            size={15}
            color="#B0B0B0"
          />
        </Pressable>
        <Pressable style={styles.starRating} onPress={onNavigateRatingScreen}>
          <FontAwesome name="star" size={14} color="gold" />
          <Text style={styles.ratingNumber}>{avgRating}</Text>
        </Pressable>
        {verifyText && (
          <Pressable
            style={styles.rowCard}
            onPress={handleVericationNavigation}
          >
            <Ionicons name="warning" size={15} color="red" />
            <Text style={{ fontSize: 11, fontFamily: fonts.robotoRegular }}>
              {verifyText}
            </Text>
            <MaterialIcons name="chevron-right" size={18} color="red" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default DrawerProfil;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingTop: 40,
    flexDirection: "row",
    gap: 10,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "red",
    overflow: "hidden",
  },

  rightSideCard: {
    width: "70%",
    gap: 5,
  },
  rowCard: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  starRating: {
    flexDirection: "row",
    gap: 5,
    padding: 2,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    width: 50,
    justifyContent: "center",
  },
  name: {
    width: "90%",
    fontFamily: fonts.robotoSemiBold,
  },

  ratingNumber: {
    fontFamily: fonts.robotoSemiBold,
  },
});
