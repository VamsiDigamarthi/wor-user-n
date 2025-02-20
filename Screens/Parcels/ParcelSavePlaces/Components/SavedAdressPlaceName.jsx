import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../../Constants/colors";
import { useNavigation } from "@react-navigation/native";

const SavedAdressPlaceName = ({
  pickUpLocationCoorWithName,
  typeOfLocation,
}) => {
  const navigation = useNavigation();
  const onHandlerNavigateToParcelPickUpLocationScreen = () => {
    navigation.navigate("ParcelPickLocation", { typeOfLocation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerStyle}>
        <Entypo name="location-pin" size={30} color="#EA4C89" />
      </View>
      <View style={styles.innerCard}>
        <Text
          style={{ fontSize: 14, fontWeight: "600", color: COLORS.heading }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {pickUpLocationCoorWithName?.name}
        </Text>
        <Text
          style={{ fontSize: 12, color: COLORS.subHeading }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {pickUpLocationCoorWithName?.vicinity}
        </Text>
      </View>
      <Pressable onPress={onHandlerNavigateToParcelPickUpLocationScreen}>
        <View style={styles.centerStyle}>
          <Entypo name="edit" size={20} color="gray" />
        </View>
      </Pressable>
    </View>
  );
};

export default SavedAdressPlaceName;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    // backgroundColor: "red",
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  innerCard: {
    width: "70%",
    // backgroundColor: "red",
    gap: 5,
  },
  centerStyle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
