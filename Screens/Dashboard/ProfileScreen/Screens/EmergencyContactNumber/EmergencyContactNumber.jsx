import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import React, { useEffect, useState } from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import topimg from "../../../../../assets/images/emergency-scooty.png";
import women from "../../../../../assets/images/women.jpg";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import Contacts from "react-native-contacts";
import { PermissionsAndroid, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { pickContact } from "react-native-contact-pick"; // Imported the contact picker
import { API } from "../../../../../Constants/url";
import { useSelector } from "react-redux";

const ProfileEmergencyContact = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { isHomeSafetyScreen } = routes.params || {};
  const { token } = useSelector((state) => state.token);
  const [contacts, setContacts] = useState([]);
  const [userBackendContactNumber, setUserBackendContactNumber] =
    useState(null);

  // Fetch emergency contacts from backend
  const handlerFetchEmergencyConcats = async () => {
    try {
      const response = await API.get("/captain/emergency-contact", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUserBackendContactNumber(response.data);
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "Failed to fetch contact number",
        type: "danger",
        icon: "auto",
      });
    }
  };

  useEffect(() => {
    handlerFetchEmergencyConcats();
  }, []);

  // Request and check permissions before opening the contact picker
  const handlerOpenContactNumber = async () => {
    if (Platform.OS === "android") {
      const permissionStatus = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (permissionStatus === RESULTS.GRANTED) {
        openContactPicker();
      } else {
        const requestStatus = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
        if (requestStatus === RESULTS.GRANTED) {
          openContactPicker();
        } else {
          Alert.alert(
            "Permission Denied",
            "We need contact access to continue."
          );
        }
      }
    } else {
      // For iOS, request permission if needed
      const permissionStatus = await check(PERMISSIONS.IOS.CONTACTS);
      if (permissionStatus === RESULTS.GRANTED) {
        openContactPicker();
      } else {
        const requestStatus = await request(PERMISSIONS.IOS.CONTACTS);
        if (requestStatus === RESULTS.GRANTED) {
          openContactPicker();
        } else {
          Alert.alert(
            "Permission Denied",
            "We need contact access to continue."
          );
        }
      }
    }
  };

  // Function to open the contact picker and handle contact selection
  const openContactPicker = async () => {
    try {
      const contact = await pickContact();
      if (contact) {
        // Check if the contact is already in the emergency contacts
        const existingContact = userBackendContactNumber.find(
          (e) => e.mobile === contact.phoneNumbers[0].number
        );

        if (existingContact) {
          Alert.alert(
            "This Contact is already Added to your Emergency Contacts"
          );
          return; // Return early to prevent further actions
        }

        // Save new contact if it's not already in the list
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
    try {
      const response = await API.patch(
        "/captain/emergency-contact",
        {
          name: contact?.fullName,
          mobile: contact?.phoneNumbers?.[0]?.number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      handlerFetchEmergencyConcats();
      showMessage({
        message: response?.data?.message || "Successfully Added!",
        type: "success",
        icon: "auto",
      });
      if (isHomeSafetyScreen) {
        navigation.goBack();
      }
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "Failed to add contact number",
        type: "danger",
        icon: "auto",
      });
    }
  };

  // Delete emergency contact
  const handlerDeleteContactNumber = async (contactNumber) => {
    try {
      const response = await API.patch(
        `/captain/delete-emergency-contact/${contactNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      handlerFetchEmergencyConcats();
      showMessage({
        message: response?.data?.message || "Successfully Deleted!",
        type: "success",
        icon: "auto",
      });
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "Failed to delete contact number",
        type: "danger",
        icon: "auto",
      });
    }
  };

  const renderContact = ({ item }) => {
    return (
      <View style={styles.numberCard}>
        <Pressable onPress={() => handlerSaveContactNumberToBackend(item)}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#fff",
                height: 60,
                width: 60,
                borderRadius: 60,
                backgroundColor: "#d9dadb",
              }}
            ></View>

            <View>
              {item?.name && (
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {item?.name}
                </Text>
              )}
              {item?.mobile && (
                <Text
                  style={{
                    color: "#757575",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {item?.mobile}
                </Text>
              )}
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          onPress={() => handlerDeleteContactNumber(item?.mobile)}
        >
          <FontAwesome5 name="trash-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Emergency Contact"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 80 }} />
      <AddTrusted />
      <View style={styles.bottomCard}>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          You Can Add Up To 5 Numbers
        </Text>
        <View style={{ backgroundColor: "#e02e88", height: 2, marginTop: 2 }} />
        {!userBackendContactNumber && <Text>No Contact You can add</Text>}
        <View style={{ marginTop: 20 }}>
          {userBackendContactNumber?.length && (
            <FlatList
              data={userBackendContactNumber}
              keyExtractor={(item) => item._id}
              renderItem={renderContact}
            />
          )}
        </View>
      </View>
      {userBackendContactNumber?.length !== 5 && (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
          <TouchableOpacity onPress={handlerOpenContactNumber}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#757575" }}
            >
              Add {5 - userBackendContactNumber?.length} More Contacts
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
    backgroundColor: "#fff5f9",
  },
  topCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    height: 200,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  topImg: {
    height: 120,
    resizeMode: "contain",
    width: 150,
    position: "relative",
    top: 60,
  },
  bottomCard: {},
  numberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

const AddTrusted = () => (
  <View style={styles.topCard}>
    <Image style={styles.topImg} source={topimg} />
    <View style={{ width: "60%", gap: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        Add Trusted Contact Numbers
      </Text>
      <Text style={{ fontSize: 10 }}>
        The Emergency contact numbers are used for safety purposes
      </Text>
    </View>
  </View>
);

export default ProfileEmergencyContact;
