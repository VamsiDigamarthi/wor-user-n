import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LocationIcon } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const SelectOnMap = ({ hasSoftwareNavigationBar }) => {
  const navigation = useNavigation();
  const { location } = useSelector((state) => state.location);

  const onNavigateToMapPreviewScreen = () => {
    if (!location?.lat) return;
    navigation.navigate("FixMapPreview");
  };
  return (
    <View style={[styles.mapCard]}>
      <Pressable style={styles.innerMap} onPress={onNavigateToMapPreviewScreen}>
        <LocationIcon size={25} color="#EA4C89" />
        <Text style={styles.text}>Select on Map</Text>
      </Pressable>
    </View>
  );
};

export default SelectOnMap;

const styles = StyleSheet.create({
  mapCard: {
    width: "100%",
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    height: 50,
    // elevation: 1,
    backgroundColor: "#fff",
    borderTopColor: "#ebedf0",
    borderTopWidth: 1,
  },
  innerMap: {
    gap: 2,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 1,
  },
  text: {
    fontSize: 17,
    color: "#EA4C89",
    fontWeight: "600",
  },
});
