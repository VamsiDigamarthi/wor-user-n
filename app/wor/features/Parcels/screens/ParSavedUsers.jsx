import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { appbarStyles } from "../../../utiles/styles";
import ParAddressDisplayCard from "../Components/ParAddressDisplayCard";
import ParAddressInputCard from "../Components/ParAddressInputCard";
import ParShowAddressArrow from "../Components/ParShowAddressArrow";
import { useParSavedUsersHook } from "../Hooks/ParSavedUsers";
import SavedAddressItme from "../Components/SavedAddressItem";

const ParSavedUsers = () => {
  const {
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    place,
    onHandlerClickSaveAddress,
  } = useParSavedUsersHook();
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Saved Details" />
      <View style={{ padding: 10, gap: 10 }}>
        <ParAddressDisplayCard
          placeName={place?.name}
          vicinity={place.vicinity}
        />
        <ParAddressInputCard parcelAddressDetails={place} />
        <ParShowAddressArrow
          onShowHideSavedAddress={onShowHideSavedAddress}
          showHideSavedAddress={showHideSavedAddress}
        />
        <FlatList
          data={savedAddressFromApi}
          keyExtractor={(item) => item?.mobile}
          renderItem={({ item }) => (
            <SavedAddressItme
              item={item}
              onHandlerClickSaveAddress={onHandlerClickSaveAddress}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          ListEmptyComponent={
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 80,
              }}
            >
              <Text>Saved Address Not Found</Text>
            </View>
          }
        />
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
