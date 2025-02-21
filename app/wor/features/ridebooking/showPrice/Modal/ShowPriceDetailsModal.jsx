import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { useSelector } from "react-redux";
import CustomBtn from "../../../../utiles/CustomBtn";
import { autoImg, scrootyImg, worMiniImg } from "../../../../Images/Home";

const ShowPriceDetailsModal = ({
  openCancelModal,
  closeCancelModal,
  vehicleType,
  price,
}) => {
  const { priceDetails } = useSelector((state) => state.priceDetails); // this is complete price details from admin panel

  let imageUrl;
  switch (vehicleType?.toLowerCase()) {
    case "scooty":
      imageUrl = scrootyImg;
      break;
    case "car":
      imageUrl = worMiniImg;
      break;
    case "auto":
      imageUrl = autoImg;
      break;
    case "wor-premium":
      imageUrl = worMiniImg;
      break;
    default:
      imageUrl = scrootyImg;
      break;
  }

  return (
    <ModalUI
      openCloseState={openCancelModal}
      closeModalFun={closeCancelModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <View style={styles.firstCard}>
          <View style={{ width: 50, height: 40 }}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={imageUrl}
            />
          </View>
          <Text style={styles.title}>Bike Fare Details</Text>
        </View>
        <View style={styles.secondCard}>
          <Text
            style={[
              styles.secondTitle,
              { width: "80%", lineHeight: 21, alignItems: "flex-start" },
            ]}
          >
            Total Estimated Face Price Including taxes.
          </Text>
          <Text style={styles.title}>₹{price}*</Text>
        </View>
        <View style={styles.rowDirection}>
          <Text style={styles.grayColorText}>Ride Fare</Text>
          <Text style={styles.grayColorText}>₹103.0</Text>
        </View>
        <View style={styles.rowDirection}>
          <Text style={styles.grayColorText}>Surcharge</Text>
          <Text style={styles.grayColorText}>₹103.0</Text>
        </View>
        <Text style={styles.subText}>
          *Price may vary if you change pickup or drop location, toll areas,
        </Text>
        <Text style={styles.subText}>
          {priceDetails?.twoToTenKmPrice} Rs/km till 10km,{" "}
          {priceDetails?.tenToHunderPrice} Rs/km post 10km
        </Text>
        <Text style={styles.subText}>
          Waiting charges after 3 mins of captain arrival is ₹1/min
        </Text>
        <View style={{ height: 10 }} />
        <CustomBtn
          title="Got it"
          btnBg="#fff"
          borderWidth={1}
          borderColor="gray"
        />
      </View>
    </ModalUI>
  );
};

export default ShowPriceDetailsModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    gap: 10,
    backgroundColor: "#fff",
  },
  firstCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  secondTitle: { fontSize: 16, color: "black", fontWeight: "600" },
  secondCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  rowDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grayColorText: {
    fontWeight: "600",
    fontSize: 14,
    color: "gray",
  },
  subText: {
    color: "gray",
    fontSize: 14,
    lineHeight: 21,
  },
});
