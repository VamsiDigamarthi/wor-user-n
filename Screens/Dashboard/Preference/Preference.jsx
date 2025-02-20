import { StyleSheet, View, ScrollView } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import PreferenceItem from "../../../Components/Dashboard/PreferenceCom/PreferenceItem/PreferenceItem";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "../../../Utils/CustomBottomSheet/CustomBottomSheet";

const Preference = ({ navigation }) => {
  const data = [
    {
      name: "Email",
      values: [
        {
          label: "Allow emails for promotions and offers",
        },
        {
          label: "Allow email for invoice",
        },
      ],
    },
    {
      name: "SMS & WhatsApp",
      values: [
        {
          label: "Allow SMS for promotions and offers",
        },
        {
          label: "Allow WhatsApp for promotions",
        },
        {
          label: "Allow WhatsApp for invoice",
        },
      ],
    },
    {
      name: "Push Notifications",
      values: [
        {
          label: "Allow push notifications for promotions",
        },
        {
          label: "Allow push notifications for invoice",
        },
      ],
    },
  ];

  const bottomSheetRef = useRef(null); // Ref for Custom Bottom Sheet
  const handleOpenSafetySheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  // State for checkboxes and radio button
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleCheckbox = (item) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(item);
      const updated = isChecked
        ? prev.filter((i) => i !== item)
        : [...prev, item];

      console.log("Updated Checked Items:", updated); // Debugging
      return updated;
    });
  };

  const handleRadioSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomeAppbar
          title="App Settings"
          onBack={() => navigation.goBack()}
        />
        {/* <View style={{ height: 100 }} /> */}
        <ScrollView style={styles.container}>
          {data.map((item, index) => (
            <PreferenceItem key={index} name={item.name} values={item.values} />
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={handleOpenSafetySheet}
          >
            <Text>Delete Account</Text>
            <Entypo name="chevron-right" size={24} color="#EA4C89" />
          </TouchableOpacity>
        </ScrollView>

        <CustomBottomSheet
          bottomSheetRef={bottomSheetRef}
          bgcolor="#fff"
          snapPoints={["50%", "70%"]}
          // manualCloseSheet={() => setScreen("main")}
        >
          <View style={{ padding: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
            >
              Delete Account Reason
            </Text>

            {[
              "Unserviceable in my area",
              "Moved to a different Ride Booking app",
              "Have my own vehicle own",
              "Change Mobile Number",
              "No exciting offers",
              "Poor app experiences",
              "other reason",
            ].map((reason, index) => (
              <View style={styles.itemContainer} key={index}>
                <Text style={styles.itemText}>{reason}</Text>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(reason)}
                  style={styles.radioButton}
                >
                  {checkedItems.includes(reason) && (
                    <View style={styles.radioSelected} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 12,
    gap: 25,
  },
  button: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
  radioButton: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 15,
    height: 15,
    backgroundColor: "#EA4C89",
    borderRadius: 7.5,
  },
});
