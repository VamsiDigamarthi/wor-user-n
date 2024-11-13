import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import IconButton from "../../../Utils/IconButton/IconButton";
import { usePickLocationHook } from "./PickLocation.hook";
import DropLocationItem from "../../../Components/Dashboard/DropLocation/Components/DropLocationItem/DropLocationItem";

const PickLocation = () => {
  const {
    inputValue,
    handleInputChange,
    suggestions,
    onUserSelectDropLocationByEnterInput,
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
            // onPress={onNavigateToMapPreviewScreen}
            icons="location"
            title="Select on Map"
          />
        </View>
      </View>
      {suggestions?.length > 0 ? (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <DropLocationItem
              mainPlace={item?.name}
              subPlace={item?.vicinity}
              eachPlace={item}
              onPress={onUserSelectDropLocationByEnterInput.bind(this, item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>
            Please Search Your Pick Up Location
          </Text>
          <Text style={styles.orText}>Or</Text>
          <Text style={styles.noDataText}>Select on Map</Text>
        </View>
      )}
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
    paddingVertical: 7,
    paddingHorizontal: 10,
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
});
