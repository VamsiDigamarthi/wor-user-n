import { StyleSheet, View } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import ParAddressDisplayCard from "../Components/ParAddressDisplayCard";
import ParAddressInputCard from "../Components/ParAddressInputCard";
import { useSelector } from "react-redux";
import SavedUserItemWithArrow from "../Components/SavedUserItemWithArrow";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { COLORS } from "../../../../../Constants/colors";

const ParSavedUsers = () => {
  const { dropDetails } = useSelector((state) => state.allRideDetails);
  return (
    <AppBarLayout
      title="Saved Details"
      isPositionAppbar={true}
      chatBotText="Saved Parcel Places"
    >
      <View style={styles.container}>
        {/* <CustomeAppbar title="Saved Details" /> */}
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
    </AppBarLayout>
  );
};

export default ParSavedUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingTop: 86,
    backgroundColor: COLORS.mainBackgroundColor,
  },
});
