import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import LocationInput from "./LocationInput";
import IconButton from "../../../../utiles/IconButton";
import { useSelector } from "react-redux";
import LocationItem from "../../../../utiles/LocationItem";
import HomeLocationCard from "../../../../utiles/HomeLocationCard";

const WhereToGo = () => {
  const { nearPlaces } = useSelector((state) => state.nearPlaces);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pickDropBtnCard}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Where to go?</Text>
          <LocationInput />
          <View style={styles.mapFavoriteCard}>
            <Text style={{ fontSize: 12 }}>Suggested Destination</Text>
            <IconButton
              icons="favorite"
              title="Favorite Places"
              iconsName="MaterialIcons"
            />
          </View>
        </View>
        <FlatList
          data={nearPlaces}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <LocationItem
              placeName={item?.name}
              placeVicinity={item.vicinity}
              entireLocation={item}
              isFavoriteIconDisplay={true}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.homeWorLocationCard}>
        <HomeLocationCard
          location="Home"
          vicinity="Vijay Sai Kiran Residency, Jpn Nagar, Miyapur"
        />
        <HomeLocationCard
          location="Work"
          vicinity="Jayabheri Silicon Towers, Kothaguda - Hitechcity Road, Hyderabad"
          iconType="AntDesign"
          iconName="star"
        />
      </View>
    </>
  );
};

export default WhereToGo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    width: "100%",
    height: "75%",
    borderRadius: 20,
    elevation: 1,
    gap: 10,
  },
  pickDropBtnCard: {
    gap: 10,
  },
  mapFavoriteCard: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  homeWorLocationCard: {
    backgroundColor: "#fff",
    width: "100%",
    height: "25%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
