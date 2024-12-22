import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { haversineDistance } from "../../../Constants/calculateKM";
import { useSelector } from "react-redux";
import { API } from "../../../Constants/url";

export const useParcelHomeHook = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);

  const route = useRoute();
  const { pickUpLocationCoorWithName, dropLocationCoorWithName } =
    route.params || {};

  // Initialize state for both pickup and drop location coordinates
  const [pickUpLocation, setPickUpLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [selecteParcelType, setSelectParcelType] = useState(null);
  const [price, setPrice] = useState(0);
  const [apiError, setApisError] = useState("");

  useEffect(() => {
    // If the new params contain pickUpLocationCoorWithName, update the state
    if (pickUpLocationCoorWithName) {
      setPickUpLocation(pickUpLocationCoorWithName);
    }
    // If the new params contain dropLocationCoorWithName, update the state
    if (dropLocationCoorWithName) {
      setDropLocation(dropLocationCoorWithName);
    }
  }, [pickUpLocationCoorWithName, dropLocationCoorWithName]);

  const [selectedCard, setSelectedCard] = useState(null);

  // this function run when user click send or received parcel
  // to set "Card" value based one to highlight ui
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // after collect and delivery address get to calculate total price
  useEffect(() => {
    if (pickUpLocation && dropLocation) {
      let distance = haversineDistance(
        pickUpLocation?.location,
        dropLocation?.location
      );
      setPrice(distance * 7);
    }
  }, [pickUpLocation, dropLocation]);

  const onHandleNavigateLocationScreen = () => {
    console.log(pickUpLocation);
    console.log(dropLocation);
    // Handle navigation logic here
    const indiaDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const datePart = indiaDateTime.split(",")[0];
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    const timePart = indiaDateTime.split(",")[1].trim();

    const formattedTime = timePart;

    const orderDetails = {
      vehicleType: "scooty",
      price: +price + 5,
      orderPlaceDate: formattedDate,
      orderPlaceTime: formattedTime,
      pickupLangitude: pickUpLocation?.location?.lng,
      pickupLongitude: pickUpLocation?.location?.lat,
      dropLangitude: dropLocation?.location?.lat,
      dropLongitude: dropLocation?.location?.lng,
      pickupAddress: pickUpLocation?.name,
      dropAddress: dropLocation?.name,
      dropVicinity: dropLocation?.vicinity,
      pickupVicinity: pickUpLocation?.vicinity,
      sendReceiverData: [
        {
          personName: pickUpLocation?.personName,
          mobile: pickUpLocation?.mobile,
          landMark: pickUpLocation?.landMark,
          address: pickUpLocation?.address,
          typeUser: "Sender",
        },
        {
          personName: dropLocation?.personName,
          mobile: dropLocation?.mobile,
          landMark: dropLocation?.landMark,
          address: dropLocation?.address,
          typeUser: "Receiver",
        },
      ],
    };

    API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        navigation.navigate("lookingforride", {
          price: Math.ceil(+price + 5),
          vehicleType: "scooty",
          placeName: pickUpLocation?.name,
          dropAddress: {
            location: {
              lat: dropLocation?.location?.lat,
              lng: dropLocation?.location?.lng,
            },
            name: dropLocation?.name,
            vicinity: dropLocation?.vicinity,
          },
          pickUpCoordinated: {
            lat: pickUpLocation?.location?.lat,
            lng: pickUpLocation?.location?.lng,
          },
          orderId: res?.data?.order?._id,
        });
      })
      .catch((e) => {
        console.log("failure");
        console.log(e.response?.data?.message);
        setApisError(e.response?.data?.message);
        // Handle error here
      });

    // after navigate
  };

  return {
    selectedCard,
    handleCardClick,
    pickUpLocation, // Use state value instead of directly from route.params
    onHandleNavigateLocationScreen,
    dropLocation, // Use state value instead of directly from route.params
    setSelectParcelType,
    selecteParcelType,
    price,
    apiError,
  };
};
