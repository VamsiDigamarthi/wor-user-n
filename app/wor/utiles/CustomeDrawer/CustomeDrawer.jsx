import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCustomerDrawerHook } from "./CustomerDrawer.hook";
import DrawerProfil from "./DrawerProfil";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import DrawerData from "./DrawerData";
import { fonts } from "../../fonts/Fonts";

const CustomeDrawer = (props) => {
  const { openLink, handleItemPress } = useCustomerDrawerHook(props);
  return (
    <View style={{ flex: 1 }}>
      <DrawerProfil />
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.drawerContent}
        style={styles.drawer}
      >
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
        </View>
      </DrawerContentScrollView>
      <View
        style={styles.textContainer}
      >
        <Text style={styles.text}>A Product from</Text>
        <Pressable style={{}} onPress={openLink}>
          <Text style={[styles.text,{color: "#ff6600"}]} >
          Nuhvin
          </Text>
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
  textContainer:{
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    width: "100%",
    paddingBottom: 10,
    justifyContent: "center",
    // gap: 10,
    alignItems: "center",
    padding: 10,
  }
});
