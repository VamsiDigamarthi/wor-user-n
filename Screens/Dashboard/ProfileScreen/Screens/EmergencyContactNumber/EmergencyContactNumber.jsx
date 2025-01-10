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
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import topimg from "../../../../../assets/images/emergency-scooty.png";
import { API } from "../../../../../Constants/url";

const ProfileEmergencyContact = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { isHomeSafetyScreen } = routes.params || {};
  const { token } = useSelector((state) => state.token);
  const [userBackendContactNumber, setUserBackendContactNumber] = useState([]);

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
      if (permissionStatus === RESULTS.GRANTED) {
        openContactPicker();
      } else {
        const requestStatus = await request(permissionType);
        if (requestStatus === RESULTS.GRANTED) {
          openContactPicker();
        } else {
          Alert.alert(
            "Permission Denied",
            "We need contact access to proceed."
          );
        }
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
  const renderContact = ({ item }) => (
    <View style={styles.numberCard}>
      <Pressable>
        <View style={styles.contactRow}>
          <View style={styles.contactImage} />
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
    <View style={{ flex: 1 }}>
      <CustomeAppbar
        title="Emergency Contacts"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <AddTrusted />
        <View style={styles.bottomCard}>
          <Text style={styles.sectionTitle}>
            You can add up to 5 emergency contacts.
          </Text>
          <View style={styles.separator} />
          <FlatList
            data={userBackendContactNumber}
            keyExtractor={(item) => item._id || item.mobile}
            renderItem={renderContact}
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
    </View>
  );
};

const AddTrusted = () => (
  <View style={styles.topCard}>
    <Image style={styles.topImg} source={topimg} />
    <View style={{ width: "60%", gap: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Add Trusted Contact Numbers
      </Text>
      <Text style={{ fontSize: 10 }}>
        The emergency contact numbers are used for safety purposes.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#fff5f9",
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
  },
  contactName: { fontWeight: "bold", fontSize: 14 },
  mobileText: { color: "#757575", fontWeight: "bold", fontSize: 14 },
  addContactContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  addContactText: { fontSize: 14, fontWeight: "bold", color: "#757575" },
  separator: { backgroundColor: "#e02e88", height: 2, marginTop: 2 },
  topCard: { flexDirection: "row", padding: 12, marginTop: 10, height: 200 },
  topImg: { height: 120, width: 150, resizeMode: "contain" },
  sectionTitle: { fontWeight: "bold", fontSize: 14 },
});

export default ProfileEmergencyContact;
