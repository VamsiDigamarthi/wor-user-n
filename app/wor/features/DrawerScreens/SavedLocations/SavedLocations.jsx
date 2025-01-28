import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import TopCard from "./Components/TopCard";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import {fonts} from "../../../fonts/Fonts"
import { useState } from "react";


export default function SavedLocations() {
  const [selectedList, setSelectedList] = useState("rides");
  const [rideData, setRideData] = useState([
    {
      title: "Kphb",
      subtitle: "Twilight PUB,Hyderabad,India",
    },
    {
      title: "Kphb",
      subtitle: "Twilight PUB,Hyderabad,India",
    },
    {
      title: "Kphb",
      subtitle: "Twilight PUB,Hyderabad,India",
    },
    {
      title: "Kphb",
      subtitle: "Twilight PUB,Hyderabad,India",
    },
    {
      title: "Kphb",
      subtitle: "Twilight PUB,Hyderabad,India",
    },
  ]);
  const [parcelData, setParcelData] = useState([
    {
      title: "Miyapur",
      subtitle: "Twilight PUB,Hyderabad,India",
      otherData: ["+91 12345 67890", "Kondapur Gachibowli Hyderabad"],
    },
    {
      title: "Miyapur",
      subtitle: "Twilight PUB,Hyderabad,India",
      otherData: ["+91 12345 67890", "Kondapur Gachibowli Hyderabad"],
    },
    {
      title: "Miyapur",
      subtitle: "Twilight PUB,Hyderabad,India",
      otherData: ["+91 12345 67890", "Kondapur Gachibowli Hyderabad"],
    },
    {
      title: "Miyapur",
      subtitle: "Twilight PUB,Hyderabad,India",
      otherData: ["+91 12345 67890", "Kondapur Gachibowli Hyderabad"],
    },
    {
      title: "Miyapur",
      subtitle: "Twilight PUB,Hyderabad,India",
      otherData: ["+91 12345 67890", "Kondapur Gachibowli Hyderabad"],
    },
  ]);

  return (
    <AppBarLayout title="Saved Location">
      <View style={styles.container}>
        <Text style={styles.heading}>Saved Places</Text>
        <TopCard
          title="Home"
          subtitle="Kothaguda , Hyderabad 500050"
          icon={<Entypo name="home" size={24} color="#EA4C89" />}
        />
        <TopCard
          title="Work"
          subtitle="Miyapur , Hmt Colony , 500049"
          icon={<MaterialIcons name="work" size={24} color="#EA4C89" />}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            borderBottomWidth: 1,
            borderStyle: "dashed",
            paddingBottom: 15,
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "#e0e0e0", borderRadius: 7 }}
          >
            <MaterialIcons name="add" size={24} color="#EA4C89" />
          </TouchableOpacity>
          <Text style={{fontFamily:fonts.robotoRegular}}>Add New Place</Text>
        </View>

        <Text style={styles.heading}>All Saved Places</Text>

        <View style={{ flexDirection: "row", width: "100%" }}>
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
              data={rideData}
              renderItem={({ item }) => (
                <TopCard
                  type="favorite"
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={<Entypo name="triangle-left" size={30} color="black" />}
                />
              )}
              // keyExtractor={(item) => item.index.toString()}
              ItemSeparatorComponent={<View style={{ height: 10 }} />}
            />
          )}
          {selectedList == "parcel" && (
            <FlatList
              data={parcelData}
              renderItem={({ item }) => (
                <TopCard
                  title={item.title}
                  subtitle={item.subtitle}
                  otherData={item.otherData}
                  icon={<Entypo name="triangle-left" size={30} color="black" />}
                />
              )}
              // keyExtractor={(item) => item.index.toString()}
              ItemSeparatorComponent={<View style={{ height: 10 }} />}
            />
          )}
        </View>
      </View>
    </AppBarLayout>
  );
}

function Chip({ text, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#EA4C89" : "#FFF7FB",
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: selected ? "white" : "black" , fontFamily:fonts.robotoRegular }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 16,
  },
  heading: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily:fonts.robotoSemiBold
  },
});
