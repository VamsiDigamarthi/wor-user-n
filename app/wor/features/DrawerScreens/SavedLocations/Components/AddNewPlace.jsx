import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { fonts } from "../../../../fonts/Fonts";
import { useNavigation } from "@react-navigation/native";
import { setHomeOrWorkPlaceType } from "../../../ridebooking/selectdroplocation/redux/homePlaceType.slice";
import { useDispatch } from "react-redux";

const AddNewPlace = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleNavigateToSelectDropLocation = () => {
    dispatch(setHomeOrWorkPlaceType("second-homeplace"));
    navigation.navigate("SelectDropLocation", {
      isMic: false,
    });
  };

  return (
    <View style={styles.addPlaceBtn}>
      <TouchableOpacity
        style={{ backgroundColor: "#e0e0e0", borderRadius: 7 }}
        onPress={handleNavigateToSelectDropLocation}
      >
        <MaterialIcons name="add" size={24} color="#EA4C89" />
      </TouchableOpacity>
      <Text style={{ fontFamily: fonts.robotoRegular }}>Add New Place</Text>
    </View>
  );
};

export default AddNewPlace;

const styles = StyleSheet.create({
  addPlaceBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingBottom: 15,
  },
});
