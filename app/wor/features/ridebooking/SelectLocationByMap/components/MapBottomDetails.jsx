import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PickLocationIcon } from "../../../../Icons/Icons";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setDropDetails,
  setInitialDropDetails,
} from "../../sharedLogics/rideDetailsSlice";

const MapBottomDetails = ({ dragLocation }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isParcScreen } = useSelector((state) => state.allRideDetails);

  const onNavigateShowPriceScreen = () => {
    let newPlace = {
      ...dragLocation,
      name: dragLocation?.name?.split(",")?.[0],
      vicinity: dragLocation?.name?.split(",")?.slice(1)?.join(""),
    };
    dispatch(setDropDetails(newPlace));

    if (isParcScreen) {
      dispatch(setInitialDropDetails(newPlace));
      navigation.navigate("ChangeLoc100mViaMap");
      return;
    }

    navigation.navigate("ShowPrice");
  };

  return (
    <View style={styles.coordinatesContainer}>
      <View style={styles.coordinateAddressCard}>
        <PickLocationIcon size={24} color="green" />
        <View style={styles.coorlocationCard}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {dragLocation?.name?.split(",")?.[0]}
          </Text>
          <Text
            style={{ fontSize: 14, color: "gray" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {dragLocation?.name?.split(",")?.slice(1)}
          </Text>
        </View>
      </View>

      <CustomBtn
        title="Save"
        btnBg="#EA4C89"
        btnColor="#fff"
        onPress={onNavigateShowPriceScreen}
      />
    </View>
  );
};

export default MapBottomDetails;

const styles = StyleSheet.create({
  coordinatesContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 8,
    gap: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 35,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 5,
  },
  coordinateAddressCard: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  coorlocationCard: {
    width: "90%",
  },
});

// let dragLocation = {
//   location: { lat: 17.482781902517154, lng: 78.41910660266876 },
//   name: "5/7/8, Dayarguda, Sangeet Nagar, Kukatpally, Hyderabad, Telangana 500072, India",
// };

// dragLocation not given vicinity some convert name into two parts name, viinity
