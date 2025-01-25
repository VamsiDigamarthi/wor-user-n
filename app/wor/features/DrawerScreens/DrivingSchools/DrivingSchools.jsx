import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import Search from "./Components/Search";
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import SliderComponent from "../../../../../Utils/SliderComponent/SliderComponent";
import Card from "./Components/Card";
export default function DrivingSchools() {
  return (

    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomeAppbar
        title="Driving Schools"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.container}>
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
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  searchCard: {
    marginTop: 10,
    gap: 10,
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
  },
});
