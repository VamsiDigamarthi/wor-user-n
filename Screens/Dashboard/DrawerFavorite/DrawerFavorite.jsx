import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import RideHistoryItem from "../RideHistory/RideHistoryItem";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import ParcelAddres from "../../Parcels/ParcelSavePlaces/Components/ParcelAddres";

const DrawerFavorite = () => {
  const navigation = useNavigation();
  const [isFavoriteOrParcelAddress, setIsFavoriteOrParcelAddress] =
    useState(false);
  const onChangeFavoriteToParcelAddress = () => {
    setIsFavoriteOrParcelAddress(false);
  };
  const onChangeToParcelAddress = () => {
    setIsFavoriteOrParcelAddress(true);
  };
  // console.log(isFavoriteOrParcelAddress);
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Favorite" onBack={() => navigation.goBack()} />
      <View style={{ height: 90 }} />
      <TabBtns
        onChangeFavoriteToParcelAddress={onChangeFavoriteToParcelAddress}
        isFavoriteOrParcelAddress={isFavoriteOrParcelAddress}
        onChangeToParcelAddress={onChangeToParcelAddress}
      />
      {isFavoriteOrParcelAddress ? (
        <ParcelAddres />
      ) : (
        <>
          <RideHistoryItem isFavoriteOrRideHistory={false} />
          <RideHistoryItem isFavoriteOrRideHistory={false} />
        </>
      )}
    </View>
  );
};

export default DrawerFavorite;

const TabBtns = ({
  onChangeFavoriteToParcelAddress,
  isFavoriteOrParcelAddress,
  onChangeToParcelAddress,
}) => (
  <View style={styles.tabBtns}>
    <CustomBtn
      title="Rides"
      btnBg={!isFavoriteOrParcelAddress ? "#E02E88" : "#fff"}
      btnColor={!isFavoriteOrParcelAddress ? "#fff" : "#E02E88"}
      width="40%"
      onPress={onChangeFavoriteToParcelAddress}
    />
    <CustomBtn
      title="Parcel Address"
      btnBg={isFavoriteOrParcelAddress ? "#E02E88" : "#fff"}
      btnColor={isFavoriteOrParcelAddress ? "#fff" : "#E02E88"}
      width="40%"
      onPress={onChangeToParcelAddress}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },

  tabBtns: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
