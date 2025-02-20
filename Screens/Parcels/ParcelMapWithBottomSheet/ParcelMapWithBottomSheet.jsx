import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useParcelMapWithBottomSheetHook } from "./ParcelMapWithBottomSheet.hook";
import ParcelMap from "./ParcelMap";
import { Entypo } from "@expo/vector-icons";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../../Constants/colors";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

const ParcelMapWithBottomSheet = () => {
  const {
    pickUpLocationCoorWithName,
    onNavigateSavedAddressScreen,
    navigation,
  } = useParcelMapWithBottomSheetHook();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <CustomeAppbar
        title="Confirm Location"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 110 }} />
      <DisplayLocationName locationName={pickUpLocationCoorWithName?.name} />
      <ParcelMap pickUpLocationCoorWithName={pickUpLocationCoorWithName} />
      <FixedBtn onPress={onNavigateSavedAddressScreen} />
    </View>
  );
};

export default ParcelMapWithBottomSheet;

const DisplayLocationName = ({ locationName }) => (
  <View style={styles.locationNameCard}>
    <View style={styles.locationNameInnerCard}>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo size={25} color="#EA4C89" name="location-pin" />
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          fontWeight: "600",
          color: COLORS.heading,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {locationName}
      </Text>
    </View>
  </View>
);

const FixedBtn = ({ onPress }) => (
  <View style={styles.fiexBtnCard}>
    <CustomBtn
      onPress={onPress}
      title="Confirm Location"
      btnBg="#EA4C89"
      btnColor="#fff"
    />
    <Text style={{ fontSize: 13, color: "#000", fontWeight: "600" }}>
      Go back if you want to change your location
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  locationNameCard: {
    width: "100%",
    paddingHorizontal: 10,
    // backgroundColor: "red",
  },
  locationNameInnerCard: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    // backgroundColor: "blue",
    padding: 5,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  fiexBtnCard: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
