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

const screenWidth = Dimensions.get("window").width;

const ParcelHome = ({navigation}) => {
  const {
    onHandleNavigateLocationScreen,
    selectedCard,
    handleCardClick,
    pickUpLocation,
    dropLocation,
  } = useParcelHomeHook();

  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Send or Receive Parcel"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 80 }} />
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
            {/* <SelectParcelType /> */}
            {/* <ParcelSpecification /> */}
            <ParcelOrderSummary />
          </>
        ) : (
          <Image
            style={styles.image}
            source={require("../../../assets/images/parcels/parcel 1.png")}
          />
        )}
      </ScrollView>

      <View style={styles.positionCard}>
        <CustomBtn
          title="Continue"
          btnBg={selectedCard ? "#e02e88" : "#fff"}
          btnColor={selectedCard ? "#fff" : "#e02e88"}
          borderColor="#e02e88"
          borderWidth={1}
          onPress={selectedCard && onHandleNavigateLocationScreen}
        />
      </View>
    </View>
  );
};

export default ParcelHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
    position: "relative",
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0, // This keeps the button fixed at the bottom
    left: 0,
    padding: 20,
    backgroundColor: "transparent", // Ensures no background over the content
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 400,
  },
});
