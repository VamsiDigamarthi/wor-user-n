import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import IconButton from "../../../Utils/IconButton/IconButton";
import { usePickLocationHook } from "./PickLocation.hook";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";

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
  } = usePickLocationHook();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.innerCard}>
        <View style={styles.pickDropBtnCard}>
          <FontAwesome6 name="location-dot" size={20} color="#31ff10" />
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Enter Your Location"
          />
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
            // onPress={onNavigateToFavoriteScreen}
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
              onPress={onUserSelectPickLocationNearPlaces.bind(this, item)}
            />
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PickLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 26,
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
    color: "#e02e88",
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
    backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
});
