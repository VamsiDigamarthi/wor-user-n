import { StyleSheet, TouchableOpacity, View } from "react-native";
import ParcelBtnCard from "../../features/Parcels/Components/ParcelBtnCard";
import { useChangeLoc100mViaMapScreenHook } from "./ChangeLoc100mViaMapScreen.hook";
import ChangeLocMapView from "./ChangeLocMapView";
import CustomBtn from "../../utiles/CustomBtn";
import ShowPickLocation from "./ShowPickLocation";
import NavigateMPinScreenModal from "./modals/NavigateMPinScreenModal";
import CheckMPinModal from "./modals/CheckMPinModal";
import Entypo from "@expo/vector-icons/Entypo";
import NotInLocation from "../../NotInLocation";
import StartRides from "../../features/ridebooking/home/modals/StartRIdes";
import { useEffect, useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setHowManyMens } from "../../features/ridebooking/sharedLogics/rideDetailsSlice";

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

  // const [displayStartModal, setDisplayStartModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setHowManyMens(0));
    };
  }, [dispatch]);

  const insets = useSafeAreaInsets();

  const hasSoftwareNavigationBar = false;

  return (
    <>
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
          <ParcelBtnCard hasSoftwareNavigationBar={hasSoftwareNavigationBar}>
            {isBeforeBook && <ShowPickLocation place={placeName} />}

            <CustomBtn
              onPress={onNavigateSavedAddressScreen}
              title="Confirm Location"
              btnBg="#EA4C89"
              btnColor="#fff"
            />
          </ParcelBtnCard>
        </View>
        <NavigateMPinScreenModal
          rideBookBeforeCheckMPinAddhar={rideBookBeforeCheckMPinAddhar}
          onChangeRideBookBeforeCheckPinAddharHandler={
            onChangeRideBookBeforeCheckPinAddharHandler
          }
        />
        <CheckMPinModal
          isOpenEnterConfirmMPinModal={isOpenEnterConfirmMPinModal}
          onOpenIsEnterConfirmPinModal={onOpenIsEnterConfirmPinModal}
          pickUpPlace={placeName}
          newMarker={{ lat: newMarker.latitude, lng: newMarker.longitude }}
        />
      </View>
    </>
  );
};

export default ChangeLoc100mViaMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    // bottom: 50,
  },
  backbtn: {
    position: "absolute",
    // top: 39,
    left: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 4,
    zIndex: 100,
  },
});
