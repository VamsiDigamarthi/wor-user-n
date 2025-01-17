import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
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
    lat,
    lng,
    place,
    placeName,
    selectedCard,
    parcelDetails,
    isPickLocationFromParc,
    // ride booking states
    isRideBookingScreen,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
    rideDropDetails,
    selectedVehicle,
    time,
    ridePrice,
    price,
    howManyMans,
    setHowManyMans,
  } = useChangeLoc100mViaMapScreenHook();

  return (
    <>
      <View style={styles.container}>
        {!isPickLocationFromParc && (
          <CustomeAppbar
            onBack={() => navigation.goBack()}
            appTitCenStyles={appbarStyles.appTitCenStyles}
            appTitCenWidth={appbarStyles.appTitCenWidth}
            title={placeName?.placeName}
            vicinity={placeName?.placeVicinity}
          />
        )}
        <View style={styles.mapContainer}>
          {lat && lng ? (
            <ChangeLocMapView
              lat={lat}
              lng={lng}
              newMarker={newMarker}
              place={place}
              handleMarkerDragEnd={handleMarkerDragEnd}
            />
          ) : (
            <View style={styles.mapContainer}>
              <ActivityIndicator color="#e02e88" size={30} />
            </View>
          )}
        </View>
        <ParcelBtnCard>
          {(isPickLocationFromParc || isRideBookingScreen) && (
            <ShowPickLocation
              place={placeName}
              selectedCard={selectedCard}
              isRideBookingScreen={isRideBookingScreen}
              selectedVehicle={selectedVehicle}
              howManyMans={howManyMans}
              setHowManyMans={setHowManyMans}
            />
          )}

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
        dropDetails={rideDropDetails}
        selectedVehicle={selectedVehicle} // this prop only in ride booking
        time={time} // this prop only in ride booking
        ridePrice={ridePrice} // this prop only in ride booking
        // parcel pros
        selectedCard={selectedCard} // store value 'SEDN' or 'RECEIVE'
        parcelDetails={parcelDetails} // parcel all details stored
        isPickLocationFromParc={isPickLocationFromParc}
        isRideBookingScreen={isRideBookingScreen}
        pickUpPlace={placeName}
        newMarker={{ lat: newMarker.latitude, lng: newMarker.longitude }}
        parcelPrice={price}
        howManyMans={howManyMans}
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
