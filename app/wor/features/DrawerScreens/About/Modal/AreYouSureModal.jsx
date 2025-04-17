import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { InfoIcons } from "../../../../Icons/Icons";
import CustomBtn from "../../../../utiles/CustomBtn";
import { TickCard } from "../components/TickCard";

const AreYouSureModal = ({ setDisplayModalType, handleDeleteAcoountModal }) => {
  const data = [
    "You will lose access to all Women Rider services, including WOR Scooty, WOR Mini, WOR Luxe, ProMax, Book Any, and Parcel Services.",

    "If you have an ongoing ride, a pending payment, or are in the process of availing any Women Rider feature or support service, we will not be able to process your deletion request as it may disrupt your ongoing activity or service flow.",

    "Upon receipt of your deletion request, your Women Rider account and profile data will be permanently deleted from our systems.",
    "However, any data that is legally or regulatorily required to be retained will be securely stored as per policy, for up to 10 years, in line with legal compliance.",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Are you sure you want to delete your account?
      </Text>

      {data?.map((dat, index) => (
        <TickCard key={index} text={dat} />
      ))}
      <CustomBtn
        title="Confirm Deletion"
        btnBg="#EA4C89"
        btnColor="#fff"
        height={50}
        onPress={() => setDisplayModalType("accountDelete")}
      />
      <CustomBtn
        onPress={handleDeleteAcoountModal}
        title="Cancel"
        btnBg="#f7f7f7"
        btnColor="#000"
        height={50}
      />
    </View>
  );
};

export default AreYouSureModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28,
  },
});
