import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Text,
  Pressable,
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
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#f5f2f2" /> */}
      <CustomeAppbar title="Destination" onBack={() => navigation.goBack()} />
      <View style={{ height: 80 }} />
      <View style={styles.pickDropBtnCard}>
        {/* this show pick drop card use show home screens also */}
        <ShowPickDropCard
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          placeName={placeName}
          micVoiceText={micVoiceText}
          setIsMicModalOpenClose={setIsMicModalOpenClose}
        />
        <View style={styles.mapFavoriteCard}>
          <IconButton
            onPress={onNavigateToMapPreviewScreen}
            icons="location"
            title="Select on Map"
            iconsName="Ionicons"
          />
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
    </View>
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
    backgroundColor: "#fff5f9",
    paddingHorizontal: 10,
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
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    backgroundColor: COLORS.cardBackground,
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
