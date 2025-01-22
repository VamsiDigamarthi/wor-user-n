import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CustomeAppbar from "../../Utils/CustomeAppbar/CustomeAppbar";
import FaqBtnCard from "../../Components/Faqs/FaqBtnCard";
import FaqAnswerCard from "../../Components/Faqs/FaqAnswerCard";
import FaqRatingCard from "../../Components/Faqs/FaqRatingCard";

export default function FaqAnswer({ route, navigation }) {
  const { data } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="FAQs" onBack={() => navigation.goBack()} />

      <View style={styles.conatiner}>
        <View style={styles.innerContainer}>
          <Text style={{ fontWeight: "bold", paddingLeft: 10 }}>
            {data.title}
          </Text>

          <FaqAnswerCard question={data.question} answer={data.answer} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: 10,
    gap: 20,
    position: "relative",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  innerContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
});
