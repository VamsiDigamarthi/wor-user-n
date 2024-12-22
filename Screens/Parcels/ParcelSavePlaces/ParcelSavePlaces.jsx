import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ParcelAddres from "./Components/ParcelAddres";
import { StatusBar } from "expo-status-bar";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useParcelSavePlacesHook } from "./ParcelSavePlaces.hook";
import SavedAdressPlaceName from "./Components/SavedAdressPlaceName";
import { COLORS } from "../../../Constants/colors";
import ParcelEnterSenderReciverDetails from "./Components/ParcelEnterSenderReciverDetails";
import { MaterialIcons } from "@expo/vector-icons";

const ParcelSavePlaces = () => {
  const {
    navigation,
    pickUpLocationCoorWithName,
    typeOfLocation,
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    onHandlerClickSaveAddress,
  } = useParcelSavePlacesHook();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <CustomeAppbar title="Saved Address" onBack={() => navigation.goBack()} />
      <View style={{ height: 90 }} />
      {/* display the location text with edit feature */}
      <SavedAdressPlaceName
        pickUpLocationCoorWithName={pickUpLocationCoorWithName}
        typeOfLocation={typeOfLocation}
      />
      <ParcelEnterSenderReciverDetails
        pickUpLocationCoorWithName={pickUpLocationCoorWithName}
        typeOfLocation={typeOfLocation}
      />
      <ShowAddressArrowCard
        onShowHideSavedAddress={onShowHideSavedAddress}
        showHideSavedAddress={showHideSavedAddress}
      />
      {showHideSavedAddress && (
        <FlatList
          data={savedAddressFromApi}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <ParcelAddres
              item={item}
              onHandlerClickSaveAddress={onHandlerClickSaveAddress}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        />
      )}
    </View>
  );
};

export default ParcelSavePlaces;

const ShowAddressArrowCard = ({
  onShowHideSavedAddress,
  showHideSavedAddress,
}) => (
  <Pressable onPress={onShowHideSavedAddress}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "600" }}>Saved Adress</Text>
      {showHideSavedAddress ? (
        <MaterialIcons name="arrow-drop-down" size={30} color={COLORS.height} />
      ) : (
        <MaterialIcons name="arrow-drop-up" size={30} color={COLORS.height} />
      )}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.bottomSheetBg,
    gap: 10,
  },
});
