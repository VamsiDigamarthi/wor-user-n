import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { otpFAQ, signUpFAQ } from "../data/authFandQsData";
const FandQsScreen = () => {
  const { caterogy } = useRoute().params || {};
  const [showText, setShowText] = useState(null);
  const [data, setData] = useState([]);

  const filterfaQsData = () => {
    if (caterogy?.toLowerCase() === "otp") {
      setData(otpFAQ);
    }else if (caterogy.toLowerCase() === 'signup'){
      setData(signUpFAQ)
    }
  };

  useEffect(() => {
    filterfaQsData();
  }, [caterogy]);

  const hadleSetIndex = (index) => {
    if (index === showText) {
      setShowText(null);
    } else {
      setShowText(index);
    }
  };

  return (
    <AppBarLayout title="FAQ's" isPositionAppbar={true}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Pressable onPress={() => hadleSetIndex(index)} style={styles.innerCard}>
                <Text style={styles.text}>{item?.text}</Text>
                <View >
                  {showText === index ? (
                    <AntDesign color="red" size={20} name="up" />
                  ) : (
                    <AntDesign size={20} name="down" />
                  )}
                </View>
              </Pressable>
              {showText === index && (
                <Text style={styles.subText}>{item?.subText}</Text>
              )}
            </View>
          )}
        />
      </View>
    </AppBarLayout>
  );
};

export default FandQsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 100,
    padding: 10,
    flex: 1,
    gap: 20,
  },

  card: {
    width: "100%",
    gap: 5,
    marginBottom: 20,
  },
  innerCard: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    width: "91.5%",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
  },
  subText: {
    width: "100%",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 21,
  },
});
