import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Location from "expo-location";
import { fetchNameAndVicinity } from "../../../Constants/displaylocationmap";

export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    const data = await fetchNameAndVicinity(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude
    );

    // const [place] = await Location.reverseGeocodeAsync({
    //   latitude: currentLocation.coords.latitude,
    //   longitude: currentLocation.coords.longitude,
    // });
    // console.log(data, "data");

    return {
      location: {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      },
      placeVicinity: data ? data.vicinity : "Location not found",
      placeName: data ? data.name : "Main Location not found",
    };
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null,
    placeName: null,
    placeVicinity: null,
    errorMsg: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload.location;
        state.placeName = action.payload.placeName;
        state.placeVicinity = action.payload.placeVicinity;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message;
      });
  },
});

export default locationSlice.reducer;
