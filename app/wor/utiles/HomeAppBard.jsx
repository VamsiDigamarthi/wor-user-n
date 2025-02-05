import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { onFavoritePlace } from "../features/ridebooking/selectdroplocation/redux/favoritePlaces.slice";
import { API } from "../../../Constants/url";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../../Constants/colors";
import { fonts } from "../fonts/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Easing } from "react-native";

const HomeAppBard = ({ navigation }) => {
  const { token } = useSelector((state) => state.token);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);
  const dispatch = useDispatch();
  const { placeVicinity, placeName, location } = useSelector(
    (state) => state.location
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(1)).current; // Start animation value from 1

  // Text array to scroll through
  const texts = [placeVicinity, "Your Current Location"];

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

  const handleAddFavoritePlace = async () => {
    try {
      const response = await API.post(
        "/user/favorites-places",
        {
          name: placeName,
          vicinity: placeVicinity,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data);
      Toast.show({
        text1: response?.data?.message,
        type: "success",
        position: "bottom",
      });

      dispatch(onFavoritePlace({ token }));
    } catch (error) {
      Toast.show({
        text1: "Added favorite failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const isFavorite = favoritePlaces?.some((place) => place.name === placeName);

  return (
    <View style={styles.superContainer}>
      <View style={styles.appBarContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={30} color="gray" />
        </TouchableOpacity>

        <View style={styles.appSecondCard}>
          <View style={styles.locationInputContainer}>
            <Ionicons name="location-sharp" size={20} color="#17a773" />

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
                // backgroundColor: "blue",
                flex: 1,
              }}
            >
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {texts[currentIndex]}
              </Text>
            </Animated.View>
          </View>

          <TouchableOpacity onPress={handleAddFavoritePlace}>
            {isFavorite ? (
              <MaterialIcons name="favorite" size={24} color="#ea4c89" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="#b0b0b0" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeAppBard;
const styles = StyleSheet.create({
  superContainer: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // overflow: "hidden",
    // elevation: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  appBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 6,
    height: 50,
    // backgroundColor: "red",
  },
  appSecondCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    borderRadius: 30,
    height: "100%",
    paddingRight: 10,
    backgroundColor: "#fff",
    shadowColor: "red",
    // backgroundColor: "blue",
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    // paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    marginHorizontal: 10,
    height: 30, // Fixed height for the animation
    overflow: "hidden", // To hide overflowing text
    // backgroundColor: "red",
  },
  title: {
    fontSize: 13,
    // fontWeight: "600",
    fontFamily: fonts.robotoMedium,
    color: COLORS.heading,
    marginLeft: 6,
  },
});
