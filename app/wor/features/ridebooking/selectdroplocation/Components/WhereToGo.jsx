import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LocationInput from "./LocationInput";
import IconButton from "../../../../utiles/IconButton";
import { useSelector } from "react-redux";
import { useWhereToGoHook } from "../Hooks/WhereToGo";
import HomeWorkPlaceCard from "./HomeWorkPlaceCard";
import LocationList from "./LocationList";

const WhereToGo = ({
  micVoiceText,
  setMicVoiceText,
  setIsMicModalOpenClose,
}) => {
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const {
    inputValue,
    suggestions,
    handleInputChange,
    setAddedHowWorkPlaceType,
    handleAddedHomePlace,
    addedHomeWorkPlaceType,
    // favorite place state
    setIsSendOrReceiveParcel,
    isSelectFavoritePlaces,
    favoritePlaces,
  } = useWhereToGoHook({ micVoiceText, setMicVoiceText });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pickDropBtnCard}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {addedHomeWorkPlaceType
              ? `${addedHomeWorkPlaceType?.toUpperCase()} Place`
              : "Where to go?"}
          </Text>
          <LocationInput
            inputValue={inputValue?.length > 0 ? inputValue : micVoiceText}
            handleInputChange={handleInputChange}
            setIsMicModalOpenClose={setIsMicModalOpenClose}
          />
          <View style={styles.mapFavoriteCard}>
            <Text style={{ fontSize: 12 }}>Suggested Destination</Text>
            <IconButton
              icons="favorite"
              title="Favorite Places"
              iconsName="MaterialIcons"
              isSelected={isSelectFavoritePlaces}
              onPress={() => setIsSendOrReceiveParcel(!isSelectFavoritePlaces)}
            />
          </View>
        </View>
        {isSelectFavoritePlaces ? (
          <LocationList
            data={favoritePlaces}
            setAddedHowWorkPlaceType={setAddedHowWorkPlaceType}
            isHomeWorkPlace={addedHomeWorkPlaceType}
            isFavoritePlaces={true}
          />
        ) : (
          <LocationList
            data={suggestions ?? nearPlaces}
            setAddedHowWorkPlaceType={setAddedHowWorkPlaceType}
            isHomeWorkPlace={addedHomeWorkPlaceType}
          />
        )}
      </View>
      <HomeWorkPlaceCard handleAddedHomePlace={handleAddedHomePlace} />
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
});
