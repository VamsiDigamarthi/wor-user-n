import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MicIcon, SearchIcons } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsBeforeBook } from "../../sharedLogics/rideDetailsSlice";
import { colors } from "../../../../colors/colors";
import { fonts } from "../../../../fonts/Fonts";

const HomeInput = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateSelectDestinationScreen = ({ isMic }) => {
    dispatch(setIsBeforeBook(true));
    navigation.navigate("SelectDropLocation", { isMic: isMic });
  };
  return (
    <View style={styles.container}>
      <SearchIcons size={26} color="#222222" />
      <Pressable
        style={{ flex: 1, justifyContent: "center", marginTop: 5 }}
        onPress={() => navigateSelectDestinationScreen({ isMic: false })}
      >
        <Text
          style={{
            fontSize: 18,
            flex: 1,
            fontFamily: fonts.robotoMedium,
            color: "#757575",
          }}
        >
          Search Destination
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigateSelectDestinationScreen({ isMic: true })}
        style={styles.micIcons}
      >
        <MicIcon size={22} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default HomeInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 10,
    gap: 10,
    marginBottom: 10,
    marginTop: -10,
    // elevation: 5,
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 22,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 2,
    height: 44,
  },
});
