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
  isDisplayAddHomePlace = true, // this display home places card default and || this prop used change drop location after ride accept to hidden the home place card
  height = "70%",
  handleReturnPlaceName, // this function return place to change destination modal
}) => {
  const { nearPlaces } = useSelector((state) => state.nearPlaces);

  const {
    inputValue,
    suggestions,
    handleInputChange,
    // favorite place state
    setIsSendOrReceiveParcel,
    isSelectFavoritePlaces,
    favoritePlaces,
  } = useWhereToGoHook({ micVoiceText, setMicVoiceText, title });

  const { homeOrWorkPlacetype, isEditHomePlaces } = useSelector(
    (state) => state.homeOrWorkPlace
  );
  const { isParcScreen } = useSelector((state) => state.allRideDetails);
  return (
    <>
      <View style={[styles.container, { height }]}>
        <View style={styles.pickDropBtnCard}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {homeOrWorkPlacetype
              ? ` ${
                  isEditHomePlaces ? "Edit" : ""
                }  ${homeOrWorkPlacetype?.toUpperCase()} Place`
              : isParcScreen
              ? "Where to Send Parcel ?"
              : "Where to go ?"}
          </Text>
          <LocationInput
            title={title}
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
                    isSelectFavoritePlaces === "seggested" ? "#000" : "blue",
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
            isFavoritePlaces={true}
            // this props comming from destinatio changes after accept ride screen
            isDisplayAddHomePlace={isDisplayAddHomePlace}
            handleReturnPlaceName={handleReturnPlaceName}
          />
        ) : (
          <LocationList
            data={suggestions ?? nearPlaces}
            // this props comming from destinatio changes after accept ride screen
            isDisplayAddHomePlace={isDisplayAddHomePlace}
            handleReturnPlaceName={handleReturnPlaceName}
          />
        )}
      </View>
      {isDisplayAddHomePlace && <HomeWorkPlaceCard />}
    </>
  );
};

export default WhereToGo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    width: "100%",
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
