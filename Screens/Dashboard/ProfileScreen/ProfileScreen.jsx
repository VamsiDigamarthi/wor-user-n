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
      <View style={{ height: 60 }} />
      <ProfileCard />
      <ProfileRatingRideCountCard />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: "space-between",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Settingsitem
          iconName="person-outline"
          iconType="Ionicons"
          label="Personal Info"
          screenName="PersonalInfoPreview"
        />
        <Settingsitem
          iconName="document-text-outline"
          iconType="Ionicons"
          label="Document"
          screenName="ProfileDocumentScreen"
        />
        <Settingsitem
          iconName="contacts"
          iconType="AntDesign"
          label="Emergency Contact Number"
          screenName="EmergencyContactNumber"
        />
        <Settingsitem
          iconName="logout"
          iconType="MaterialIcons"
          label="Logout"
          onPress={onLogOutHandler}
          // screenName="PersonalInfoPreview"
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
    // backgroundColor: "red",
  },
});
