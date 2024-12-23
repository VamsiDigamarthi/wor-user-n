import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../../../Constants/colors";
import { useEffect, useState } from "react";
import ModalUI from "../../../../../Utils/Modal/Modal";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../../../Constants/url";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native";

import topimg from "../../../../../assets/images/emergency-scooty.png";
import { useSelector } from "react-redux";

import { pickContact } from "react-native-contact-pick"; // Imported the contact picker

import { showMessage } from "react-native-flash-message";

const EmergencyContactNumber = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const onOpenAddContactHandler = () => {
    setIsAddContactOpen(!isAddContactOpen);
  };

  const { token } = useSelector((state) => state.token);

  const [userBackendContactNumber, setUserBackendContactNumber] =
    useState(null);

  console.log(userBackendContactNumber);

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
          error?.response?.data?.message || "failed to fetch contact number",
        type: "danger",
        icon: "auto",
      });
    }
  };

  useEffect(() => {
    handlerFetchEmergencyConcats();
  }, []);

  const handlerOpenContactNumber = async () => {
    const contact = await pickContact(); // Use react-native-contact-pick to open contacts
    if (contact) {
      // Check if the contact is already in the emergency contacts
      const existingContact = userBackendContactNumber.find(
        (e) => e.mobile === contact.phoneNumbers[0].number
      );

      if (existingContact) {
        Alert.alert("This Contact is already Added to your Emergency Contacts");
        return; // Return early to prevent the rest of the code from executing
      }

      // If no existing contact, save the new contact
      handlerSaveContactNumberToBackend(contact);
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
        message: response?.data?.message || "Successfully Added..! ",
        type: "success",
        icon: "auto",
      });
      if (isHomeSafetyScreen) {
        navigation.goBack();
      }
    } catch (error) {
      showMessage({
        message:
          error?.response?.data?.message || "failed to add contact number",
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

  const navigation = useNavigation();

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
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {item.name}
              </Text>
              {/* {item.phoneNumbers?.length > 0 && (
                <Text
                  style={{
                    color: "#757575",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {item.phoneNumbers[0].number}
                </Text>
              )} */}

              {item.mobile && (
                <Text
                  style={{
                    color: "#757575",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {item.mobile}
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
        title="Emergency Contact Number"
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
          <FlatList
            data={userBackendContactNumber}
            keyExtractor={(item) => item._id}
            renderItem={renderContact}
          />
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

export default EmergencyContactNumber;

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
