import { StyleSheet, View } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import ParAddressDisplayCard from "../Components/ParAddressDisplayCard";
import ParAddressInputCard from "../Components/ParAddressInputCard";
import { useSelector } from "react-redux";
import SavedUserItemWithArrow from "../Components/SavedUserItemWithArrow";

const ParSavedUsers = () => {
  const { dropDetails } = useSelector((state) => state.allRideDetails);
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Saved Details" />
      <View
        style={{
          padding: 10,
          gap: 10,
          flex: 1,
        }}
      >
        <ParAddressDisplayCard
          placeName={dropDetails?.name}
          vicinity={dropDetails.vicinity}
        />
        <ParAddressInputCard />
        <SavedUserItemWithArrow />
      </View>
    </View>
  );
};

export default ParSavedUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
});
