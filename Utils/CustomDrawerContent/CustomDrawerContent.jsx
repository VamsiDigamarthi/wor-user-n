import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemPress = (itemName) => {
    setSelectedItem(itemName); // Set selected item
    props.navigation.navigate(itemName); // Navigate to the corresponding screen
  };

  const getItemStyle = (itemName) => {
    return itemName === selectedItem
      ? { backgroundColor: "#fff5f9" } // Highlight selected item
      : {}; // Default style
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      style={styles.drawer} // Ensure the scroll view fills the screen
    >
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          label="Home"
          icon={() => <Ionicons name="home-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("Home")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Home")}
        />
        <DrawerItem
          label="Notifications"
          icon={() => (
            <Ionicons name="notifications-outline" size={22} color="gray" />
          )}
          onPress={() => handleItemPress("Notifications")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Notifications")}
        />
        <DrawerItem
          label="Ride History"
          icon={() => <Ionicons name="time-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("RideHistory")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Ride History")}
        />
        <DrawerItem
          label="Safety"
          icon={() => (
            <Ionicons name="shield-checkmark-outline" size={22} color="gray" />
          )}
          onPress={() => handleItemPress("Safety")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Safety")}
        />
        <DrawerItem
          label="Donation"
          icon={() => <Ionicons name="heart-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("Donation")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Donation")}
        />
        <DrawerItem
          label="Payment Method"
          icon={() => <Ionicons name="card-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("Payment Method")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Payment Method")}
        />
        <DrawerItem
          label="Help"
          icon={() => (
            <Ionicons name="help-circle-outline" size={22} color="gray" />
          )}
          onPress={() => handleItemPress("Help")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Help")}
        />
        <DrawerItem
          label="Parcel Send"
          icon={() => <Ionicons name="cube-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("Parcel Send")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Parcel Send")}
        />
        <DrawerItem
          label="Refer to Earn"
          icon={() => <Ionicons name="gift-outline" size={22} color="gray" />}
          onPress={() => handleItemPress("ReferAndEarn")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Refer to Earn")}
        />
        <DrawerItem
          label="Settings"
          icon={() => (
            <Ionicons name="settings-outline" size={22} color="gray" />
          )}
          onPress={() => handleItemPress("Settings")}
          labelStyle={styles.labelStyle}
          style={getItemStyle("Settings")}
        />
      </View>

      {/* Logout Button at the End */}
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          icon={() => <Ionicons name="exit-outline" size={22} color="red" />}
          onPress={() => {
            // Add your logout functionality here
            console.log("Logged out");
          }}
          labelStyle={styles.logoutLabel}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1, // Ensure it fills the screen and allows scrolling
  },
  drawerContent: {
    paddingTop: 0, // Remove any top padding to eliminate white space
  },
  headerContainer: {
    backgroundColor: "#fff5f9",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777",
  },
  drawerItemsContainer: {
    marginTop: 0, // Ensure no extra margin between items
  },
  labelStyle: {
    marginLeft: -10, // Decrease space between icon and label by 10px
  },
  logoutContainer: {
    marginTop: "auto", // Place the logout button at the bottom
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  logoutLabel: {
    color: "red",
  },
});

export default CustomDrawerContent;
