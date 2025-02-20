import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarRating from "../../../../../utiles/StarRating/StarRating";
import { Image } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

const DonatineTestimonial = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageNameCard}>
        <View style={styles.imageCard}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: "https://i.pinimg.com/736x/4a/7e/ef/4a7eef7cf623cbde236447d07d4effb2.jpg",
            }}
          />
        </View>
        <View style={styles.nameCard}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            Samanth Payne
          </Text>
          <Text style={styles.subName} numberOfLines={1} ellipsizeMode="tail">
            @smanath.pythane80
          </Text>
          <StarRating rating={3} />
        </View>
      </View>
      <View style={styles.iconTextCard}>
        <FontAwesome6 name="creative-commons-share" size={20} color="#EA4C89" />
        <Text style={styles.iconText}>Verified Purchase</Text>
      </View>
      <Text style={styles.lorem} numberOfLines={4} ellipsizeMode="tail">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
      </Text>
      <View style={styles.readMoreCard}>
        <Text style={{ fontSize: 13 }}>Show More</Text>
        <MaterialCommunityIcons
          style={{ marginTop: 2 }}
          name="chevron-down"
          size={25}
        />
      </View>
      <Text style={styles.dateText}>23 Nov 2024</Text>
    </View>
  );
};

export default DonatineTestimonial;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    gap: 10,
    marginRight: 10,
  },
  imageNameCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imageCard: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
  },
  nameCard: { gap: 2 },
  name: {
    fontSize: 14,
  },
  subName: {
    fontSize: 10,
    color: "#666",
  },
  iconTextCard: {
    borderWidth: 1,
    borderColor: "#EA4C89",
    width: "auto",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconText: {
    fontSize: 14,
    color: "#EA4C89",
    fontWeight: "600",
  },
  lorem: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: "justify",
  },
  readMoreCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  dateText: {
    fontSize: 13,
    color: "gray",
  },
});
