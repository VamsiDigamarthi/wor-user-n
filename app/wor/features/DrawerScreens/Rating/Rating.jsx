import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import MainCard from "./Components/MainCard";
import RatingImageCard from "./Components/RatingImageCard";
import Data from "../../../../../Constants/RatingData.json";

const Rating = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { avgRating } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 50 }}>
        <CustomeAppbar title="Ratings" onBack={() => navigation.goBack()} />
      </View>

      <View style={styles.container}>
        <MainCard avgRating={avgRating} />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 5,
            gap: 20,
            paddingVertical: 5,
          }}
        >
          {Data.map((e, index) => (
            <RatingImageCard key={index} title={e.title} text={e.subTitle} />
          ))}
        </ScrollView>

        {/* <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <RatingSecondCard avgRating={avgRating} />
          <TextWithCard
            title="How we calculate your rating"
            subTitle="Your rating is calculated by averaging the anonymous ratings you receive from riders after each trip. These ratings are on a scale of 1 to 5 stars and are completely private, ensuring that neither you nor your rider can identify specific ratings. This system promotes a fair and unbiased evaluation of your service.
"
          />

          <TextWithCard
            title="Understanding Ratings"
            subTitle="A 5-star customer is polite, respectful, and considerate, arriving on time and clearly sharing their destination. They are patient with delays and express gratitude for the rider’s efforts. Their appreciation for a safe, comfortable ride creates a positive, enjoyable experience, making the journey rewarding for the rider.
"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%", gap: 20 }}
          >
            {[
              {
                icon: "star",
                title: "Know your Rider",
                subTitle:
                  "Understanding what contributes to a rider's happiness can make you a 5-star rider. By being aware of the factors that improve their experience, such as clear communication, respect, and attentiveness, you can enhance the journey and create a positive environment for both you and the rider.",
              },

              {
                icon: "stopwatch",
                title: "Timely",
                subTitle:
                  "To ensure a smooth and timely pickup, please double-check your designated pickup location. Arriving promptly at the specified spot not only helps the rider maintain their schedule but also contributes to a more efficient and stress-free journey for both of you.",
              },

              {
                icon: "shield",
                title: "Safety",
                subTitle:
                  "Put on your helmet and take it easy. Both riders and drivers should always adhere to traffic laws for everyone's safety.",
              },

              {
                icon: "shield",
                title: "Courtesy",
                subTitle:
                  "A simple smile or greeting can make a big difference! Treat your riders with the same kindness and respect you would want to receive.",
              },
            ].map((e, index) => {
              return (
                <RatingSliderCard
                  key={index}
                  title={e.title}
                  subtitle={e.subTitle}
                  icon={e.icon}
                />
              );
            })}
          </ScrollView>
        </ScrollView> */}
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    // gap: 10,
    position: "relative",
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    gap: 15,
  },
});
