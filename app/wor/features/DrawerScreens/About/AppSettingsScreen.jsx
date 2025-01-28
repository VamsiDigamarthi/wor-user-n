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
import { fonts } from "../../../fonts/Fonts";

const settingsData = [
  {
    name: "Delete Account",
    navigationScreen: null,
    isFunc: true,
  },
];

const AppSettingsScreen = () => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const [deletAcoountModal, setDeletAcoountModal] = useState(false);
  const handleDeleteAcoountModal = () => {
    setDeletAcoountModal(!deletAcoountModal);
  };

  const parentReturnFun = () => {
    handleDeleteAcoountModal();
  };

  const handleDeleteAccount = async () => {
    try {
      await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      handleDeleteAcoountModal();
      AsyncStorage.removeItem("token");
      navigation.navigate("AuthStack");
    } catch (error) {
      console.log(error);
      showMessage({
        message: error?.response?.data?.message || "Account deletion failed",
        type: "danger", // 'success' | 'info' | 'warning' | 'danger'
        icon: "auto",
      });
    }
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
      <ModalUI
        openCloseState={deletAcoountModal}
        closeModalFun={handleDeleteAcoountModal}
        rightBtnText="Ok Continue"
        rightBtnFun={handleDeleteAccount}
      >
        <Text style={{fontFamily:fonts.robotoRegular}}>Are you sure want to delete account ?</Text>
      </ModalUI>
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
