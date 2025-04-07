import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { fonts } from "../../../../fonts/Fonts";
import { useNavigation } from "@react-navigation/native";
import { setHomeOrWorkPlaceType } from "../../../ridebooking/selectdroplocation/redux/homePlaceType.slice";
import { useDispatch } from "react-redux";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import CustomBtn from "../../../../utiles/CustomBtn";

const AddNewPlace = () => {
  const navigation = useNavigation();
  const [homePlaceType, setHomePlaceType] = useState("");
  const [homePlaceTypeModal, setHomePlaceTypeModal] = useState(false);

  const dispatch = useDispatch();

  const handleNavigateToSelectDropLocation = () => {
    setHomePlaceTypeModal(true);
    // dispatch(setHomeOrWorkPlaceType("second-homeplace"));
    // navigation.navigate("SelectDropLocation", {
    //   isMic: false,
    // });
  };
  const handleNavigateAddePlace = () => {
    dispatch(setHomeOrWorkPlaceType(homePlaceType));
    navigation.navigate("AddHomeAndWorkPlace", {
      type: homePlaceType,
      // title: place.name,
      passParams: true,
    });
  };

  return (
    <>
      <View style={styles.addPlaceBtn}>
        <TouchableOpacity
          style={{
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
          onPress={handleNavigateToSelectDropLocation}
        >
          <MaterialIcons name="add" size={24} color="#EA4C89" />
          <Text style={{ fontFamily: fonts.robotoMedium, fontSize: 16 }}>
            Add New Place
          </Text>
        </TouchableOpacity>
      </View>
      <ModalUI
        openCloseState={homePlaceTypeModal}
        closeModalFun={() => setHomePlaceTypeModal(false)}
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        closebtn={false}
      >
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={{ fontSize: 12, fontWeight: "600" }}>Place Type</Text>
          <TextInput
            placeholder="Enter Place Type like Home Work Shopping area"
            style={styles.input}
            onChangeText={setHomePlaceType}
          />
          <View style={{ height: 10 }} />
          <CustomBtn
            title="Added"
            btnBg={homePlaceType?.length > 1 ? "#e02e88" : "#f7f7f7"}
            btnColor={homePlaceType?.length > 1 ? "#fff" : "#e02e99"}
            onPress={homePlaceType?.length > 1 && handleNavigateAddePlace}
          />
        </View>
      </ModalUI>
    </>
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
  input: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    height: 50,
    padding: 10,
  },
});
