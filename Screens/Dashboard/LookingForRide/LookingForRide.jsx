import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import ProgressBar from "../../../Components/Dashboard/LookForRideCom/ProgressBar/ProgressBar";
import ShowPickDropPriceCard from "../../../Components/Dashboard/LookForRideCom/ShowPickDropPriceCard/ShowPickDropPriceCard";
import { useNavigation } from "@react-navigation/native";

const LookingForRide = () => {
  const navigation = useNavigation();

  const onCaptaineRide = () => {
    navigation.navigate("captaineacceptride");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
          }}
          style={styles.mapImage} // Define your desired styles here
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.text}></Text>
          <ProgressBar />
          <View style={styles.cancelBtnWithImage}>
            <Image
              style={styles.images}
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/7911/de63/52b2a75265856d69f141a38e4434558f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAocZw5Rc3jB8VsL64WqRmTcZsABcJV4rNDw4rdVJ3gZKC8iLxUAiPZul0RJnCgirjIrvjJT1FBxkNXOYwoJW0UvlmRhI9BtAmQUzZGPg15wqw1Uz~E6EEbDAKAofy7aCQ2ZGsg-A48C~9n0ozfB1b2gTGC8wsuHz05K3Z9q4zwvfbJy3tJbiEnWNFDaEGvo2MAst9ckOtdE~W6YjEH41GSjdlx1UtPSVuqH4HODgwRnxUGgqYayCpkkiLiHQB1w5lesRCndmYVgGQG3m2v1Q9TSI09LwJxAk5066FcD9mt2SrVTwBNeTMK8rZYluvhUnGYX-fDOgCFjsdSN7Yj5SA__",
              }}
            />
            <View style={styles.cancelBtn}>
              <CustomBtn
                title="Cancel Ride"
                btnBg="#fff"
                btnColor="#001"
                width="100%"
                onPress={onCaptaineRide}
              />
            </View>
          </View>
          <ShowPickDropPriceCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default LookingForRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginTop: 29,
  },
  mapContainer: {
    width: "100%",
    paddingHorizontal: 20,
    height: "40%",
    borderRadius: 20,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 26,
    paddingVertical: 12,
    // justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    backgroundColor: "#fff5f9",
    position: "relative",
  },
  text: {
    width: 120,
    height: 4,
    backgroundColor: "grey",
    borderRadius: 100,
  },

  cancelBtnWithImage: {
    width: "100%",
    height: 200,
    position: "relative",
    // backgroundColor: "red",
  },

  images: {
    width: "100%",
    height: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cancelBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    padding: 10,
  },
});
