import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { appbarStyles } from "./styles";
import MapView, { Marker, Circle, Polyline } from "react-native-maps"; // Import Polyline
import { customMapStyle } from "../../../Constants/mapData";
import { PickLocationIcon, PinIcon } from "../Icons/Icons";
import ParcelBtnCard from "../features/Parcels/Components/ParcelBtnCard";
import CustomBtn from "./CustomBtn";
import {
  getDistance,
  getCompassDirection,
  computeDestinationPoint,
} from "geolib";
import { fetchNameAndVicinity } from "../../../Constants/displaylocationmap";
import { useSelector } from "react-redux";
import { haversineDistance } from "../../../Constants/calculateKM";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";

const ChangeLoc100mViaMap = () => {
  const navigation = useNavigation();
  const {
    place,
    isPickLocationFromParc = false,
    parcelDetails,
    selectedCard,
  } = useRoute().params || {};
  const { profile } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.token);

  const { lat, lng } = place?.location || {};
  const [price, setPrice] = useState(0);

  // State to store the new marker position
  const [newMarker, setNewMarker] = useState({ latitude: lat, longitude: lng });

  // if change location 100 meter new coordinates place name stored in this state
  const [placeName, setPlaceName] = useState({
    placeName: place?.name,
    placeVicinity: place?.vicinity,
  });

  // Function to handle the drag end of the marker
  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const distance = getDistanceFromLatLonInKm(lat, lng, latitude, longitude);

    // Only update the marker if it's within the 100-meter radius (0.1 km)
    if (distance <= 0.1) {
      setNewMarker({ latitude, longitude });
    } else {
      const newPosition = computeDestinationPoint(
        { latitude: lat, longitude: lng },
        100, // 100 meters
        getCompassDirection(
          { latitude: lat, longitude: lng },
          { latitude, longitude }
        )
      );

      setNewMarker({
        latitude: newPosition.latitude,
        longitude: newPosition.longitude,
      });
    }
  };

  useEffect(() => {
    const fetchNewPlaceName = async () => {
      const data = await fetchNameAndVicinity(
        newMarker.latitude,
        newMarker.longitude
      );
      setPlaceName({ placeName: data?.name, placeVicinity: data?.vicinity });
    };
    lat !== newMarker.latitude && fetchNewPlaceName();
  }, [newMarker]);

  const onNavigateSavedAddressScreen = () => {
    // places the order
    if (isPickLocationFromParc) {
      console.log("selectedCard", selectedCard);
      // const indiaDateTime = new Date().toLocaleString("en-IN", {
      //   timeZone: "Asia/Kolkata",
      // });
      // const datePart = indiaDateTime.split(",")[0];
      // const [day, month, year] = datePart.split("/");
      // const formattedDate = `${day}-${month}-${year}`;
      // const timePart = indiaDateTime.split(",")[1].trim();

      // const formattedTime = timePart;
      // console.log(price);

      // const orderDetails = {
      //   vehicleType: "scooty",
      //   price: +price + 5,
      //   orderPlaceDate: formattedDate,
      //   orderPlaceTime: formattedTime,
      //   pickupLangitude:
      //     selectedCard === "send"
      //       ? place?.location?.lat
      //       : parcelDetails?.location?.lat,
      //   pickupLongitude:
      //     selectedCard === "send"
      //       ? place?.location?.lng
      //       : parcelDetails?.location?.lng,

      //   dropLangitude:
      //     selectedCard === "send"
      //       ? parcelDetails?.location?.lat
      //       : place?.location?.lat,
      //   dropLongitude:
      //     selectedCard === "send"
      //       ? parcelDetails?.location?.lng
      //       : place?.location?.lng,
      //   pickupAddress:
      //     selectedCard === "send" ? place?.name : parcelDetails?.name,
      //   pickupVicinity:
      //     selectedCard === "send" ? place?.vicinity : parcelDetails?.vicinity,
      //   dropAddress:
      //     selectedCard === "send" ? parcelDetails?.name : place?.name,
      //   dropVicinity:
      //     selectedCard === "send" ? parcelDetails?.vicinity : place?.vicinity,

      //   sendReceiverData:
      //     selectedCard === "send"
      //       ? [
      //           {
      //             personName: profile?.name,
      //             mobile: profile?.mobile,
      //             landMark: "",
      //             address: profile.address,
      //             typeUser: "Sender",
      //           },
      //           {
      //             personName: parcelDetails?.senderName,
      //             mobile: parcelDetails?.mobile,
      //             landMark: parcelDetails?.landMark,
      //             address: parcelDetails?.address,
      //             typeUser: "Receiver",
      //           },
      //         ]
      //       : [
      //           {
      //             personName: profile?.name,
      //             mobile: profile?.mobile,
      //             landMark: "",
      //             address: profile.address,
      //             typeUser: "Receiver",
      //           },
      //           {
      //             personName: parcelDetails?.senderName,
      //             mobile: parcelDetails?.mobile,
      //             landMark: parcelDetails?.landMark,
      //             address: parcelDetails?.address,
      //             typeUser: "Sender",
      //           },
      //         ],
      // };

      // API.post("/user/placed-order", orderDetails, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     navigation.navigate("lookingforride", {
      //       price: Math.ceil(+price + 5),
      //       vehicleType: "scooty",
      //       placeName:
      //         selectedCard === "send" ? place?.name : parcelDetails?.name,
      //       dropAddress: {
      //         location: {
      //           lat:
      //             selectedCard === "send"
      //               ? parcelDetails?.location?.lat
      //               : place?.location?.lat,
      //           lng:
      //             selectedCard === "send"
      //               ? parcelDetails?.location?.lng
      //               : place?.location?.lng,
      //         },
      //         name: selectedCard === "send" ? parcelDetails?.name : place?.name,
      //         vicinity:
      //           selectedCard === "send"
      //             ? parcelDetails?.vicinity
      //             : place?.vicinity,
      //       },
      //       pickUpCoordinated: {
      //         lat:
      //           selectedCard === "send"
      //             ? place?.location?.lat
      //             : parcelDetails?.location?.lat,
      //         lng:
      //           selectedCard === "send"
      //             ? place?.location?.lng
      //             : parcelDetails?.location?.lng,
      //       },
      //       orderId: res?.data?.order?._id,
      //     });
      //   })
      //   .catch((e) => {
      //     console.log("failure");
      //     console.log(e.response?.data?.message);
      //     Toast.show({
      //       text1: error?.response?.data?.message ?? "Failed to place Order",
      //       type: "error",
      //       position: "bottom",
      //     });
      //     // setApisError(e.response?.data?.message);
      //     // Handle error here
      //   });
    } else {
      navigation.navigate("ParSavedUsers", {
        place: {
          name: placeName?.placeName,
          vicinity: placeName?.placeVicinity,
          location: { lat: newMarker.latitude, lng: newMarker.longitude },
          // lat: newMarker.latitude,
          // lng: newMarker.longitude,
        },
      });
    }
  };

  useEffect(() => {
    if (parcelDetails) {
      const distance = haversineDistance(
        place?.location,
        parcelDetails?.location
      );
      let fixedDis = (distance * 7).toFixed(0);
      setPrice(fixedDis); // Assume price per 100 meters is $10
    }
  }, [parcelDetails]);

  // console.log(parcelDetails);

  return (
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
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            showsMyLocationButton={false}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: lng }}
              title={place?.name}
              description={place?.vicinity}
            >
              <PinIcon name="map-pin" size={30} color="#e02e88" />
            </Marker>

            <Marker
              coordinate={newMarker}
              draggable
              onDragEnd={handleMarkerDragEnd} // Track drag end
              title="New Position"
            >
              <PinIcon name="map-pin" size={30} color="#2b8a3e" />
            </Marker>

            <Circle
              center={{ latitude: lat, longitude: lng }}
              radius={100} // 100 meters
              strokeColor="#e02e88"
              fillColor="rgba(224, 46, 136, 0.2)"
              strokeWidth={2}
            />

            <Polyline
              coordinates={[
                { latitude: lat, longitude: lng },
                {
                  latitude: newMarker.latitude,
                  longitude: newMarker.longitude,
                },
              ]}
              strokeColor="#e02e88"
              strokeWidth={3}
              lineDashPattern={[10, 5]}
            />
          </MapView>
        ) : (
          <View style={styles.mapContainer}>
            <ActivityIndicator color="#e02e88" size={30} />
          </View>
        )}
      </View>
      <ParcelBtnCard>
        {isPickLocationFromParc && (
          <ShowPickLocation place={placeName} selectedCard={selectedCard} />
        )}
        <CustomBtn
          onPress={onNavigateSavedAddressScreen}
          title="Confirm Location"
          btnBg="#e02e88"
          btnColor="#fff"
        />
      </ParcelBtnCard>
    </View>
  );
};

export default ChangeLoc100mViaMap;

// Function to calculate the distance between two points in km
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Ensures the map covers the entire container
  },
});

const ShowPickLocation = ({ place, selectedCard }) => {
  const { profile } = useSelector((state) => state.profileSlice);
  return (
    <View style={pickLocStyles.container}>
      <Text style={pickLocStyles.title}>
        Double Check {selectedCard === "send" ? "Pickup" : "Drop"} point
      </Text>
      <Text style={pickLocStyles.subTitle}>
        You can change {selectedCard === "send" ? "Pickup " : "Drop "}
        between 100 meters
      </Text>
      <View style={pickLocStyles.card}>
        <PickLocationIcon size={25} color="#17a773" />
        <View style={pickLocStyles.innerCard}>
          <Text
            style={pickLocStyles.placeName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {place?.placeName}
          </Text>
          <Text
            style={pickLocStyles.placeVicinity}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {place?.placeVicinity}
          </Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text style={pickLocStyles.placeName}>{profile?.name}</Text>
            <Text style={pickLocStyles.placeVicinity}>{profile?.mobile}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const pickLocStyles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
    marginBottom: 10,
    // marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 11,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
  },
  innerCard: {
    width: "90%",
    // backgroundColor: "red",
    // gap: 4,
  },
  placeName: {
    fontSize: 15,
    fontWeight: "500",
  },
  placeVicinity: {
    fontSize: 13,
    color: "gray",
  },
});
