import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import personIcon from "../../../../assets/images/sosimages/personIcon.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomRadioBtn from "../../../../Utils/CustomRadioBtn/CustomRadioBtn";
import CustomBtn from "../.././../../Utils/CustomBtn/CustomBtn";
// import PersonIconWithName from "../../../../Components/Dashboard/HomeComponents/BottomSheetComponents/PersonIconWithName";
import PersonIconWithName from "../../../../Screens/Dashboard/Home/BottosheetScreens/components/PersonIconWithName";
import { useLiveLocationHook } from "./LiveLocation.hook";

const radioData = [
  {
    name: "thisRide",
    actuvalName: "1 Hour",
  },
  {
    name: "oneHour",
    actuvalName: "4 Hours",
  },
  {
    name: "twoHours",
    actuvalName: "Until I Stop",
  },
];

export default function LiveLocation({ onPress }) {
  const {
    profile,
    handlerNavigateEmergencyConcatScreen,
    activeRadioBtn,
    handlerChangeActiveRadioBtn,
    sendToOtherApps,
    shareLocation,
  } = useLiveLocationHook();

  return (
    <>
      <View style={styles.mainCard}>
        <View style={{ justifyContent: "center", paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => onPress("main")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: 8,
            }}
          >
            <FontAwesome name="chevron-left" size={15} color="#e02e88" />
            <Text>back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Share your ride to your trusted ones for your safety
          </Text>
          <Text>You can share up to 5 members via whatsapp</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {profile?.emergencyContact?.map((each, index) => (
            <PersonIconWithName
              key={index}
              name={each?.name}
              mobile={each?.mobile}
              onClick={() => shareLocation(each?.mobile)}
            />
          ))}

          {/* Conditionally render the 'Add' button based on the number of contacts */}
          {profile?.emergencyContact?.length < 5 && (
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                display:
                  profile?.emergencyContact?.length < 5 ? "flex" : "none", // Make sure it's hidden after 5 contacts
              }}
            >
              <TouchableOpacity
                onPress={handlerNavigateEmergencyConcatScreen}
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "#e02e88",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Ionicons name="add-circle-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={{ marginTop: 10, gap: 20, width: "100%", padding: 20 }}>
        <Text style={{ textAlign: "center" }}>Live Location Duration</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {radioData?.map((eachRadioData, index) => (
            <Pressable
              key={index}
              onPress={() => handlerChangeActiveRadioBtn(eachRadioData?.name)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <CustomRadioBtn
                  isSelected={activeRadioBtn === eachRadioData?.name}
                />
                <Text>{eachRadioData?.actuvalName}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <CustomBtn
          onPress={sendToOtherApps}
          title="Share with other apps"
          btnBg="#e02e88"
          btnColor="#fff"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    gap: 8,
    position: "relative",
    width: "100%",
    padding: 20,
  },
});
