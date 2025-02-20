import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Modal,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import IconButton from "../../../Utils/IconButton/IconButton";
import { usePickLocationHook } from "./PickLocation.hook";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";
import { useNavigation } from "@react-navigation/native";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { MicComponent } from "../../Dashboard/SelectDropLocation/SelectDropLocation";
import { FontAwesome5 } from "@expo/vector-icons";
const PickLocation = () => {
  const {
    inputValue,
    handleInputChange,
    suggestions,
    nearbyPlaces,
    onUserSelectDropLocationByEnterInput,
    onUserSelectPickLocationNearPlaces,
    onYourLocationClick,
    onNavigateToMapPreviewScreen,
    onNavigateToFavoriteScreen,
    loadings,
    // Mic Related pross
    isMicModalOpenClose,
    setIsMicModalOpenClose,
    isListening,
    handleMicPress,
    micVoiceText,
  } = usePickLocationHook();

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <CustomeAppbar
          title="Send or Receive Parcel"
          onBack={() => navigation.goBack()}
        />

        <View style={{ height: 80 }} />

        <View style={styles.innerCard}>
          <View style={styles.pickDropBtnCard}>
            <FontAwesome6 name="location-dot" size={20} color="#31ff10" />
            <TextInput
              value={micVoiceText ? micVoiceText : inputValue}
              onChangeText={handleInputChange}
              placeholder="Enter Your Location"
              style={{ width: "75%", height: "100%" }}
            />
            <Pressable onPress={() => setIsMicModalOpenClose(true)}>
              <FontAwesome5 name="microphone" size={20} color="#EA4C89" />
            </Pressable>
          </View>
          <View style={styles.mapFavoriteCard}>
            <IconButton
              onPress={onNavigateToMapPreviewScreen}
              icons="location"
              title="Select on Map"
            />
            <IconButton
              icons="location"
              title="Favorite Places"
              onPress={onNavigateToFavoriteScreen}
            />
          </View>
        </View>
        <Pressable onPress={onYourLocationClick}>
          <View style={styles.yourLocation}>
            <View style={styles.first}>
              <Ionicons name="location" size={25} color="#fff" />
            </View>
            <Text style={styles.yourLocationText}>Your Location</Text>
          </View>
        </Pressable>
        {loadings ? (
          <View
            style={{
              width: "100%",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color="#EA4C89" size={30} />
          </View>
        ) : (
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
                  onPress={onUserSelectPickLocationNearPlaces.bind(this, item)}
                />
              )
            }
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* mic modal */}

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
    </>
  );
};

export default PickLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 20,
  },
  innerCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 5,
    // padding: 10,
    gap: 3,
  },
  pickDropBtnCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomColor: "#fff5f9",
    borderBottomWidth: 1,
    padding: 10,
  },
  mapFavoriteCard: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    gap: 15,
  },
  noData: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  orText: {
    fontSize: 17,
    color: "#EA4C89",
    fontWeight: "600",
  },
  noDataText: {
    fontSize: 13,
    color: "#808080",
  },
  yourLocation: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  yourLocationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  first: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
});
