import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { API } from "../../../../../Constants/url";
import SettingIconCard from "./SettingIconCard";
import ModalUI from "../../../utiles/Modal/Modal";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";

import DeleteModal from "./Modal/DeleteModal";

import { fonts } from "../../../fonts/Fonts";


const settingsData = [
  {
    name: "Delete Account",
    navigationScreen: null,
    isFunc: true,
  },
];

const AppSettingsScreen = () => {
  const [deletAcoountModal, setDeletAcoountModal] = useState(false);
  const handleDeleteAcoountModal = () => {
    setDeletAcoountModal(!deletAcoountModal);
  };

  const parentReturnFun = () => {
    handleDeleteAcoountModal();
  };

  return (
    <AppBarLayout title="App Settings" isPositionAppbar={true}>
      <View style={styles.innerCard}>
        {settingsData?.map((each, index) => (
          <SettingIconCard
            key={index}
            title={each.name}
            navigationText={each.navigationScreen}
            isFunc={each.isFunc}
            parentReturnFun={parentReturnFun}
          />
        ))}
      </View>

      <DeleteModal
        deletAcoountModal={deletAcoountModal}
        handleDeleteAcoountModal={handleDeleteAcoountModal}
      />

    </AppBarLayout>
  );
};

export default AppSettingsScreen;

const styles = StyleSheet.create({
  innerCard: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 110,
  },
});
