import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useCustomerDrawerHook } from "./CustomerDrawer.hook";
import DrawerProfil from "./DrawerProfil";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import DrawerData from "./DrawerData";
import { fonts } from "../../fonts/Fonts";
import { FontAwesome } from "@expo/vector-icons";

const CustomeDrawer = (props) => {
  const { openLink, handleItemPress, worUserAppOpen } =
    useCustomerDrawerHook(props);
  return (
    <View style={{ flex: 1 }}>
      <DrawerProfil />
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.drawerContent}
        style={styles.drawer}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={[styles.drawerItemsContainer]}
        >
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
        </ScrollView>
      </DrawerContentScrollView>
      <Pressable onPress={worUserAppOpen} style={styles.worUser}>
        <View style={styles.worUserInnercard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../../assets/images/scooty-removebg-preview.png")}
                style={{ width: 30, height: 50, resizeMode: "contain" }}
              />
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ fontWeight: "600" }}>
                  Drive. Acquire. Empowerment.
                </Text>
                <Text
                  style={{ textAlign: "center", fontSize: 14, color: "gray" }}
                >
                  Earn Your Own
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <FontAwesome name="chevron-right" size={20} color="#B0B0B0" />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.text}>A Product from</Text>
        <Pressable style={{}} onPress={openLink}>
          <Text style={[styles.text, { color: "#ff6600" }]}>Nuhvin</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomeDrawer;

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    position: "relative",
  },
  drawerContent: {
    paddingTop: 0,
  },
  drawerItemsContainer: {
    marginTop: 0,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
    color: "gray",
  },
  textContainer: {
    flexDirection: "row",
    // backgroundColor: "#F7F7F7",
    width: "100%",
    paddingBottom: 10,
    // justifyContent: "center",
    // gap: 10,
    // alignItems: "center",
    padding: 10,
    paddingLeft: 20,
  },

  worUser: {
    width: "100%",
    padding: 10,
    height: 90,
    // backgroundColor: "red",
  },
  worUserInnercard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: "100%",
  },
});
