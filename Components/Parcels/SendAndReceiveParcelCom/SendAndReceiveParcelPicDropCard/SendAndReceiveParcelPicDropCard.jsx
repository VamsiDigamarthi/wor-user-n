import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SendAndReceiveParcelPicDropCardItem from "./SendAndReceiveParcelPicDropCardItem";
import IconButton from "../../../../Utils/IconButton/IconButton";
import { useNavigation } from "@react-navigation/native";

const SendAndReceiveParcelPicDropCard = ({ pickUpLocationCoorWithName }) => {
  const navigation = useNavigation();

  const onNavigateToPickLocationScreen = (typeOfLocation) => {
    navigation.navigate("ParcelPickLocation");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <SendAndReceiveParcelPicDropCardItem
          title="Collect From:"
          subTitle="Add sender address"
          iconName="location-dot"
          iconColor="green"
          bottomBorder={styles.borderStyle}
          onPress={() => onNavigateToPickLocationScreen("Pick Up")}
          dataFromPickLocation={pickUpLocationCoorWithName}
        />
        <SendAndReceiveParcelPicDropCardItem
          title="Delivery To:"
          subTitle="Add receiver address"
          iconName="location-arrow"
          iconColor="#e02e88"
          onPress={() => onNavigateToPickLocationScreen("Drop")}
        />
      </View>
      <View style={styles.mapFavoriteCard}>
        {/* <IconButton
          // onPress={onNavigateToMapPreviewScreen}
          icons="location"
          title="Select on Map"
        /> */}
        <IconButton
          icons="location"
          title="Favorite Places"
          // onPress={onNavigateToFavoriteScreen}
        />
      </View>
    </View>
  );
};

export default SendAndReceiveParcelPicDropCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    gap: 2,
  },
  innerCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
  },
  borderStyle: {
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 1,
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
});
