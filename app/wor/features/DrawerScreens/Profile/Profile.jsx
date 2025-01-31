import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ProfileRatingRideCountCard from "./Components/ProfileRatingRideCountCard/ProfileRatingRideCountCard";
import ProfileNavigationCard from "./Components/ProfileNavigationCard/ProfileNavigationCard";
import { StyleSheet, View } from "react-native";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import {
  emergencycontact,
  genderidentity,
  mpin,
  personalInfo,
} from "../../../Images/ProfileImages";
const ProfileScreen = () => {
  return (
    <AppBarLayout title="Profile" isPositionAppbar={true}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <ProfileCard />
          <ProfileRatingRideCountCard />
        </View>

        <View style={styles.bottomContainer}>
          <ProfileNavigationCard
            icon={personalInfo}
            navigateTo="PersonalInfoPreview"
            title="Personal Information"
          />
          <ProfileNavigationCard
            icon={genderidentity}
            navigateTo="ProfileDocumentScreen"
            title="Gender Identity (Aadhar)"
          />
          <ProfileNavigationCard
            navigateTo="SetNewMpin"
            title="M-Pin"
            icon={mpin}
          />

          <ProfileNavigationCard
            navigateTo="EmergencyContactNumber"
            title="Emergency Contact Number"
            icon={emergencycontact}
          />
        </View>
      </View>
    </AppBarLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 15,
    backgroundColor: "#f7f7f7",
    flex: 1,
    paddingTop: 100,
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
