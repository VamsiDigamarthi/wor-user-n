import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import IconButton from "../../../../utiles/IconButton";
import { useNavigation } from "@react-navigation/native";
import CancelRideModal from "../Modals/CancelRideModal";

const RideButtonCard = () => {
  const [cancelModal, setCancelModal] = useState(false);
  const handleChangeModal = () => {
    setCancelModal(!cancelModal);
  };

  const navigation = useNavigation();
  const handelNavigateWorSupport = () => {
    navigation.navigate("Chat", {
      isWorSupport: true,
    });
  };
  return (
    <>
      <View style={styles.btnCard}>
        <IconButton
          icons="cross"
          title="Cancel Ride"
          iconsName="Entypo"
          onPress={handleChangeModal}
        />
        <IconButton
          icons="support-agent"
          title="Support"
          iconsName="MaterialIcons"
          // isSelected={isSelectFavoritePlaces}
          onPress={handelNavigateWorSupport}
        />
      </View>
      <CancelRideModal
        closeCancelModal={handleChangeModal}
        openCancelModal={cancelModal}
      />
    </>
  );
};

export default RideButtonCard;

const styles = StyleSheet.create({
  btnCard: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
