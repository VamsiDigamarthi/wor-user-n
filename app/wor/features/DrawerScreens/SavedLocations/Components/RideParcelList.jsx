import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Chip from "./Chip";

import { Entypo } from "@expo/vector-icons";
import TopCard from "./TopCard";
import { useDispatch, useSelector } from "react-redux";
import { onFavoritePlace } from "../../../ridebooking/selectdroplocation/redux/favoritePlaces.slice";

import NoData from "../../../../utiles/NoData";
import { fetchSavedPlace } from "../../../Parcels/redux/parcelSavedPlace.slice";

const RideParcelList = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);

  const { savedPlaces } = useSelector((state) => state.parcelSavedPlace);
  const [selectedList, setSelectedList] = useState("rides");

  useEffect(() => {
    if (token) {
      dispatch(onFavoritePlace({ token }));
      dispatch(fetchSavedPlace({ token }));
    }
  }, [token]);

  return (
    <>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <Chip
          selected={selectedList === "rides"}
          text={"Rides"}
          onPress={() => setSelectedList("rides")}
        />
        <Chip
          selected={selectedList === "parcel"}
          text={"Parcel Address"}
          onPress={() => setSelectedList("parcel")}
        />
      </View>

      <View style={{ height: 380 }}>
        {selectedList == "rides" && (
          <FlatList
            data={favoritePlaces}
            renderItem={({ item }) => (
              <TopCard
                type="favorite"
                title={item.name}
                subtitle={item.vicinity}
                icon={<Entypo name="triangle-left" size={30} color="black" />}
                entireItem={item}
              />
            )}
            ListEmptyComponent={
              <NoData message="Please added Favorite Places" />
            }
            ItemSeparatorComponent={<View style={{ height: 10 }} />}
          />
        )}
        {selectedList == "parcel" && (
          <FlatList
            data={savedPlaces}
            renderItem={({ item }) => (
              <TopCard
                title={item.landMark}
                subtitle={item.address}
                otherData={[item.mobile, item.senderName]}
                icon={<Entypo name="triangle-left" size={30} color="black" />}
                entireItem={item}
                editDeleteType="savedAddress"
              />
            )}
            ListEmptyComponent={<NoData message="Please added Saved Places" />}
            ItemSeparatorComponent={<View style={{ height: 10 }} />}
          />
        )}
      </View>
    </>
  );
};

export default RideParcelList;

const styles = StyleSheet.create({});
