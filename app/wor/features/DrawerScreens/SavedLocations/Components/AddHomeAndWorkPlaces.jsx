import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TopCard from "./TopCard";
import AddHomePlaceBtn from "../../../ridebooking/selectdroplocation/Components/AddHomePlaceBtn";
import { useSelector } from "react-redux";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const AddHomeAndWorkPlaces = () => {
  const { homePlace, workPlace, otherHomePlace } = useSelector(
    (state) => state.homePlaces
  );
  // console.log("otherHomePlace", otherHomePlace);

  return (
    <>
      {homePlace && (
        <TopCard
          title="Home"
          subtitle={homePlace?.name}
          icon={<Entypo name="home" size={24} color="#EA4C89" />}
          editDeleteType="home"
          entireItem={homePlace}
        />
      )}

      {workPlace && (
        <TopCard
          title="Work"
          subtitle={workPlace?.name}
          icon={<MaterialIcons name="work" size={24} color="#EA4C89" />}
          editDeleteType="work"
          entireItem={workPlace}
        />
      )}
      {otherHomePlace?.map((eachPlace, index) => (
        <TopCard
          key={index}
          title={eachPlace?.type}
          subtitle={eachPlace?.name}
          icon={<MaterialIcons name="place" size={24} color="#EA4C89" />}
          editDeleteType="home"
          entireItem={eachPlace}
        />
      ))}
      {/* {otherHomePlace && (
        <TopCard
          title="Work"
          subtitle={otherHomePlace?.name}
          icon={<Entypo name="home" size={24} color="#EA4C89" />}
          editDeleteType="home"
          entireItem={otherHomePlace}
        />
      )} */}
    </>
  );
};

export default AddHomeAndWorkPlaces;

const styles = StyleSheet.create({});
