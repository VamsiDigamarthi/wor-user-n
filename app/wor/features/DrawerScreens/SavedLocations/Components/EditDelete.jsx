import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { fonts } from "../../../../fonts/Fonts";
import { onDeleteSavedPlaces } from "../services/deleteSavedPlaces";
import { useDispatch, useSelector } from "react-redux";
import { homePlace } from "../../../ridebooking/home/redux/homePlace";
import { deleteSavedAddress } from "../../../Parcels/services/parSavedAddressServices";
import { fetchSavedPlace } from "../../../Parcels/redux/parcelSavedPlace.slice";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import SavedPlacesChangeModal from "../modals/SavedPlacesChangeModal";

const EditDelete = ({ place, editDeleteType }) => {
  const [openSavedPlacesModal, setOpenSavedPlacesModal] = useState(false);

  const handleModalSavedPlaces = () => {
    setOpenSavedPlacesModal(!openSavedPlacesModal);
  };

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const handleEditPlace = () => {
    if (editDeleteType === "home" || editDeleteType === "work") {
    } else if (editDeleteType === "savedAddress") {
      // navigation.navigate("ParSavedUsers", {})
      handleModalSavedPlaces();
    }
  };

  const handleDeletePlace = async () => {
    if (editDeleteType === "home" || editDeleteType === "work") {
      try {
        await onDeleteSavedPlaces({ token: token, id: place._id });
        dispatch(homePlace({ token }));
      } catch (error) {
        console.log(error);
      }
    } else if (editDeleteType === "savedAddress") {
      try {
        await deleteSavedAddress({ token: token, id: place?._id });
        console.log("editDeleteType", editDeleteType);
        dispatch(fetchSavedPlace({ token }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <View style={styles.editBox}>
        <TouchableOpacity
          style={styles.editDeleteButton}
          onPress={handleEditPlace}
        >
          <FontAwesome name="pencil-square-o" size={20} color="green" />
          <Text style={{ fontFamily: fonts.robotoRegular }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editDeleteButton}
          onPress={handleDeletePlace}
        >
          <MaterialIcons name="delete-outline" size={20} color="red" />
          <Text style={{ fontFamily: fonts.robotoRegular }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <SavedPlacesChangeModal
        handleModalSavedPlaces={handleModalSavedPlaces}
        openSavedPlacesModal={openSavedPlacesModal}
        place={place}
      />
    </>
  );
};

export default EditDelete;

const styles = StyleSheet.create({
  editBox: {
    position: "absolute",
    top: 10,
    right: 19,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    elevation: 1,
    zIndex: 10,
  },
  editDeleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5, // Space between icon and text
  },
});
