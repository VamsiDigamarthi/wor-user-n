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
import ParSendRecDetailsDisplayCard from "../Components/ParSendRecDetailsDisplayCard";
import ParProtectDelivery from "../Components/ParProtectDelivery";
import { useSelector } from "react-redux";

const ParcelHomeScreen = () => {
  const {
    dropDetails,
    handleProtectedParcel,
    isProtectedParcel,
    onNavigateParcelPickUpLocationScreen,
  } = useParcelHomeScreenHook();

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Parcel" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ParSendReceiveCard />
        <View style={styles.tripDetailsCard}>
          <Text style={styles.tripDetailsText}>Trip Details: 1234567890</Text>
        </View>
        {dropDetails ? (
          <>
            <ParSendRecDetailsDisplayCard parcelDetails={dropDetails} />
            <ParProtectDelivery
              handleProtectedParcel={handleProtectedParcel}
              isChecked={isProtectedParcel}
            />
          </>
        ) : (
          <ParcSendReceInputCard />
        )}
        <SelectParcelType />
        <ParcelSpecification />
      </ScrollView>
      <ParcelBtnCard>
        <CustomBtn
          title="Continue"
          borderColor={dropDetails ? "#fff" : "rgba(255,255,255"}
          btnBg={dropDetails ? "#e02e88" : "#f7f7f7"}
          onPress={onNavigateParcelPickUpLocationScreen}
        />
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
