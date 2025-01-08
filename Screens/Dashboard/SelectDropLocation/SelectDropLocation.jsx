import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ShowPickDropCard from "../../../Components/Dashboard/ShowPrices/ShowPickDropCard/ShowPickDropCard";

import IconButton from "../../../Utils/IconButton/IconButton";
import { useSelectDropLocationHook } from "./SelectDropLocation.hhok";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";
import { COLORS } from "../../../Constants/colors";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";

import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import MapBtn from "./Components/MapBtn";
import HomeLocationCard from "./Components/HomeLocationCard";
const SelectDropLocation = () => {
  const {
    inputValue,
    suggestions,
    handleInputChange,
    placeName,
    onUserSelectDropLocationByNeardPlace,
    onUserSelectDropLocationByEnterInput,
    onNavigateToMapPreviewScreen,
    onNavigateToFavoriteScreen,
    nearByFavPrevPlace,
    isMicModalOpenClose,
    setIsMicModalOpenClose, // this is state for opem mic modal
    handleMicPress,
    isListening,
    micVoiceText,
    navigation,
  } = useSelectDropLocationHook();
  // console.log("jugfghjn", nearByFavPrevPlace);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.container}>
        <CustomeAppbar
          title="Select Destination"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.newInnerCard}>
          <View style={styles.whereToGoCard}>
            <View style={styles.pickDropBtnCard}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Where to go?
              </Text>
              <ShowPickDropCard
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                placeName={placeName}
                micVoiceText={micVoiceText}
                setIsMicModalOpenClose={setIsMicModalOpenClose}
                isDisplayPickLoc={false}
              />
              <View style={styles.mapFavoriteCard}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Suggested Destination
                </Text>
                <IconButton
                  icons="favorite"
                  title="Favorite Places"
                  iconsName="MaterialIcons"
                  onPress={onNavigateToFavoriteScreen}
                />
              </View>
            </View>
            <FlatList
              data={
                suggestions && suggestions.length > 0
                  ? suggestions
                  : nearByFavPrevPlace
              }
              keyExtractor={(item) =>
                suggestions && suggestions.length > 0 ? item.placeId : item.name
              }
              renderItem={({ item }) =>
                suggestions && suggestions.length > 0 ? (
                  <DropLocationItem
                    mainPlace={item?.name}
                    subPlace={item?.vicinity}
                    eachPlace={item}
                    onPress={onUserSelectDropLocationByEnterInput.bind(
                      this,
                      item
                    )}
                  />
                ) : (
                  <DropLocationItem
                    mainPlace={item?.name}
                    subPlace={item?.vicinity}
                    eachPlace={item}
                    onPress={onUserSelectDropLocationByNeardPlace.bind(
                      this,
                      item
                    )}
                  />
                )
              }
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.homeWorLocationCard}>
            <HomeLocationCard
              location="Home"
              vicinity="okiuy7t i9u8y7t7 ;oiu9 oiJQ98SD OIJASIDJ OQJD90 OJIJD
          IJQ98DUQW8E9DJQWEID IJQ9DHJWQI"
            />
            <HomeLocationCard
              location="Work"
              vicinity="okiuy7t i9u8y7t7 ;oiu9 oiJQ98SD OIJASIDJ OQJD90 OJIJD
          IJQ98DUQW8E9DJQWEID IJQ9DHJWQI"
              iconType="AntDesign"
              iconName="star"
            />
          </View>
        </View>
        <MapBtn onNavigateToMapPreviewScreen={onNavigateToMapPreviewScreen} />
      </View>
      <Modal
        animationType="fade" // You can also use 'fade' or 'none'
        transparent={true} // Whether the modal should have a transparent background
        visible={isMicModalOpenClose} // Control the visibility of the modal
        onRequestClose={() => setIsMicModalOpenClose(false)} // Required for Android back button
      >
        <MicComponent
          handleMicPress={handleMicPress}
          isListening={isListening}
          setIsMicModalOpenClose={setIsMicModalOpenClose}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SelectDropLocation;

export const MicComponent = ({
  handleMicPress,
  isListening,
  setIsMicModalOpenClose,
}) => (
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
        <View style={styles.micCard}>
          <Icon name={isListening ? "mic" : "mic-none"} size={24} color="red" />
        </View>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        {isListening ? "Listening..." : "Tap the mic to start speaking"}
      </Text>
      <Pressable
        onPress={() => setIsMicModalOpenClose(false)}
        style={styles.closeModalBtn}
      >
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 10,
    position: "relative",
  },

  newInnerCard: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: "100%",
    height: "77%",
    // backgroundColor: "red",
    gap: 10,
  },

  whereToGoCard: {
    padding: 15,
    backgroundColor: "#fff",
    width: "100%",
    height: "75%",
    borderRadius: 20,
    elevation: 4,
    gap: 10,
  },

  homeWorLocationCard: {
    backgroundColor: "#fff",
    width: "100%",
    height: "25%",
    // backgroundColor: COLORS.cardBackground,
    justifyContent: "space-between",
    alignItems: "center",
    // elevation: 2,
  },

  images: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
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
    // paddingVertical: 15,
    gap: 15,
    // backgroundColor: "red",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 10,
  },
  modalContent: {
    width: "85%",
    padding: 20,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  micCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },

  micButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalBtn: {},
  closeText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
});
