import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SafetyFirst from "./Components/SafetyFirst";
import { COLORS } from "../../../Constants/colors";
import SafetyThird, { SingleCard } from "./Components/SafetyThird";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
export default function SafetyHome() {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{}}
      style={{ gap: 10, backgroundColor: COLORS.bottomSheetBg }}
    >
      <CustomeAppbar title="Favorite" onBack={() => navigation.goBack()} />
      <View style={{ height: 100 }} />
      <SafetyFirst />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 20,
          backgroundColor: "#fff",
          gap: 10,
        }}
      >
        <SecondText />
        <SafetyThird />
        <Text style={{ color: "#e02e88", fontWeight: "600", fontSize: 15 }}>
          Please note, all these safety features only work in case of an online
          ride through our app. Do not accept offline rides.
        </Text>
        <Text style={{ color: COLORS.heading, fontWeight: "600" }}>
          THINGS YOU CAN DO
        </Text>
        <SingleCard
          title="Helmet always"
          text="While riding a Bike-Taxi, always ask for a helmet. In case you don't receive one, inform us via feedback."
        />
        <SingleCard
          title="Live location sharing"
          text="For friends & family to track the live status of your ride."
        />

        <SingleCard
          title="Your ride. Your rules"
          text="You have every right to ask the Captain to drive as per your comfort, within traffic rules."
        />
        <SingleCard
          title="Add trusted contacts"
          text="Make sure to add contacts of your loved ones as trusted contacts. This will help you reach out to them easily."
        />
        <View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#f2f0f0",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: COLORS.borderColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="chatbubbles-outline" size={20} color="#e02e88" />
            </View>
            <Text
              numberOfLines={1}
              style={{ fontSize: 16, fontWeight: "600", color: COLORS.heading }}
            >
              Don't share personal information
            </Text>
          </View>
          <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
            •⁠ Do not share your contact details with the Captain.- Do not share
            location via Whatsapp or any third party app.
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
            •⁠ ⁠Use communication methods available on the app only.
          </Text>
        </View>
        <SingleCard
          title="Always share feedback"
          text="After every ride, help us know about your experiences so we can make our service safer and more pleasant."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

const SecondText = () => (
  <View style={{ gap: 5 }}>
    <Text style={{ fontSize: 16, color: COLORS.heading, fontWeight: "600" }}>
      Safety all the Way
    </Text>
    <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
      At Rapido, your safety comes first. Here are some measures and provisions
      to ensure your safety, every time
    </Text>
  </View>
);
