import { StyleSheet, TouchableOpacity, View } from "react-native";
import ParcelBtnCard from "../../features/Parcels/Components/ParcelBtnCard";
import { useChangeLoc100mViaMapScreenHook } from "./ChangeLoc100mViaMapScreen.hook";
import ChangeLocMapView from "./ChangeLocMapView";
import CustomBtn from "../../utiles/CustomBtn";
import ShowPickLocation from "./ShowPickLocation";
import NavigateMPinScreenModal from "./modals/NavigateMPinScreenModal";
import CheckMPinModal from "./modals/CheckMPinModal";
import Entypo from "@expo/vector-icons/Entypo";

const ChangeLoc100mViaMapScreen = ({ navigation }) => {
  const {
    onNavigateSavedAddressScreen,
    handleMarkerDragEnd,
    newMarker,
    placeName,
    isBeforeBook,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
  } = useChangeLoc100mViaMapScreenHook();

  return (
    // <AppBarLayout
    //   title={"Check Pick Up Location Again"}
    //   isPositionAppbar={true}
    // >
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.backbtn}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <ChangeLocMapView
            newMarker={newMarker}
            handleMarkerDragEnd={handleMarkerDragEnd}
          />
        </View>
        <ParcelBtnCard>
          {isBeforeBook && <ShowPickLocation place={placeName} />}

          <CustomBtn
            onPress={onNavigateSavedAddressScreen}
            title="Confirm Location"
            btnBg="#EA4C89"
            btnColor="#fff"
          />
        </ParcelBtnCard>
      </View>
      {/* before booking check m-pin set or not */}
      <NavigateMPinScreenModal
        rideBookBeforeCheckMPinAddhar={rideBookBeforeCheckMPinAddhar}
        onChangeRideBookBeforeCheckPinAddharHandler={
          onChangeRideBookBeforeCheckPinAddharHandler
        }
      />
      {/* check m-pin modal */}
      <CheckMPinModal
        isOpenEnterConfirmMPinModal={isOpenEnterConfirmMPinModal}
        onOpenIsEnterConfirmPinModal={onOpenIsEnterConfirmPinModal}
        pickUpPlace={placeName}
        newMarker={{ lat: newMarker.latitude, lng: newMarker.longitude }}
      />
    </View>
  );
};
//
export default ChangeLoc100mViaMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    bottom: 10,
  },
  mapContainer: {
    flex: 1,
  },

  backbtn: {
    position: "absolute",
    top: 39,
    left: 10,
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:
    backgroundColor: "#fff",
    elevation: 4,
    zIndex: 100,
  },
});
