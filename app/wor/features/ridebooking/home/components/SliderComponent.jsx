// SliderComponent.js
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ExpandingDot } from "react-native-animated-pagination-dots";

const screenWidth = Dimensions.get("window").width;

const SliderComponent = () => {
  const slides = [
    {
      id: 1,
      image: require("../../../../../../assets/bannerimages/scootyBanner.png"),
      title: "Scooty",
      desc: "Scooty Prices have been dropped",
    },
    {
      id: 2,
      image: require("../../../../../../assets/bannerimages/cabBanner.png"),
      title: "Cab",
      desc: "Affordable 4 Seaters",
    },
    // {
    //   id: 3,
    //   image: require("../../../../../../assets/bannerimages/autoBanner.png"),
    //   title: "Auto",
    //   desc: "Travel to Local places easily",
    // },
    {
      id: 4,
      image: require("../../../../../../assets/bannerimages/parcelBanner.png"),
      title: "Parcel",
      desc: "Travel to Local places easily",
    },
    {
      id: 5,
      image: require("../../../../../../assets/bannerimages/companyBanner.png"),
      title: "",
      desc: "",
    },
  ];

  // Create a scrollX value to track the carousel's scroll position
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Configurable opacity for images
  const [imageOpacity] = React.useState(1); // Adjust this value as needed

  const renderItem = ({ item }) => (
    <View style={styles.slideContainer}>
      {/* Image */}
      <Image
        source={item.image}
        style={[styles.image, { opacity: imageOpacity }]}
      />

      {/* Text Overlay */}
      <View style={styles.textOverlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.desc}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {/* Carousel */}
      <Carousel
        loop
        width={screenWidth}
        height={250} // Decreased height to 250
        autoPlay={true}
        data={slides}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        onProgressChange={(_, absoluteProgress) => {
          scrollX.setValue(absoluteProgress * screenWidth);
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        <ExpandingDot
          data={slides}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          activeDotColor="#EA4C89"
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: "red",
          }}
          containerStyle={{
            justifyContent: "center",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200, // Slightly larger than carousel height to accommodate dots
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Required for absolute positioning of dots
    marginHorizontal: 20,
    // marginVertical: 20,
  },
  slideContainer: {
    flex: 1,
    position: "relative", // Required for absolute positioning of text overlay
    overflow: "hidden", // Ensures rounded corners are clipped
    borderRadius: 20, // Curved border for the entire slide
    marginHorizontal: 20,
  },
  image: {
    width: "100%", // Full width of the slide
    height: 200, // Match the carousel height
    resizeMode: "contain", // Ensure the image covers the entire container
    borderRadius: 20, // Curved border for the image
  },
  textOverlay: {
    position: "absolute", // Position text absolutely on top of the image
    bottom: 80, // Distance from the bottom of the image
    left: 20, // Distance from the left edge of the image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text for better visibility on images
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text for better visibility on images
  },
  dotsContainer: {
    position: "absolute", // Position dots absolutely within the wrapper
    bottom: 10, // Place dots at the bottom
    alignSelf: "center", // Center-align the dots
  },
});

export default SliderComponent;
