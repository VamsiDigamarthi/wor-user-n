import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialDropDetails: {}, // this drop details show fixed marker fro map -- like user change location upto 100 m -- change location new marker display old marker still display based on this value
  dropDetails: {},
  selectedVehicleType: "scooty",
  isRideScreen: false,
  isParcScreen: false,
  isBeforeBook: false,
  isSendOrReceiveParcel: "send",
  parcelType: "",
  price: 0,
  priceDetails: {},
  pickUpDetails: {},
  howManyMens: 0,
  time: null,
  formateTime: null,
  completeRideDetails: null,
  paymentMethod: "wallet",
  pollineCoordinates: [],
  distanceFromPickUpToDrop: 0,
  duration: 0,

  randomExtraCharges: 0,
  randomExtraChrgesWithVehicle: {},

  // base fare
  baseFare: 0,
  baseFareSet: {},
  // time fare
  timeFareValue: 0,
  timeFareValueSet: {},
  // plat form
  platFormValue: 0,
  setPlatFormValueSet: {},
  // surge price
  surgeValue: 0,
  surgeValueSet: {},
  // distance from pick to drop
  distanceFare: 0,
  distanceFareSet: {},
};

const allRideDetails = createSlice({
  name: "ride-all-details",
  initialState,
  reducers: {
    setCompleteRideDetails: (state, action) => {
      state.completeRideDetails = action.payload;
    },

    setDistanceFromPickUpToDrop: (state, action) => {
      state.distanceFromPickUpToDrop = action.payload;
    },

    setPickUpDetails: (state, action) => {
      state.pickUpDetails = action.payload;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    setMergePickUpDetails: (state, action) => {
      state.dropDetails = {
        ...state.pickUpDetails,
        ...action.payload, // Merge the existing state with the new payload
      };
    },

    setDropDetails: (state, action) => {
      state.dropDetails = action.payload;
    },

    setInitialDropDetails: (state, action) => {
      state.initialDropDetails = action.payload;
    },

    mergeDropDetails: (state, action) => {
      state.dropDetails = {
        ...state.dropDetails,
        ...action.payload, // Merge the existing state with the new payload
      };
    },

    setHowManyMens: (state, action) => {
      state.howManyMens = action.payload;
    },

    setTime: (state, action) => {
      state.time = action.payload?.time;
      state.formateTime = action.payload?.formatedTime;
    },

    setSelectVehicleType: (state, action) => {
      state.selectedVehicleType = action.payload;
    },
    setIsRideScreen: (state, action) => {
      state.isRideScreen = true;
    },
    setIsParcScreen: (state, action) => {
      state.isParcScreen = action.payload;
    },
    setIsBeforeBook: (state, action) => {
      state.isBeforeBook = action.payload;
    },
    setIsSendOrReceiveParcel: (state, action) => {
      state.isSendOrReceiveParcel = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPriceDetails: (state, action) => {
      state.priceDetails = action.payload;
    },
    setParcelType: (state, action) => {
      state.parcelType = action.payload;
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    setPollylineCoordinates: (state, action) => {
      state.pollineCoordinates = action.payload;
    },

    setRandomExtraCharge: (state, action) => {
      state.randomExtraCharges = action.payload;
    },

    setRandomExtraChrgesWithVehicle: (state, action) => {
      const { vehicleType, otherCharges } = action.payload;
      state.randomExtraChrgesWithVehicle[vehicleType] = otherCharges;
    },

    // base fare
    setBaseCharges: (state, action) => {
      state.baseFare = action.payload;
    },

    setBasefareSet: (state, action) => {
      const { vehicleType, baseFare } = action.payload;
      state.baseFareSet[vehicleType] = baseFare;
    },

    // time fare
    setTimeFareValue: (state, action) => {
      state.timeFareValue = action.payload;
    },

    setTimeFareValueSet: (state, action) => {
      const { vehicleType, timeFare } = action.payload;
      state.timeFareValueSet[vehicleType] = timeFare;
    },

    // platform  fare
    setPlatFormValue: (state, action) => {
      state.platFormValue = action.payload;
    },

    setPlatFormValueSet: (state, action) => {
      const { vehicleType, platFormPrice } = action.payload;
      state.setPlatFormValueSet[vehicleType] = platFormPrice;
    },

    // surge  fare
    setSurgeValue: (state, action) => {
      state.surgeValue = action.payload;
    },

    setSurgeValueSet: (state, action) => {
      const { vehicleType, surgeValue } = action.payload;
      state.surgeValueSet[vehicleType] = surgeValue;
    },

    // distance   fare
    setDistnaceValue: (state, action) => {
      state.distanceFare = action.payload;
    },

    setDistnaceValueSet: (state, action) => {
      const { vehicleType, price } = action.payload;
      state.distanceFareSet[vehicleType] = price;
    },

    clearDropData: (state) => {
      state.initialDropDetails = null; // {}
      state.dropDetails = null; // {}
      state.price = 0;
      state.selectedVehicleType = "scooty";
      state.isParcScreen = false;
      state.isBeforeBook = false;
      state.isSendOrReceiveParcel = "send";
      state.priceDetails = null; // {}
      state.isRideScreen = false;
      state.pickUpDetails = null;
      state.howManyMens = 0;
      state.completeRideDetails = null;
      state.time = null;
      state.formateTime = null;
      state.paymentMethod = "wallet";
      state.pollineCoordinates = [];
      state.distanceFromPickUpToDrop = [];
      state.duration = 0;
      state.randomExtraCharges = 0;
      state.randomExtraChrgesWithVehicle = {};
      state.baseFare = 0;
      state.baseFareSet = {};
      state.timeFareValue = 0;
      state.timeFareValueSet = {};
      state.platFormValue = 0;
      state.setPlatFormValueSet = {};
      state.surgeValue = 0;
      state.surgeValueSet = {};
      state.distanceFare = 0;
      state.distanceFareSet = {};
    },
  },
});

export const {
  setDropDetails,
  setInitialDropDetails,
  mergeDropDetails,
  setSelectVehicleType,
  setIsParcScreen,
  setIsRideScreen,
  setIsBeforeBook,
  setIsSendOrReceiveParcel,
  setPrice,
  setPriceDetails,
  setParcelType,
  clearDropData,
  setPickUpDetails,
  setHowManyMens,
  setMergePickUpDetails,
  setCompleteRideDetails,
  setTime,
  setPaymentMethod,
  pickUpDetails,
  setPollylineCoordinates,
  setDistanceFromPickUpToDrop,
  setDuration,
  setRandomExtraCharge,
  setRandomExtraChrgesWithVehicle,
  // base fare
  setBaseCharges,
  setBasefareSet,
  // time fare
  setTimeFareValue,
  setTimeFareValueSet,
  // platform
  setPlatFormValue,
  setPlatFormValueSet,
  // surge value
  setSurgeValue,
  setSurgeValueSet,
  // distnace fare
  setDistnaceValue,
  setDistnaceValueSet,
} = allRideDetails.actions;

export default allRideDetails.reducer;

// from ride booking screen to sedn params data (show price screen)
// 1, placeName
// 2, pickUpCoordinated
// 3, dropDetails,
// 4, selectedVehicleType
// ------------ parcel screen ------------
// 5, isPichLocationFromParc
// 6, parcelDetails
// 7, selectedCard

// 1, dropDetails --- from ride booking screeen
// let dropDetails = {
//   id: "ChIJ37ZrTf6hyzsRejW7XzCru1Y",
//   location: { lat: 17.4801969, lng: 78.4171029 },
//   name: "Emami Ltd",
//   photo:
//     "AWYs27xcUKQG3bgk2lpNnlo54uLSIL-XAJsbo9EC84AC2yadhYNZylqYxLMx7oR3FEjYHQSuohjlBi9wREaDThe1kkdU3jkENsfENcYg--wa-_TqVjqILQngMa_ZLzZ1V_hwGTi_xehnb8HjCZYFemNbtJS_7u-mYQ6X6SbgZMKID1oZYVBo",
//   vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
// };

// 5, parcelDetails
// let parcelDetails = {
//   address: "Hitech city",
//   landMark: "Hyderabad",
//   location: { lat: 17.4801969, lng: 78.4171029 },
//   mobile: 7997979797,
//   name: "Emami Ltd",
//   senderName: "Vamai",
//   vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
// };
