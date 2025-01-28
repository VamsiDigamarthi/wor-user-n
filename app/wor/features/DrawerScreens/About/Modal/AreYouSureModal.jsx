import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { InfoIcons } from "../../../../Icons/Icons";
import CustomBtn from "../../../../utiles/CustomBtn";
import { TickCard } from "../components/TickCard";

const AreYouSureModal = ({ setDisplayModalType }) => {
  const data = [
    "You will lose access to all Ola services like Mobility, Cars, Dash and Financial Services.",
    "If you have or are in the process of availing any Ola Electric product or service, we will not be able to process your deletion request as it will render the product unusable",
    "Upon receipt of your request for deletion data/your account with Ola, we will be permanently deleting your profile and related information. However, any data that may have to be retained to fulfil our legal and regulatory requirements shall be stored as may be required (mostly until 10 years).",
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
        btnBg="#e02e88"
        btnColor="#fff"
        height={50}
        onPress={() => setDisplayModalType("accountDelete")}
      />
      <CustomBtn title="Cancel" btnBg="#f7f7f7" btnColor="#000" height={50} />
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
