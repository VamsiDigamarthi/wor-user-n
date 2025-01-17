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

  const openLink = () => {
    const url = "https://nuhvin.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Drawer Toggle Vector */}
      {/* <Pressable
        style={{
          position: "absolute",
          height: 40,
          width: 40,
          top: 40,
          right: isDrawerOpen ? -15 : -40, 
          zIndex: 5,
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#e02e88",
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
       
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
       
      </Pressable> */}

      {/* Fixed Pink View with Border Radius */}
      {/* {isDrawerOpen && (
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
      )} */}

      {/* Scrollable Drawer Content */}

      {/* Profile Header */}
      <View style={[styles.headerContainer, { borderTopRightRadius: 20 }]}>
        <Image source={imageSrc} style={styles.profilePic} />
        <View style={{ gap: 10 }}>
          <Pressable
            onPress={() => handleItemPress("Profile")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={styles.profileName}>
              {profile?.name?.slice(0, 10)}
            </Text>

            <FontAwesome name="chevron-right" size={15} color="#B0B0B0" />
          </Pressable>

          <Pressable style={styles.starRating} onPress={onNavigateRatingScreen}>
            <FontAwesome name="star" size={20} color="gold" />
            <Text style={styles.profileEmail}>{avgRating}</Text>
          </Pressable>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.drawerContent}
        style={styles.drawer}
      >
        {/* Drawer Items */}
        <View style={[styles.drawerItemsContainer]}>
          <DrawerItem
            label="Help & WoR Support"
            icon={() => (
              <Ionicons name="wallet-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("HelpAndSupport")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("HelpAndSupport")}
          />
          <DrawerItem
            label="E-Wallet"
            icon={() => (
              <Ionicons name="person-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("WalletLoad")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("WalletLoad")}
          />

          <DrawerItem
            label="Parcel"
            icon={() => <Ionicons name="cube-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("ParcelHome")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Parcel Send")}
          />

          {/* <DrawerItem
            label="Profile"
            icon={() => (
              <Ionicons name="person-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Profile")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Profile")}
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
            label="My Rides"
            icon={() => <Ionicons name="time-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("RideHistory")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Ride History")}
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
            label="Notifications"
            icon={() => (
              <Ionicons name="notifications-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Notifications")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Notifications")}
          />

          <DrawerItem
            label="Donation"
            icon={() => (
              <Ionicons name="heart-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Donation")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Donation")}
          />

          <DrawerItem
            label="Refer to Earn"
            icon={() => <Ionicons name="gift-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("ReferAndEarn")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Refer to Earn")}
          />

          <DrawerItem
            label="Suggest to Wor"
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Suggestions")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Suggestions")}
          />

          {/* <DrawerItem
            label="Payment Method"
            icon={() => <Ionicons name="card-outline" size={22} color="gray" />}
            onPress={() => handleItemPress("PaymentMethod")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Payment Method")}
          /> */}

          {/* <DrawerItem
            label="Help"
            icon={() => (
              <Ionicons name="help-circle-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Help")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Help")}
          /> */}

          <DrawerItem
            label="Driving Schools"
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("DrivingSchools")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("DrivingSchools")}
          />
          <DrawerItem
            label="Settings"
            icon={() => (
              <Ionicons name="settings-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("About")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("About")}
          />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F7F7F7",
          width: "100%",
          paddingBottom: 10,
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text>A Product from</Text>
        <Pressable style={{}} onPress={openLink}>
          <Text
            style={{
              color: "#ff6600",
            }}
          >
            Nuhvin
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

function CustomDrawerItem({ title }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.labelStyle}>Suggest to Wor</Text>
      <Ionicons name="chevron-forward-outline" size={22} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  labelStyle: {
    fontSize: 16,
    color: "black",
  },

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
    gap: 10,
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#e0e0e0",
    // padding: 20,
    width: "100%",
    paddingTop: 80,
    flexDirection: "row",
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
    lineHeight: 25,

    // width: "80%",
    // borderWidth: 1,
    // borderColor: "red",
    // alignItems: "center",
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

  starRating: {
    flexDirection: "row",
    gap: 5,
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    width: 80,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
