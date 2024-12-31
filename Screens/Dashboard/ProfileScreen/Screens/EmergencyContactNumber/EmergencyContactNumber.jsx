import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FlatList, Image } from "react-native";
import { pickContact } from "react-native-contact-pick"; // Imported the contact picker
import { showMessage } from "react-native-flash-message";
import { API } from "../../../../../Constants/url";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import ModalUI from "../../../../../Utils/Modal/Modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Permissions from "react-native-permissions"; // Import permissions

import topimg from "../../../../../assets/images/emergency-scooty.png";

const EmergencyContactNumber = () => {
  const routes = useRoute();

  const { isHomeSafetyScreen } = routes.params || {};
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [userBackendContactNumber, setUserBackendContactNumber] =
    useState(null);
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();

  useEffect(() => {
    handlerFetchEmergencyConcats();
  }, []);

  // Function to check and request permission to access contacts
  const requestContactsPermission = async () => {
    const result = await Permissions.request(
      Permissions.PERMISSIONS.ANDROID.READ_CONTACTS
    );
    return result === Permissions.RESULTS.GRANTED;
  };

  // Function to handle opening the contact picker
  const handlerOpenContactNumber = async () => {
    const permissionGranted = await requestContactsPermission();
    if (!permissionGranted) {
      Alert.alert(
        "Permission required",
        "Please grant contact permission to add a contact."
      );
      return;
    }

    try {
      const contact = await pickContact();
      if (contact) {
        const existingContact = userBackendContactNumber.find(
          (e) => e.mobile === contact.phoneNumbers[0].number
        );
        if (existingContact) {
          Alert.alert(
            "This Contact is already Added to your Emergency Contacts"
          );
          return;
        }
        handlerSaveContactNumberToBackend(contact);
      }
    } catch (error) {
      console.error("Error picking contact:", error);
    }
  };

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
          error?.response?.data?.message || "Failed to fetch contact numbers",
        type: "danger",
        icon: "auto",
      });
    }
  };

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
        message: response?.data?.message || "Successfully Deleted..! ",
        type: "success",
        icon: "auto",
      });
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "failed to delete contact number",
        type: "danger",
        icon: "auto",
      });
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.numberCard}>
      <Pressable onPress={() => handlerSaveContactNumberToBackend(item)}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View style={styles.contactImage}></View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {item.name}
            </Text>
            {item.mobile && (
              <Text style={styles.mobileText}>{item.mobile}</Text>
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

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Emergency Contact Number"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 90 }} />
      <AddTrusted />
      <View style={styles.bottomCard}>
        {!userBackendContactNumber && <Text>No Contact, you can add</Text>}
        <FlatList
          data={userBackendContactNumber}
          keyExtractor={(item) => item._id}
          renderItem={renderContact}
        />
      </View>
      {userBackendContactNumber?.length !== 5 && (
        <TouchableOpacity onPress={handlerOpenContactNumber}>
          <View style={styles.addContactContainer}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
            <Text style={styles.addContactText}>
              Add {5 - userBackendContactNumber?.length} More Contacts
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmergencyContactNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
    backgroundColor: "#fff5f9",
  },
  bottomCard: {},
  numberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  contactImage: {
    backgroundColor: "#d9dadb",
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  mobileText: { color: "#757575", fontWeight: "bold", fontSize: 14 },
  addContactContainer: { flexDirection: "row", gap: 10, alignItems: "center" },
  addContactText: { fontSize: 14, fontWeight: "bold", color: "#757575" },
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
