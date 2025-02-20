import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../fonts/Fonts";
import { ScootyImg, AutoImg, CabImg } from "../../../../Images/Universal";

const RideHistoryItem = ({ ride, isFavoriteOrRideHistory = true }) => {
  const navigation = useNavigation();

  const onNavigateToRideDetailScreen = () => {
    navigation.navigate("RideHistoryDetailView", { ride });
  };

  return (
    <Pressable style={styles.mainCont} onPress={onNavigateToRideDetailScreen}>
      <View style={styles.imageContainer}>
        <Image
          source={
            ride?.vehicleType == "car"
              ? CabImg
              : ride?.vehicleType == "auto"
              ? AutoImg
              : ScootyImg
          }
          style={styles.Image}
        />
        <View style={styles.midContainer}>
          <Text
            style={styles.dropAddress}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ride?.dropAddress}
          </Text>
          <Text style={styles.subAddr} numberOfLines={1} ellipsizeMode="tail">
            {ride?.dropVicinity}
          </Text>
          <Text style={styles.time}>{ride?.orderPlaceDate}</Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.status,
            { color: ride?.status == "cancelled" ? "red" : "#1dad07" },
          ]}
        >
          {ride?.status}
        </Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default RideHistoryItem;

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#Ebebeb",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "80%",
  },
  Image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  midContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  dropAddress: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 14,
    width: "100%",
    textAlign: "left",
  },
  subAddr: {
    fontSize: 12,
    color: "#757575",
    width: "100%",
    textAlign: "left",
    fontFamily: fonts.robotoRegular,
  },
  time: {
    fontSize: 12,
    color: "#757575",
    width: "100%",
    textAlign: "left",
    fontFamily: fonts.robotoRegular,
  },
  rightContainer: {
    width: "20%",
    // height: "100%",
    alignItems: "flex-end",
    gap: 10,
    justifyContent: "space-between", // Centers status text
  },
  status: {
    fontSize: 12,
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
    color: "#4CAF50",
  },
});
