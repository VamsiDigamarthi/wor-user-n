import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";
import { useRoute } from "@react-navigation/native";
import IconButton from "../../../Utils/IconButton/IconButton";
const SelectDropLocation = () => {
  const route = useRoute();

  const { placeName } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pickDropBtnCard}>
          <ShowPickDropCard placeName={placeName} />
          <View style={styles.mapFavoriteCard}>
            <IconButton icons="location" title="Select on Map" />
            <IconButton icons="location" title="Favorite Places" />
          </View>
        </View>
      </ScrollView>
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
