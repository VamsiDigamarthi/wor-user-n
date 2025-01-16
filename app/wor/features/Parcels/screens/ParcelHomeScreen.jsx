import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import ParSendReceiveCard from "../Components/ParSendReceiveCard";
import { useParcelHomeScreenHook } from "../Hooks/ParcelHomeScreenHook";
import ParcSendReceInputCard from "../Components/ParcSendReceInputCard";
import SelectParcelType from "../Components/SelectParcelType";
import ParcelSpecification from "../Components/ParcelSpecification";
import ParcelBtnCard from "../Components/ParcelBtnCard";
import CustomBtn from "../../../utiles/CustomBtn";

const ParcelHomeScreen = () => {
  const { selectedCard, setSelectedCard, setSelectParcelType } =
    useParcelHomeScreenHook();

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Parcel" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ParSendReceiveCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <View style={styles.tripDetailsCard}>
          <Text style={styles.tripDetailsText}>Trip Details: 1234567890</Text>
        </View>
        <ParcSendReceInputCard sendOrReceiveTextDisplay={selectedCard} />
        <SelectParcelType setSelectParcelType={setSelectParcelType} />
        <ParcelSpecification />
      </ScrollView>
      <ParcelBtnCard>
        <CustomBtn title="Continue" btnBg="#f7f7f7" />
      </ParcelBtnCard>
    </View>
  );
};

export default ParcelHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  scrollViewContent: {
    padding: 10,
    gap: 15,
    flexGrow: 1,
    paddingBottom: 120,
  },
  tripDetailsCard: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#f1e0e8",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tripDetailsText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
