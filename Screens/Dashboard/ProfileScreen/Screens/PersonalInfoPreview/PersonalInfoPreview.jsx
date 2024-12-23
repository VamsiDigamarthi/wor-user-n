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
      <View style={{ height: 60 }} />

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
          <Text style={styles.secondText}>20Days</Text>
        </View>
        <View style={styles.singleItem}>
          <Text style={styles.firstText}>Address</Text>
          <Text style={styles.secondText}>{profile?.address}</Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalInfoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 20,
    // justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  singleItem: {
    width: "100%",
    gap: 5,
    // borderBottomWidth: 2,
    // borderBottomColor: "#ffe2e6",
  },
  firstText: {
    fontSize: 10,
  },
  secondText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e02e88",
  },

  ItemsContainer: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    gap: 20,
    borderRadius: 20,
  },
});
