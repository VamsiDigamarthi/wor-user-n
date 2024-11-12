import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";
import SettingProfileCard from "../../../Components/Dashboard/settingscom/SettingProfileCard/SettingProfileCard";
import SettingsItemsList from "../../../Components/Dashboard/settingscom/SettingsItem/SettingsItemsList";

const SettingsScreen = () => {
  // Create a reference for the bottom sheet
  const modalizeRef = useRef(null);

  // Function to open the modal after ensuring it's rendered
  const onOpenModal = () => {
    if (modalizeRef?.current) {
      modalizeRef?.current?.open();
    }
  };

  return (
    <View style={styles.container}>
      <SettingProfileCard />
      <SettingsItemsList onOpenDeleteModal={onOpenModal} />

      {/* Modalize Bottom Sheet */}
      <Modalize ref={modalizeRef} snapPoint={250}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Delete Account</Text>
          <Text style={styles.bottomSheetText}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => modalizeRef?.current?.close()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(event) => {
                event.persist();
                console.log("Delete pressed");
                // Any async actions can be done here
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
  },
  bottomSheetContent: {
    padding: 20,
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
