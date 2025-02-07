import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { RatingLady } from "../../../../Images/Rating";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../fonts/Fonts";
import { imageUrl } from "../../../../../../Constants/url";
export default function Card({item}) {
  const navigation = useNavigation();
   const [imageSource, setImageSource] = useState(
      item?.businessType?.image
        ? { uri: `${imageUrl}/${item?.businessType?.image}` }
        : RatingLady
    );
  return (
    <Pressable
      style={styles.container}
      // onPress={() => navigation.navigate("DrivingSchoolsDetailView")}
    >
      <Image source={imageSource} style={styles.img} />
      <View style={styles.middle}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mainText}>{item?.drivingSchoolName}</Text>
        <Text numberOfLines={1} ellipsizeMode="tails " style={styles.subText}>{item?.location?.name}</Text>
        <Text style={styles.subText}>Car , Scooty</Text>
      </View>

      <Pressable style={styles.starRating}>
        <FontAwesome name="star" size={12} color="gold" />
        <Text style={styles.profileEmail}>5.0</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    // justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#75757533",
    paddingBottom: 10,
    gap:10
  },
  middle:{
    width:"63%",
    // backgroundColor:"red"
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  profileEmail: {
    fontSize: 12,
    color: "#777",
  },

  mainText: {
    // fontWeight: "bold",
    fontFamily:fonts.robotoSemiBold
  },
  subText: {
    // fontWeight: "400",
    fontFamily:fonts.robotoRegular
  },
  starRating: {
    flexDirection: "row",
    gap: 5,
    padding: 3,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: 50,
    justifyContent: "center",
  },
});
