import React, { useRef, useEffect } from "react";
import { Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { MicIcon } from "../../../../Icons/Icons";
import { navigator } from "../../../../Images/DrawerImages";
import { COLORS } from "../../../../../../Constants/colors";

const LocationInput = ({
  inputValue,
  handleInputChange,
  setIsMicModalOpenClose,
  passParams,
  title=""
}) => {
  const ref = useRef();

  useEffect(() => {
    if (passParams && ref.current) {
      ref.current.focus();
      handleInputChange(title)
    }
  }, [passParams]);

  return (
    <View style={styles.container}>
      <Image source={navigator} style={styles.navIcon} />
      <TextInput
        ref={ref}
        style={{ flex: 1, fontSize: 16 }}
        placeholder="Enter Destination"
        value={inputValue}
        onChangeText={handleInputChange}
        selectTextOnFocus={true} // Automatically select all text when focused
      />
      <Pressable
        onPress={() => setIsMicModalOpenClose(true)}
        style={styles.micIcons}
      >
        <MicIcon size={22} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.inputBackGround,
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 42.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    height: 40,
  },
  navIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
});
