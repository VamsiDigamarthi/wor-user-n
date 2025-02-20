// SliderComponent.js
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Swiper from "react-native-swiper";
import { fonts } from "../../../../fonts/Fonts";

const SliderComponent = ({ bottom = 2 }) => {
  const slides = [
    {
      id: 1,
      image:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      title: "Scooty",
      desc: "Scooty Prices have been dropped",
    },
    {
      id: 2,
      image:
        "https://t3.ftcdn.net/jpg/06/15/49/68/360_F_615496890_W34yB8VDE6n5pehb5QCt1ek5oEvRo9qA.jpg",
      title: "Cab",
      desc: "Affordable 4 Seaters",
    },
    {
      id: 3,
      image:
        "https://t3.ftcdn.net/jpg/06/15/49/68/360_F_615496890_W34yB8VDE6n5pehb5QCt1ek5oEvRo9qA.jpg",
      title: "Auto",
      desc: "Travel to Local places easily",
    },
  ];

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false} // Disable arrows
      autoplay={true} // Enable auto-slide
      autoplayTimeout={5} // Time interval between slides (3 seconds)
      paginationStyle={[styles.pagination, { bottom }]} // Reposition the dots
      dotStyle={styles.dot} // Custom dot style
      activeDotStyle={styles.activeDot} // Custom active dot style
      scrollEnabled={true}
      loop={true}
    >
      {slides.map((slide) => (
        <View style={styles.slide} key={slide.id}>
          {/* <Image source={{ uri: slide.image }} style={styles.image} /> */}
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  slide: {
    backgroundColor: "#EA4C89",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    borderRadius: 10, // Border radius for the container of the image
    overflow: "hidden", // Clip content inside the View to enforce border radius
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10, // Apply border radius to the image itself
    resizeMode: "cover",
  },
  title: {
    // position: "absolute",
    // color: "",
    color: "#fff",
    fontSize: 24,
    textAlign: "left",
    // fontWeight: "bold",
    fontFamily: fonts.robotoBold,
    // bottom: 20,
  },

  desc: {
    color: "#fff",
    fontFamily: fonts.robotoRegular,
  },

  pagination: {
    bottom: 2, // Position the dots slightly above the bottom
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});

export default SliderComponent;
