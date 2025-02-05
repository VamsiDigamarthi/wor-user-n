import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { pickContact } from "react-native-contact-pick";
import CustomeAppbar from "../../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { topImg } from "../../../../../Images/ProfileImages";
import { API } from "../../../../../../../Constants/url";
import { fonts } from "../../../../../fonts/Fonts";

import AppBarLayout from "../../../../ridebooking/sharedLogics/AppBarLayout";
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import reactNativeContacts from "react-native-contacts";


const ProfileEmergencyContact = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { isHomeSafetyScreen } = routes.params || {};
  const { token } = useSelector((state) => state.token);
  const [userBackendContactNumber, setUserBackendContactNumber] = useState([]);

  const colors = ["#FFFCF5", "#FAFBFF", "#F4F1FF", "#F3FCFB", "#fff"];

  // Fetch emergency contacts from backend
  const handlerFetchEmergencyConcats = async () => {
    try {
      const response = await API.get("/captain/emergency-contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserBackendContactNumber(response.data || []);
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "Failed to fetch contact numbers",
        type: "danger",
        icon: "auto",
      });
    }
  };

  useEffect(() => {
    handlerFetchEmergencyConcats();
  }, []);

  // Open Contact Picker with permission handling
  const handlerOpenContactNumber = async () => {
    const permissionType =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS;
  
    try {
      const permissionStatus = await check(permissionType);
      console.log('Permission Status:', permissionStatus); // Add this line for debugging
  
      if (permissionStatus === RESULTS.GRANTED) {
        openContactPicker();
      } else if (permissionStatus === RESULTS.DENIED) {
        const requestStatus = await request(permissionType);
        console.log('Request Status:', requestStatus); // Add this line for debugging
        
        if (requestStatus === RESULTS.GRANTED) {
          openContactPicker();
        } else {
          Alert.alert("Permission Denied", "We need contact access to proceed.");
        }
      } else if (permissionStatus === RESULTS.UNAVAILABLE) {
        Alert.alert("Permission Unavailable", "Contacts permission is unavailable on this device.");
      }
    } catch (error) {
      console.error("Permission error:", error);
    }
  };
  
  // Open Contact Picker and handle selection
  const openContactPicker = async () => {
    try {
      const contact = await pickContact();
      if (contact) {
        const existingContact = userBackendContactNumber.find(
          (e) => e.mobile === contact.phoneNumbers[0].number
        );

        if (existingContact) {
          Alert.alert("This contact is already added.");
          return;
        }

        handlerSaveContactNumberToBackend(contact);
      }
    } catch (error) {
      console.error("Error picking contact:", error);
      showMessage({
        message: "Failed to pick contact.",
        type: "danger",
        icon: "auto",
      });
    }
  };

  // Save contact number to backend
  const handlerSaveContactNumberToBackend = async (contact) => {
    console.log(contact);

    try {
      const response = await API.patch(
        "/captain/emergency-contact",
        {
          name: contact?.fullName,
          mobile: contact?.phoneNumbers[0].number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handlerFetchEmergencyConcats();
      showMessage({
        message: response?.data?.message || "Successfully added!",
        type: "success",
        icon: "auto",
      });
      
      if (isHomeSafetyScreen) navigation.goBack();
    } catch (error) {
      console.error("Save contact error:", error);
      showMessage({
        message:
          error?.response?.data?.message || "Failed to add contact number.",
        type: "danger",
        icon: "auto",
      });
    }
  };

  // Delete contact from backend
  const handlerDeleteContactNumber = async (contactNumber) => {
    try {
      const response = await API.patch(
        `/captain/delete-emergency-contact/${contactNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handlerFetchEmergencyConcats();
      showMessage({
        message: response?.data?.message || "Successfully deleted!",
        type: "success",
        icon: "auto",
      });
    } catch (error) {
      console.error("Delete contact error:", error);
      showMessage({
        message:
          error?.response?.data?.message || "Failed to delete contact number.",
        type: "danger",
        icon: "auto",
      });
    }
  };

  // Render a single contact item
  const renderContact = (item, index) => (
    <View style={styles.numberCard}>
      <Pressable>
        <View style={styles.contactRow}>
          <View
            style={[styles.contactImage, { backgroundColor: colors[index] }]}
          >
            <Text style={styles.letter}>{item?.name?.toString()[0]}</Text>
          </View>
          <View>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.mobileText}>{item.mobile}</Text>
          </View>
        </View>
      </Pressable>
      <TouchableOpacity onPress={() => handlerDeleteContactNumber(item.mobile)}>
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (

     <AppBarLayout title="Gender Identity" isPositionAppbar={true}>
      
      <View style={[styles.container, {paddingTop : Platform.OS=="ios" ? 100 : 80}]}>
        {/* <AddTrusted /> */}
        <View style={styles.bottomCard}>
          <Text style={styles.text}>
            This feature helps you feel safer on your rides. If you feel
            uncomfortable, you can use "Secure Call." This will pretend to call
            your emergency contacts. Note: This feature doesn't actually call
            anyone. It just makes you feel safer.
          </Text>

          <Text style={styles.sectionTitle}>You can add up to 5 Numbers</Text>
          <View style={styles.separator} />
          <FlatList
            data={userBackendContactNumber}
            keyExtractor={(item, index) =>
              item._id || item.mobile || index.toString()
            }
            renderItem={({ item, index }) => renderContact(item, index)} // ✅ Pass item & index correctly
          />
        </View>
        {userBackendContactNumber?.length < 5 && (
          <View style={styles.addContactContainer}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
            <TouchableOpacity onPress={handlerOpenContactNumber}>
              <Text style={styles.addContactText}>
                Add {5 - userBackendContactNumber?.length} more contacts
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AppBarLayout>
  );
};

// const AddTrusted = () => (
//   <View style={styles.topCard}>
//     <Image style={styles.topImg} source={topImg} />
//     <View style={{ width: "60%", gap: 10 }}>
//       <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//         Add Trusted Contact Numbers
//       </Text>
//       <Text style={{ fontSize: 10 }}>
//         The emergency contact numbers are used for safety purposes.
//       </Text>
//     </View>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    // paddingVertical: 15,
    backgroundColor: "#f7f7f7",
    paddingTop: 120,
  },

  bottomCard: { marginTop: 20 },
  numberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  contactImage: {
    backgroundColor: "#d9dadb",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  contactName: {
    fontFamily: fonts.robotoRegular,
    fontSize: 12,
    color: "#757575",
  },
  mobileText: {
    // color: "#757575",
    fontFamily: fonts.robotoBold,
    fontSize: 14,
  },
  addContactContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  addContactText: {
    fontSize: 14,
    fontFamily: fonts.robotoSemiBold,
    color: "#757575",
  },
  separator: { backgroundColor: "#E0E0E0", height: 2, marginVertical: 8 },
  topCard: { flexDirection: "row", padding: 12, marginTop: 10, height: 200 },
  topImg: { height: 120, width: 150, resizeMode: "contain" },
  sectionTitle: { fontFamily: fonts.robotoBold, fontSize: 14 },

  letter: {
    fontWeight: "bold",
    fontFamily: fonts.robotoBold,
    fontSize: 18,
  },

  text: {
    fontFamily: fonts.robotoRegular,
    marginBottom: 10,
    textAlign: "justify",
  },
});

export default ProfileEmergencyContact;
