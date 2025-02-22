import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { fonts } from "../../../../fonts/Fonts";

const RideVerified = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(1)).current; // Start animation value from 1

  const texts = [
    {
      title: "Your ride has been verified",
      iconName: "verified",
      Icon: MaterialIcons,
      color:"green"
    },
    {
      title: "Happy journey with women rider",
      iconName: "emoji-happy",
      Icon: Entypo,
      color:"#EA4C89"
      
    },
  ];

  useEffect(() => {
    // Function to start animation and loop the text
    const startTextRotation = () => {
      Animated.timing(animatedValue, {
        toValue: 0, // Moving the text upwards
        duration: 500, // Duration of the transition
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Move to the next text
        animatedValue.setValue(1); // Reset animation to start from below
      });
    };

    // Change text every 5 seconds
    const intervalId = setInterval(() => {
      startTextRotation();
    }, 5000); // 5 seconds interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [animatedValue]);

  // Extract the current icon component
  const CurrentIcon = texts[currentIndex]?.Icon;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, 0], // Moves from below (-30) to its position (0)
              }),
            },
          ],
        }}
      >
        {/* Display the icon if it exists */}
        {CurrentIcon && (
          <CurrentIcon
            name={texts[currentIndex].iconName}
            size={24}
            color={texts[currentIndex].color}
          />
        )}

        <Text style={{ fontSize: 15, fontFamily: fonts.robotoSemiBold }}>
          {texts[currentIndex]?.title}
        </Text>
      </Animated.View>
    </View>
  );
};

export default RideVerified;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    overflow: "hidden",
    justifyContent: "center",
    height: 50,
  },
});
