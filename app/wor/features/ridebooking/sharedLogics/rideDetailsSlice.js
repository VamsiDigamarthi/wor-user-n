import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialDropDetails: {}, // this drop details show fixed marker fro map -- like user change location upto 100 m -- change location new marker display old marker still display based on this value
  dropDetails: {},
  selectedVehicleType: "scooty",
  isRideScreen: false,
  isParcScreen: false,
  isBeforeBook: false, // this prop checking -- if true check m-pin and book order or parcel if not navigate saved added screen in parcel flow
  isSendOrReceiveParcel: "send",
  parcelType: "",
  price: 0,
  priceDetails: {},
  pickUpDetails: {},
  howManyMens: 0,
  time: null,
  formateTime: null,
  completeRideDetails: null, // this will store entire ride data after captain accept the ride -- socket will listening and stored and snnd to otp verification screen
  paymentMethod: "wallet",
};

const allRideDetails = createSlice({
  name: "ride-all-details",
  initialState,
  reducers: {
    setCompleteRideDetails: (state, action) => {
      state.completeRideDetails = action.payload;
    },
    setPickUpDetails: (state, action) => {
      state.pickUpDetails = action.payload;
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
