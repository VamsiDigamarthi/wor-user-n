import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo vector icons
import { COLORS } from "../../Constants/colors";

const CustomAppBar = ({ navigation, placeName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(1)).current; // Start animation value from 1

  // Text array to scroll through
  const texts = [
    placeName || "Your Current Location",
    "Alternate Location 1",
    "Alternate Location 2",
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

  return (
    <View style={styles.superContainer}>
      <View style={styles.appBarContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="#e02e88" />
        </TouchableOpacity>

        <View style={styles.appSecondCard}>
          <View style={styles.locationInputContainer}>
            <Ionicons name="location-sharp" size={20} color="lightgray" />

            {/* Animated Text Wrapper */}
            <Animated.View
              style={{
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
              <Text style={styles.title}>{texts[currentIndex]}</Text>
            </Animated.View>
          </View>

          <TouchableOpacity onPress={() => alert("Love icon pressed!")}>
            <Ionicons name="heart-outline" size={24} color="lightgray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  superContainer: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  appBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 6,
    height: 50,
  },
  appSecondCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderRadius: 30,
    height: "100%",
    paddingRight: 20,
    backgroundColor: "#fff",
    shadowColor: "red",
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    marginHorizontal: 10,
    height: 30, // Fixed height for the animation
    overflow: "hidden", // To hide overflowing text
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.heading,
    marginLeft: 6,
  },
});

export default CustomAppBar;
