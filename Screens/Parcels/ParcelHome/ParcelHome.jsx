import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ParcelSendReceivesCard from "../../../Components/Parcels/ParcelHomeCom/ParcelSendReceivedCard/ParcelSendReceivesCard";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import SendAndReceiveParcelPicDropCard from "../../../Components/Parcels/SendAndReceiveParcelCom/SendAndReceiveParcelPicDropCard/SendAndReceiveParcelPicDropCard";
import SelectParcelType from "../../../Components/Parcels/SendAndReceiveParcelCom/SelectParcelType/SelectParcelType";
import ParcelSpecification from "../../../Components/Parcels/SendAndReceiveParcelCom/ParcelSpecification/ParcelSpecification";
import { useParcelHomeHook } from "./ParcelHome.hook";
import ParcelOrderSummary from "../ParcelOrderSummary/ParcelOrderSummary";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import ParcelApplyCouponCode from "./Components/ParcelApplyCouponCode";

const screenWidth = Dimensions.get("window").width;

const ParcelHome = ({ navigation }) => {
  const {
    onHandleNavigateLocationScreen,
    selectedCard,
    handleCardClick,
    pickUpLocation,
    dropLocation,
    setSelectParcelType,
    selecteParcelType,
    price,
    apiError,
  } = useParcelHomeHook();

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Send/Receive Parcel"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 15,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ParcelSendReceivesCard
            handleCardClick={handleCardClick}
            selectedCard={selectedCard}
          />
          {selectedCard ? (
            <>
              <SendAndReceiveParcelPicDropCard
                pickUpLocationCoorWithName={pickUpLocation}
                dropLocationCoorWithName={dropLocation}
              />
              {pickUpLocation && dropLocation && <ParcelApplyCouponCode />}
              <SelectParcelType setSelectParcelType={setSelectParcelType} />
              {pickUpLocation && dropLocation && selecteParcelType ? (
                <ParcelOrderSummary
                  senderName={pickUpLocation?.personName}
                  recevierName={dropLocation?.personName}
                  selecteParcelType={selecteParcelType}
                  price={price}
                />
              ) : (
                <ParcelSpecification />
              )}
            </>
          ) : (
            <Image
              style={styles.image}
              source={require("../../../assets/images/parcels/parcel 1.png")}
            />
          )}
        </ScrollView>
      </View>

      <View style={styles.positionCard}>
        {apiError && (
          <Text style={{ fontSize: 10, color: "red" }}>{apiError}</Text>
        )}
        <CustomBtn
          title="Continue"
          btnBg={
            pickUpLocation && dropLocation && selecteParcelType
              ? "#e02e88"
              : "#fff"
          }
          btnColor={
            pickUpLocation && dropLocation && selecteParcelType
              ? "#fff"
              : "#e02e88"
          }
          borderColor="#e02e88"
          borderWidth={1}
          onPress={
            pickUpLocation &&
            dropLocation &&
            selecteParcelType &&
            onHandleNavigateLocationScreen
          }
        />
      </View>
    </View>
  );
};

export default ParcelHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    gap: 10,
  },
  innerContainer: {
    paddingHorizontal: 5,
    gap: 15,
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0, // This keeps the button fixed at the bottom
    left: 0,
    padding: 20,
    backgroundColor: "transparent", // Ensures no background over the content
    gap: 5,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 400,
  },
});
