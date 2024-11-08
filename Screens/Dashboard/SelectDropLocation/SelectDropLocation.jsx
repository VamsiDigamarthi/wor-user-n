import { StatusBar, StyleSheet, View, FlatList } from "react-native";
import React from "react";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";

import IconButton from "../../../Utils/IconButton/IconButton";
import { useSelectDropLocationHook } from "./SelectDropLocation.hhok";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";
const SelectDropLocation = () => {
  const {
    inputValue,
    suggestions,
    handleInputChange,
    placeName,
    nearbyPlaces,
    onUserSelectDropLocationByNeardPlace,
    onUserSelectDropLocationByEnterInput,
    onNavigateToMapPreviewScreen,
  } = useSelectDropLocationHook();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />

      <View style={styles.pickDropBtnCard}>
        <ShowPickDropCard
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          placeName={placeName}
        />
        <View style={styles.mapFavoriteCard}>
          <IconButton
            onPress={onNavigateToMapPreviewScreen}
            icons="location"
            title="Select on Map"
          />
          <IconButton icons="location" title="Favorite Places" />
        </View>
      </View>

      <FlatList
        data={
          suggestions && suggestions.length > 0 ? suggestions : nearbyPlaces
        }
        keyExtractor={(item) =>
          suggestions && suggestions.length > 0 ? item.placeId : item.id
        }
        renderItem={({ item }) =>
          suggestions && suggestions.length > 0 ? (
            <DropLocationItem
              mainPlace={item?.name}
              subPlace={item?.vicinity}
              eachPlace={item}
              onPress={onUserSelectDropLocationByEnterInput.bind(this, item)}
            />
          ) : (
            <DropLocationItem
              mainPlace={item?.name}
              subPlace={item?.vicinity}
              eachPlace={item}
              onPress={onUserSelectDropLocationByNeardPlace.bind(this, item)}
            />
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SelectDropLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f9",
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 20,
  },
  images: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },

  pickDropBtnCard: {
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  mapFavoriteCard: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    gap: 15,
  },
});
