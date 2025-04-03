import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SwipeButton from "rn-swipe-button";
import AntDesign from "@expo/vector-icons/AntDesign";

const SwipeBtn = ({ onswipe, title, bg = "#EA4C89" }) => {
  const [key, setKey] = useState(0); // Key to re-render the button

  const handleSwipeSuccess = () => {
    onswipe();
    setKey((prevKey) => prevKey + 1); // Update the key to reset the button
  };

  return (
    <SwipeButton
      key={key} // Change key to force re-render
      title={title}
      titleStyles={{ fontWeight: "bold", fontSize: 20 }}
      titleColor={bg ? bg : "#e02e88"}
      thumbIconBackgroundColor={bg ? bg : "#e02e88"}
      railBackgroundColor="#fff"
      railBorderColor={bg ? bg : "#e02e88"}
      railFillBackgroundColor={bg ? bg : "#e02e88"}
      railFillBorderColor={bg ? bg : "#e02e88"}
      containerStyles={{
        borderRadius: 8,
        width: "100%",
        margin: 0,
      }}
      thumbIconStyles={{
        borderRadius: 8,
      }}
      railStyles={{
        borderRadius: 8,
      }}
      thumbIconBorderColor="gray"
      swipeSuccessThreshold={70} // Adjusts swipe completion percentage
      height={50} // Custom height for a more button-like appearance
      thumbIconComponent={() => (
        <View style={[styles.customThumb, { backgroundColor: bg }]}>
          <AntDesign name="arrowright" size={24} color="#fff" />
        </View>
      )}
      onSwipeSuccess={handleSwipeSuccess} // Trigger swipe success handler
    />
  );
};

const styles = StyleSheet.create({
  customThumb: {
    width: 50,
    height: 50,

    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeBtn;
