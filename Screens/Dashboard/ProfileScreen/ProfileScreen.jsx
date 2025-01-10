import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ProfileCard from "../../../Components/Dashboard/ProfileCom/ProfileCard/ProfileCard";
import ProfileRatingRideCountCard from "../../../Components/Dashboard/ProfileCom/ProfileRatingRideCountCard/ProfileRatingRideCountCard";
import ProfileNavigationCard from "../../../Components/Dashboard/ProfileCom/ProfileNavigationCard/ProfileNavigationCard";
import Settingsitem from "../../../Components/Dashboard/settingscom/SettingsItem/Settingsitem";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const onLogOutHandler = async () => {
    await AsyncStorage.removeItem("token");
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Ensures the specified route is the only route in the stack
        routes: [{ name: "AuthStack" }], // Replace 'Home' with your target screen name
      })
    );
  };

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Profile" onBack={() => navigation.goBack()} />
      <View style={{ height: 60 }}>
        <View style={styles.topContainer}>
          <ProfileCard />
          <ProfileRatingRideCountCard />
        </View>

        <View style={styles.bottomContainer}>
          <Settingsitem
            iconName="person-outline"
            iconType="Ionicons"
            label="Personal Information"
            screenName="PersonalInfoPreview"
          />
          <Settingsitem
            iconName="document-text-outline"
            iconType="Ionicons"
            label="Government Id"
            screenName="ProfileDocumentScreen"
          />
          <Settingsitem
            iconName="contacts"
            iconType="AntDesign"
            label="Emergency Contact Number"
            screenName="EmergencyContactNumber"
          />
          {/* <Settingsitem
          iconName="logout"
          iconType="MaterialIcons"
          label="Logout"
          onPress={onLogOutHandler}
          // screenName="PersonalInfoPreview"
        /> */}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    // paddingVertical: 12,
    gap: 15,
    // backgroundColor: "red",
  },

  topContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
  },

  bottomContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    // height: 100,
  },
});
