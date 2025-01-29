import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LocationInput from "./LocationInput";
import IconButton from "../../../../utiles/IconButton";
import { useSelector } from "react-redux";
import { useWhereToGoHook } from "../Hooks/WhereToGo";
import HomeWorkPlaceCard from "./HomeWorkPlaceCard";
import LocationList from "./LocationList";
import { TouchableOpacity } from "react-native-gesture-handler";

const WhereToGo = ({
  micVoiceText,
  setMicVoiceText,
  setIsMicModalOpenClose,
  title = "",
  passParams,
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
  } = useWhereToGoHook({ micVoiceText, setMicVoiceText, title });

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
            passParams={passParams}
            inputValue={inputValue?.length > 0 ? inputValue : micVoiceText}
            handleInputChange={handleInputChange}
            setIsMicModalOpenClose={setIsMicModalOpenClose}
          />
          <View style={styles.mapFavoriteCard}>
            <TouchableOpacity
              onPress={() => setIsSendOrReceiveParcel("seggested")}
            >
              <Text
                style={{
                  fontSize: 12,

                  color:
                    isSelectFavoritePlaces === "seggested" ? "blue" : "#000",
                }}
              >
                Suggested Destinations
              </Text>
            </TouchableOpacity>

            <IconButton
              icons="favorite"
              title="Saved Locations"
              iconsName="MaterialIcons"
              isSelected={isSelectFavoritePlaces === "favorite"}
              onPress={() => setIsSendOrReceiveParcel("favorite")}
            />
          </View>
        </View>
        {isSelectFavoritePlaces === "favorite" ? (
          <LocationList
            data={favoritePlaces}
            setAddedHowWorkPlaceType={setAddedHowWorkPlaceType}
            isHomeWorkPlace={addedHomeWorkPlaceType}
            isFavoritePlaces={true}
          />
        ) : (
          <LocationList
            // icons="favorite"
            data={suggestions ?? nearPlaces}
            setAddedHowWorkPlaceType={setAddedHowWorkPlaceType}
            isHomeWorkPlace={addedHomeWorkPlaceType}
            // isFavoritePlaces={false}
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
    height: "70%",
    borderRadius: 20,
    elevation: 0.5,
    gap: 10,
    // backgroundColor: "red",
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
