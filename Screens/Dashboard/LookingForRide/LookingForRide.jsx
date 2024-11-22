import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import ProgressBar from "../../../Components/Dashboard/LookForRideCom/ProgressBar/ProgressBar";
import ShowPickDropPriceCard from "../../../Components/Dashboard/LookForRideCom/ShowPickDropPriceCard/ShowPickDropPriceCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLookingForRideHook } from "./LookingForRide.hook";
import { coordinationMap } from "../../../Constants/displaylocationmap";

const LookingForRide = () => {
  const {
    dropAddress,
    vehicleType,
    price,
    placeName,
    pickUpCoordinated,
    progressWidth,
    showCancelWithReOrderBtn,
    onCancelRide,
    onRePlaceOrder,
    onNewCancelHandle,
  } = useLookingForRideHook();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: coordinationMap(
              pickUpCoordinated?.lat,
              pickUpCoordinated?.lng
            ),
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
          <ProgressBar progressWidth={progressWidth} />
          <View style={styles.cancelBtnWithImage}>
            <Image
              style={styles.images}
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/7911/de63/52b2a75265856d69f141a38e4434558f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAocZw5Rc3jB8VsL64WqRmTcZsABcJV4rNDw4rdVJ3gZKC8iLxUAiPZul0RJnCgirjIrvjJT1FBxkNXOYwoJW0UvlmRhI9BtAmQUzZGPg15wqw1Uz~E6EEbDAKAofy7aCQ2ZGsg-A48C~9n0ozfB1b2gTGC8wsuHz05K3Z9q4zwvfbJy3tJbiEnWNFDaEGvo2MAst9ckOtdE~W6YjEH41GSjdlx1UtPSVuqH4HODgwRnxUGgqYayCpkkiLiHQB1w5lesRCndmYVgGQG3m2v1Q9TSI09LwJxAk5066FcD9mt2SrVTwBNeTMK8rZYluvhUnGYX-fDOgCFjsdSN7Yj5SA__",
              }}
            />
            <View style={styles.cancelBtn}>
              <CustomBtn
                title={`${
                  showCancelWithReOrderBtn ? "Cancel" : "Re-Place"
                } Ride`}
                btnBg="#fff"
                btnColor="#001"
                width="100%"
                onPress={
                  showCancelWithReOrderBtn ? onCancelRide : onRePlaceOrder
                }
              />
              {!showCancelWithReOrderBtn && (
                <CustomBtn
                  title="Cancel Order"
                  btnBg="#fff"
                  btnColor="#001"
                  width="100%"
                  onPress={onNewCancelHandle}
                />
              )}
            </View>
          </View>
          <ShowPickDropPriceCard
            vehicleType={vehicleType}
            price={price}
            placeName={placeName}
            dropAddress={dropAddress?.name}
          />
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
    height: "50%",
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
    paddingVertical: 14,
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
    width: 80,
    height: 3,
    backgroundColor: "grey",
    borderRadius: 100,
  },

  cancelBtnWithImage: {
    width: "100%",
    height: 200,
    position: "relative",
    marginTop: 50,
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
    gap: 20,
  },
});
