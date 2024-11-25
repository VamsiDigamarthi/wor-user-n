// import React from "react";
// import { StyleSheet, Text, View, Pressable } from "react-native";

import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// const CustomBtn = ({
//   title,
//   onPress,
//   btnColor,
//   btnBg,
//   width,
//   height,
//   borderWidth,
//   borderColor,
// }) => {
//   return (
//     <View style={styles.container}>
//       <Pressable
//         android_ripple={{
//           color: "#E02E88",
//           borderless: false,
//         }}
//         style={({ pressed }) => [
//           styles.pressable,
//           {
//             backgroundColor: pressed ? "#f2f2f2" : btnBg,
//             borderWidth: borderWidth,
//             borderColor: borderColor,
//           },
//         ]}
//         onPress={onPress}
//       >
//         <Text style={[styles.buttonText, { color: btnColor }]}>{title}</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default CustomBtn;

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 50,
//     overflow: "hidden",
//     borderRadius: 25,
//   },
//   pressable: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingHorizontal: 5,
//     width: "100%",
//     height: "100%",
//     borderRadius: 25, // Ensure the button has rounded corners
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });

const CustomBtn = ({ title, btnBg, btnColor, onPress }) => {
  const [btnBgColor, setBtnBgColor] = useState(btnBg);

  const handlePressIn = () => {
    setBtnBgColor("#ed61a8");
  };
  const handlePressOut = () => {
    if (btnBg?.toUpperCase() !== "#E02E88") {
      setBtnBgColor("#fdfdfd");
    } else {
      setBtnBgColor("#E02E88");
    }
  };
  const handleLongPress = () => {
    setBtnBgColor("#c78365");
  };

  useEffect(() => {
    setBtnBgColor(btnBg);
  }, [btnBg]);

  // console.log(btnBg);
  // console.log(btnBgColor);

  return (
    <View style={styles.btnContaier}>
      <Pressable
        android_ripple={{ color: "#fff8f6", borderless: true }} // Ripple color
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        style={[styles.btn, { backgroundColor: btnBgColor }]}
        onPress={onPress}
      >
        <Text style={[styles.btnText, { color: btnColor }]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnContaier: {
    borderRadius: 50,
    height: 50,
    width: "50%",
    overflow: "hidden", // Ensure rounded corners and ripple effect
    elevation: 1,
    // borderWidth: 0.5,
    // borderColor: "#fff",
    width: "100%",
    shadowColor: "#e02e88",
  },

  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  btnText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
