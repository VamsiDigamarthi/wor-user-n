import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

import token from "./Features/Auth/LoginSlice";
// import profileSlice from "./Features/Auth/ProfileSlice";
import profileSlice from "../app/wor/features/ridebooking/home/redux/profileSlice";
import initialModals from "../app/wor/features/ridebooking/home/redux/initialModals";

import previewOrders from "./Features/Auth/PreviousOrders";
import location from "./Features/Location/LocationSlice";
import nearPlaces from "../app/wor/features/ridebooking/home/redux/nearPlaceSlice";
import homePlaces from "../app/wor/features/ridebooking/home/redux/homePlace";
import allRideDetails from "../app/wor/features/ridebooking/sharedLogics/rideDetailsSlice";
import favoritePlaces from "../app/wor/features/ridebooking/selectdroplocation/redux/favoritePlaces.slice";

import tipSlice from "../app/wor/features/ridebooking/CaptainAcceptRide/tipSlice";

import rideHistory from "../app/wor/features/DrawerScreens/RideHistory/rideHistory.slice";
import homeOrWorkPlace from "../app/wor/features/ridebooking/selectdroplocation/redux/homePlaceType.slice";

import parcelSavedPlace from "../app/wor/features/Parcels/redux/parcelSavedPlace.slice";

import priceDetails from "../app/wor/features/ridebooking/home/redux/priceDetailSlice";

import locationBarrier from "../HOC/redux/locationBarrierSlice";

const reduxFlipper = require("redux-flipper").default;

const store = configureStore(
  {
    reducer: {
      token,
      profileSlice,
      previewOrders,
      location,
      nearPlaces,
      homePlaces,
      allRideDetails,
      favoritePlaces,
      tipSlice,
      rideHistory,
      homeOrWorkPlace,
      parcelSavedPlace,
      initialModals,
      priceDetails,
      locationBarrier,
    },
  },
  applyMiddleware(reduxFlipper())
);

export default store;
