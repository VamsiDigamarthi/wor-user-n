import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ParcelSendReceivesCard from "../../../Components/Parcels/ParcelHomeCom/ParcelSendReceivedCard/ParcelSendReceivesCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const ParcelHome = () => {
  const navigation = useNavigation();

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const onHandleNavigateLocationScreen = () => {
    // Navigate to the location screen
    navigation.navigate("SendReceiveParcel", { selectedCard });
  };

  return (
    <View style={styles.container}>
      <ParcelSendReceivesCard
        handleCardClick={handleCardClick}
        selectedCard={selectedCard}
      />
      <Image
        style={styles.image}
        source={require("../../../assets/images/parcels/parcel 1.png")}
      />
      <View style={styles.positionCard}>
        <CustomBtn
          title="Continue"
          btnBg={selectedCard ? "#e02e88" : "#fff"}
          btnColor={selectedCard ? "#fff" : "#e02e88"}
          borderColor="#e02e88"
          borderWidth={1}
          onPress={selectedCard && onHandleNavigateLocationScreen}
        />
      </View>
    </View>
  );
};

export default ParcelHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
    position: "relative",
    // backgroundColor: "red",
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 400,
  },
});
