import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFavoritePlaceHook } from "./FavoritePlace.hook";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";

const FavoritePlace = () => {
  const { favoritePlace, onNavigateToDirectPriceScreen } =
    useFavoritePlaceHook();
  console.log(favoritePlace);

  return (
    <View style={styles.container}>
      {favoritePlace?.length > 0 ? (
        <FlatList
          data={favoritePlace}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <DropLocationItem
              mainPlace={item?.name}
              subPlace={item?.vicinity}
              eachPlace={item}
              onPress={onNavigateToDirectPriceScreen.bind(this, item)}
              favoriteIconDisplay={false} // this prop not display favorite icon
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noFavorite}>
          <Text style={styles.noFavoriteText}>
            No favorite locations found.
          </Text>
        </View>
      )}
    </View>
  );
};

export default FavoritePlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingTop: 12,
    backgroundColor: "#fff5f9",
    padding: 20,
  },
  noFavorite: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoriteText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e02e88",
  },
});
