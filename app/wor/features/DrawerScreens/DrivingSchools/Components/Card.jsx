import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { RatingLady } from "../../../../Images/Rating";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
export default function Card() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      // onPress={() => navigation.navigate("DrivingSchoolsDetailView")}
    >
      <Image source={RatingLady} style={styles.img} />
      <View>
        <Text style={styles.mainText}>Richman Driving School</Text>
        <Text style={styles.subText}>Miyapur, Rangareddy, Telangana</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#75757533",
    paddingBottom: 10,
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
    fontWeight: "bold",
  },
  subText: {
    fontWeight: "400",
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
