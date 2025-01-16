import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { imageUrl } from "../../Constants/url";
import defaultImg from "../../assets/images/profile/Services.png";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const CustomDrawerContent = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Track drawer open/close
  const [selectedItem, setSelectedItem] = useState("");
  const { profile } = useSelector((state) => state.profileSlice);
  const [avgRating, setAvgRating] = useState("");

  const [imageSrc, setImageSrc] = useState(
    profile?.profilePic
      ? { uri: `${imageUrl}/${profile.profilePic}` }
      : defaultImg
  );

  // console.log(profile);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle drawer state
  };

  const handleItemPress = (itemName) => {
    setSelectedItem(itemName); // Set selected item
    props.navigation.navigate(itemName); // Navigate to the corresponding screen
  };

  const getItemStyle = (itemName) => {
    return itemName === selectedItem
      ? { backgroundColor: "#fff5f9" } // Highlight selected item
      : {}; // Default style
  };

  // let image = profile
  //   ? `${imageUrl}/${profile?.profilePic}`
  //   : "https://via.placeholder.com/80";

  const onNavigateRatingScreen = () => {
    props.navigation.navigate("Rating", {
      avgRating,
    }); // Navigate to the RatingScreen
  };

  const calculateAverageRating = (reviews) => {
    if (reviews?.length === 0) return 0; // Avoid division by zero

    const totalRating = reviews?.reduce((sum, order) => sum + order.rating, 0);
    return totalRating / reviews?.length;
  };

  useEffect(() => {
    if (profile) {
      // console.log(profile);
      setAvgRating(calculateAverageRating(profile?.reviews)?.toFixed(1));
    }
  }, [profile]);

  // const openLink = () => {
  //   const url = "https://nuhvin.com"; // Replace with your desired URL
  //   Linking.openURL(url).catch((err) =>
  //     console.error("Failed to open URL:", err)
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* Drawer Toggle Vector */}
      <Pressable
        // onPress={toggleDrawer}
        style={{
          position: "absolute",
          height: 40,
          width: 40,
          top: 40,
          right: isDrawerOpen ? -15 : -40, // Adjust placement based on drawer state
          zIndex: 5,
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#e02e88",
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
          // borderRadius:20,
          elevation: 5,

          flexDirection: "row",
        }}
      >
        <MaterialCommunityIcons
          style={{ paddingLeft: 4 }}
          name="code-tags"
          size={22}
          color="white"
        />
        {/* <Ionicons
          // name={isDrawerOpen ? "chevron-back" : "chevron-forward"}
          name="chevron-back"
          size={20}
          color="#fff"
        />
        <Ionicons
          name="chevron-forward"
          // name={isDrawerOpen ? "chevron-back" : "chevron-forward"}
          size={20}
          color="#fff"
        /> */}
      </Pressable>

      {/* Fixed Pink View with Border Radius */}
      {isDrawerOpen && (
        <View
          style={{
            position: "absolute",
            height: "100%",
            backgroundColor: "#e02e88",
            width: 1,
            right: 0,
            overflow: "hidden",
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            zIndex: 10,
          }}
        />
      )}

      {/* Scrollable Drawer Content */}

      {/* Profile Header */}
      <View style={[styles.headerContainer, { borderTopRightRadius: 20 }]}>
        <Image source={imageSrc} style={styles.profilePic} />
        <Text style={styles.profileName}>{profile?.name}</Text>

        <Pressable
          style={{
            flexDirection: "row",
            gap: 5,
            paddingTop: 5,
            alignItems: "center",
          }}
          onPress={onNavigateRatingScreen}
        >
          <FontAwesome name="star" size={20} color="gold" />
          <Text style={styles.profileEmail}>{avgRating}</Text>
        </Pressable>
      </View>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.drawerContent}
        style={styles.drawer}
      >
        {/* Drawer Items */}
        <View style={[styles.drawerItemsContainer]}>
          {/* <DrawerItem
            label="Wallet"
            icon={() => (
              <Ionicons name="wallet-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Wallet")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Wallet")}
          /> */}
          <DrawerItem
            label="Profile"
            icon={() => (
              <Ionicons name="person-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Profile")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Profile")}
          />
          {/* <DrawerItem
            label="Notifications"
            icon={() => (
              <Ionicons name="notifications-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Notifications")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Notifications")}
          /> */}
          <DrawerItem
            label="Parcel"
            icon={() => <Ionicons name="cube-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("ParcelHome")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Parcel Send")}
          />
          <DrawerItem
            label="Ride History"
            icon={() => <Ionicons name="time-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("RideHistory")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Ride History")}
          />
          <DrawerItem
            label="Payment Method"
            icon={() => <Ionicons name="card-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("PaymentMethod")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Payment Method")}
          />
          {/* <DrawerItem
            label="Favorites"
            icon={() => (
              <MaterialIcons name="favorite-border" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("DrawerFavorite")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Favorites")}
          /> */}
          <DrawerItem
            label="Safety"
            icon={() => (
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="gray"
              />
            )}
            onPress={() => handleItemPress("Safety")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Safety")}
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
          {/* <DrawerItem
            label="Donation"
            icon={() => (
              <Ionicons name="heart-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Donation")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Donation")}
          /> */}

          <DrawerItem
            label="Refer to Earn"
            icon={() => <Ionicons name="gift-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("ReferAndEarn")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Refer to Earn")}
          />
          <DrawerItem
            label="About"
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Settings")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Settings")}
          />
          <DrawerItem
            label="Suggestions"
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Suggestions")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Suggestions")}
          />
        </View>

        {/* Logout Button at the End */}
        {/* <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          icon={() => <Ionicons name="exit-outline" size={22} color="red" />}
          onPress={() => {
            // Add your logout functionality here
            console.log("Logged out");
          }}
          labelStyle={styles.logoutLabel}
        />
      </View> */}

        {/* <View style={styles.loginBottomCard}>
          <Text style={styles.loginBottomCardText}>A Product From</Text>
          <Pressable onPress={openLink}>
            <Text style={styles.companyName}>Nuhvin</Text>
          </Pressable>
        </View> */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    position: "relative",
  },
  drawerContent: {
    paddingTop: 0,
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
    paddingTop: 50,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e02e88",
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
    marginTop: 0,
  },
  labelStyle: {
    marginLeft: -10,
  },
  loginBottomCard: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(202, 193, 198, 0.38)",
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 4,
  },

  loginBottomCardText: {
    color: "#2d2d2d",
    fontSize: 15,
  },
});

export default CustomDrawerContent;
