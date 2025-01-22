import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSavedUserItemWithArrowHook } from "../Hooks/SavedUserItemWithArrow.hook";
import ParShowAddressArrow from "./ParShowAddressArrow";
import SavedAddressItme from "./SavedAddressItem";

const SavedUserItemWithArrow = () => {
  const {
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    onHandlerClickSaveAddress,
  } = useSavedUserItemWithArrowHook();
  console.log(showHideSavedAddress);
  return (
    <>
      <ParShowAddressArrow
        onShowHideSavedAddress={onShowHideSavedAddress}
        showHideSavedAddress={showHideSavedAddress}
      />

      {showHideSavedAddress && (
        <View style={styles.listContainer}>
          <FlatList
            style={styles.flatList}
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
              <View style={styles.emptyComponent}>
                <Text>Saved Address Not Found</Text>
              </View>
            }
          />
        </View>
      )}
    </>
  );
};

export default SavedUserItemWithArrow;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  flatList: {
    flexGrow: 0,
  },
  emptyComponent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
