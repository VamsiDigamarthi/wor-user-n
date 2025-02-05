import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import Search from "./Components/Search";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import SliderComponent from "../../../../../Utils/SliderComponent/SliderComponent";
import Card from "./Components/Card";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { COLORS } from "../../../../../Constants/colors";
export default function DrivingSchools() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <AppBarLayout title="Driving School" isPositionAppbar={true}>
        <View style={[styles.container,{paddingTop : Platform.OS=="ios" ? 110 : 100}]}>
          <SliderComponent />

          <View style={styles.searchCard}>
            <Text style={styles.heading}>Driving Schools in Your Location</Text>
            <Search />
          </View>

          <ScrollView
            contentContainerStyle={{
              marginTop: 20,
              gap: 10,
            }}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </ScrollView>
        </View>
      </AppBarLayout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:COLORS.mainBackgroundColor
  },

  searchCard: {
    marginTop: 10,
    gap: 10,
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  heading: {
    // fontWeight: "bold",
    fontFamily:fonts.robotoSemiBold,
    textAlign: "left",
    fontSize: 16,
  },
});
