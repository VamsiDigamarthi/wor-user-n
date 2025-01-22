import { StyleSheet, View } from "react-native";
import ParcelBtnCard from "../../features/Parcels/Components/ParcelBtnCard";
import { useChangeLoc100mViaMapScreenHook } from "./ChangeLoc100mViaMapScreen.hook";
import ChangeLocMapView from "./ChangeLocMapView";
import CustomBtn from "../../utiles/CustomBtn";
import CustomeAppbar from "../../../../Utils/CustomeAppbar/CustomeAppbar";
import { appbarStyles } from "../../utiles/styles";
import ShowPickLocation from "./ShowPickLocation";
import NavigateMPinScreenModal from "./modals/NavigateMPinScreenModal";
import CheckMPinModal from "./modals/CheckMPinModal";

const ChangeLoc100mViaMapScreen = () => {
  const {
    onNavigateSavedAddressScreen,
    handleMarkerDragEnd,
    newMarker,
    placeName,
    isBeforeBook,
    time,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
  } = useChangeLoc100mViaMapScreenHook();

  return (
    <>
      <View style={styles.container}>
        {!isBeforeBook && (
          <CustomeAppbar
            onBack={() => navigation.goBack()}
            appTitCenStyles={appbarStyles.appTitCenStyles}
            appTitCenWidth={appbarStyles.appTitCenWidth}
            title={placeName?.placeName}
            vicinity={placeName?.placeVicinity}
          />
        )}
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
            btnBg="#e02e88"
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
        time={time}
        pickUpPlace={placeName}
        newMarker={{ lat: newMarker.latitude, lng: newMarker.longitude }}
      />
    </>
  );
};

export default ChangeLoc100mViaMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  mapContainer: {
    flex: 1,
  },
});
