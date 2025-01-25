import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { imageUrl } from "../../Constants/url";
import defaultImg from "../../assets/images/profile/Services.png";
import DrawerData from "./DrawerData.js";
const CustomDrawerContent = (props) => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const { profile } = useSelector((state) => state.profileSlice);
  const [avgRating, setAvgRating] = useState("");

  const imageSrc = profile?.profilePic
    ? { uri: `${imageUrl}/${profile.profilePic}` }
    : defaultImg;

  const handleItemPress = (itemName) => {
    setSelectedItem(itemName); // Set selected item
    props.navigation.navigate(itemName); // Navigate to the corresponding screen
  };

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
      {/* Profile Header */}
      <View style={[styles.headerContainer, { gap: 20, marginBottom: 15 }]}>
        <View style={{ width: "30%" }}>
          <Image source={imageSrc} style={styles.profilePic} />
        </View>
        <View style={{ gap: 10, width: "70%" }}>
          <Pressable
            onPress={() => handleItemPress("Profile")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
              width: "100%",
            }}
          >
            <Text style={[styles.profileName]} numberOfLines={2}>
              {profile?.name}
            </Text>

            <FontAwesome name="chevron-right" size={15} color="#B0B0B0" />
          </Pressable>

          <Pressable style={styles.starRating} onPress={onNavigateRatingScreen}>
            <FontAwesome name="star" size={14} color="gold" />
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
          {DrawerData.map((e, index) => {
            return (
              <CustomDrawerItem
                key={index}
                label={e.label}
                onPress={() => handleItemPress(e.screenName)}
                icon={e.icon}
              />
            );
          })}
          {/* 
          <FlatList
            data={DrawerData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CustomDrawerItem
                label={item.label}
                onPress={() => handleItemPress(item.screenName)}
                icon={item.icon}
              />
            )}
          /> */}

          {/* <DrawerItem
            label="Profile"
            icon={() => (
              <Ionicons name="person-outline" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("Profile")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Profile")}
          /> */}

          {/* <DrawerItem
            label="Favorites"
            icon={() => (
              <MaterialIcons name="favorite-border" size={22} color="gray" />
            )}
            onPress={() => handleItemPress("DrawerFavorite")}
            labelStyle={styles.labelStyle}
            style={getItemStyle("Favorites")}
          /> */}

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

function CustomDrawerItem({ label, onPress, icon }) {
  return (
    <View style={styles.drccontainer}>
      <Image source={icon} style={styles.iconImg} />
      <TouchableOpacity onPress={onPress} style={styles.textCard}>
        <Text style={styles.text}>{label}</Text>
        <FontAwesome name="chevron-right" size={15} color="#B0B0B0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },

  drccontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    // paddingRight: 10,
  },
  textCard: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingRight: 15,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 5,
    // backgroundColor: "red",
    width: "100%",
    // borderColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingLeft: 20,
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
    paddingHorizontal: 30,
    // paddingVertical: 15,
    alignItems: "center",
    // gap: 0,
    // justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderBottomColor: "#e0e0e0",
    // height: 200,

    // padding: 20,
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 40,
    padding: 10,
    // marginBottom: 5,
    borderWidth: 1,
    borderColor: "#eac4f9",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 25,
    // width: "50%",

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
    padding: 2,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    width: 50,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
