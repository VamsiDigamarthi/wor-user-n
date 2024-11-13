import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ParcelSendReceivesCard from "../../../Components/Parcels/ParcelHomeCom/ParcelSendReceivedCard/ParcelSendReceivesCard";
import { useSendAndReceiveParcelHook } from "./SendAndReceiveParcel.hook";
import SendAndReceiveParcelPicDropCard from "../../../Components/Parcels/SendAndReceiveParcelCom/SendAndReceiveParcelPicDropCard/SendAndReceiveParcelPicDropCard";
import SelectParcelType from "../../../Components/Parcels/SendAndReceiveParcelCom/SelectParcelType/SelectParcelType";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import ParcelSpecification from "../../../Components/Parcels/SendAndReceiveParcelCom/ParcelSpecification/ParcelSpecification";

const screenWidth = Dimensions.get("window").width;

const SendAndReceiveParcel = () => {
  const { selectedCard, pickUpLocationCoorWithName } =
    useSendAndReceiveParcelHook();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 15,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ParcelSendReceivesCard selectedCard={selectedCard} />
        <SendAndReceiveParcelPicDropCard
          pickUpLocationCoorWithName={pickUpLocationCoorWithName}
        />
        <SelectParcelType />
        <ParcelSpecification />
      </ScrollView>
      <View style={styles.positionCard}>
        <CustomBtn
          title="Continue"
          btnBg="#e02e88"
          btnColor="#fff"
          borderColor="#e02e88"
          borderWidth={1}
          //   onPress={selectedCard && onHandleNavigateLocationScreen}
        />
      </View>
    </View>
  );
};

export default SendAndReceiveParcel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
    position: "relative",
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
});
