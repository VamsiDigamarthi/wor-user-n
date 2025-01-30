import { Linking, StyleSheet, Text, View } from "react-native";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { settingsData } from "./settingsData";
import SettingIconCard from "./SettingIconCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ModalUI from "../../../utiles/Modal/Modal";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { fonts } from "../../../fonts/Fonts";

const About = () => {
  const [logOutModal, setLogOutModal] = useState(false);
  const handleOpenCloseLogoutModal = () => {
    setLogOutModal(!logOutModal);
  };

  const navigation = useNavigation();
  const onNavPrivacy = () => {
    Linking.openURL("https://womenrider.nuhvin.com/privacypolicy").catch(
      (e) => {
        console.log(e);
      }
    );
  };

  const onNavTermsAndConditon = () => {
    Linking.openURL("https://womenrider.nuhvin.com/termsandconditions").catch(
      (e) => {
        console.log(e);
      }
    );
  };

  const logOut = () => {
    handleOpenCloseLogoutModal();
    AsyncStorage.removeItem("token");
    navigation.navigate("AuthStack");
  };

  const parentReturnFun = (text) => {
    switch (text) {
      case "Terms And Condition":
        onNavTermsAndConditon();
        break;
      case "Privacy Policy":
        onNavPrivacy();
        break;
      case "Software License":
        onNavTermsAndConditon();
        break;
      case "Logout":
        // logOut();
        setLogOutModal(true);
        break;
      default:
        null;
    }
  };

  return (
    <AppBarLayout title="Settings" isPositionAppbar={true}>
      <View style={styles.innerCard}>
        {settingsData?.map((each, index) => (
          <SettingIconCard
            key={index}
            icon={each.icon}
            title={each.name}
            navigationText={each.navigationScreen}
            isFunc={each.isFunc}
            parentReturnFun={parentReturnFun}
          />
        ))}
      </View>
      <ModalUI
        openCloseState={logOutModal}
        closeModalFun={handleOpenCloseLogoutModal}
        rightBtnText="Ok Continue"
        rightBtnFun={logOut}
      >
        <Text style={{ fontFamily: fonts.robotoRegular }}>
          Are you sure want to logout
        </Text>
      </ModalUI>
    </AppBarLayout>
  );
};

export default About;

const styles = StyleSheet.create({
  innerCard: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 100,
  },
});
