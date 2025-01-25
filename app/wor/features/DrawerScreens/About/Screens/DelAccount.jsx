import {
  StyleSheet,
  ScrollView,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProfileNavigationCard from "../Components/ProfileNavigationCard";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import ModalUI from "../../../../utiles/Modal/Modal";
import { Modalize } from "react-native-modalize";
import { Text } from "react-native";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import Toast from "react-native-toast-message";

const DelAccScreen = () => {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);

  // const onOpenModal = () => {
  //   if (modalizeRef?.current) {
  //     modalizeRef?.current?.open();
  //   }
  // };

  const pressDel = () => {
    Toast.show({
      text1: "We Have Recieved Your Deletion Request",
      text2: "It will be processed Soon",
      type: "info",
      position: "top",
    });
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="App Settings" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <ProfileNavigationCard
          title="Delete Account"
          // navigateTo="Termsandconditions"
          onClick={() => setOpen(!open)}
        />
      </ScrollView>

      {open && (
        <ModalUI
          modalStyle="slide"
          style={infoModalStyles.aadharModalStyles}
          insideCardStyle={infoModalStyles.insideCardStyle}
          closebtn={false}
          closeModalFun={() => setOpen(close)}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Delete Account</Text>
            <Text style={styles.bottomSheetText}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setOpen(!open)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={pressDel}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalUI>
      )}
    </View>
  );
};

export default DelAccScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 15,
  },

  bottomSheetContent: {
    padding: 10,
  },

  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  bottomSheetText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#e02e88",
    padding: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
