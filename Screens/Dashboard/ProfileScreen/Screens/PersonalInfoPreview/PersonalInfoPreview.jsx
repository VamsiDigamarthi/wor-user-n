import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";

const PersonalInfoPreview = () => {
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Personal Information"
        top={25}
        onBack={() => navigation.goBack()}
        rightText="Edit"
        showRight
        navigationText="PersonalInfo"
      />
      <View style={styles.itemsWrapper}>
        <View style={styles.ItemsContainer}>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Name</Text>
            <Text style={styles.secondText}>{profile?.name}</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Gender</Text>
            <Text style={styles.secondText}>{profile?.gender ?? "Female"}</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Mobile Number</Text>
            <Text style={styles.secondText}>{profile?.mobile}</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Email-ID</Text>
            <Text style={styles.secondText}>{profile?.email}</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>DOB</Text>
            <Text style={styles.secondText}>{profile?.dateOfBirth}</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Member Since</Text>
            <Text style={styles.secondText}>20 Days</Text>
          </View>
          <View style={styles.singleItem}>
            <Text style={styles.firstText}>Address</Text>
            <Text style={styles.secondText}>{profile?.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PersonalInfoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light background for better contrast
    // paddingTop: 20,
  },
  itemsWrapper: {
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  ItemsContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 15, // Consistent padding for the container
    borderRadius: 20,
  },
  singleItem: {
    width: "100%",
    paddingVertical: 10, // Space within each item
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  firstText: {
    fontSize: 12,
    color: "#999",
  },
  secondText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EA4C89",
  },
});
