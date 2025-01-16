import { useNavigation } from "@react-navigation/native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ProfileRatingRideCountCard from "./Components/ProfileRatingRideCountCard/ProfileRatingRideCountCard";
import ProfileNavigationCard from "./Components/ProfileNavigationCard/ProfileNavigationCard";
import { StyleSheet, View } from "react-native";
const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Profile" onBack={() => navigation.goBack()} />
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <ProfileCard />
          <ProfileRatingRideCountCard />
        </View>

        <View style={styles.bottomContainer}>
          <ProfileNavigationCard
            navigateTo="PersonalInfoPreview"
            title="Personal Information"
          />
          <ProfileNavigationCard
            navigateTo="ProfileDocumentScreen"
            title="Gender Identity (Aadhar)"
          />

          <ProfileNavigationCard
            navigateTo="EmergencyContactNumber"
            title="Emergency Contact Number"
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 12,
    // backgroundColor: "red",
  },

  innerContainer: {
    paddingHorizontal: 5,
    gap: 15,
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
