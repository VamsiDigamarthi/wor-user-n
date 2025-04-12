import Search from "./Components/Search";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
// import SliderComponent from "../../../../../Utils/SliderComponent/SliderComponent";
import Card from "./Components/Card";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { COLORS } from "../../../../../Constants/colors";
import { getDrivingSchool } from "./Drivingschool.serv";
import { useIsFocused } from "@react-navigation/native";
export default function DrivingSchools() {
  const isFocused = useIsFocused();

  const [drivingSchools, setDrivingSchools] = useState(null);

  const handleFetchDrivingSchool = async () => {
    const data = await getDrivingSchool();
    if (data) {
      setDrivingSchools(data);
    }
  };

  useEffect(() => {
    handleFetchDrivingSchool();
  }, [isFocused]);

  // console.log("drivingSchools",drivingSchools?.length);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <AppBarLayout
        title="Driving School"
        isPositionAppbar={true}
        rightText="Add Business"
        navigationText="https://drivingschools.nuhvin.com"
      >
        <View
          style={[
            styles.container,
            { paddingTop: Platform.OS == "ios" ? 110 : 80 },
          ]}
        >
          {/* <SliderComponent /> */}

          <View style={styles.searchCard}>
            <Text style={styles.heading}>Driving Schools in Your Location</Text>
            <Search />
          </View>

          <FlatList
            // style={{flex:1, height:400}}
            data={drivingSchools}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Card item={item} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Data </Text>
                <Text style={styles.emptyText}>
                  Please click to add business button to add your services{" "}
                </Text>
              </View>
            }
          />
        </View>
      </AppBarLayout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.mainBackgroundColor,
    gap: 12,
  },

  searchCard: {
    marginTop: 10,
    gap: 10,
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  heading: {
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
    textAlign: "left",
    fontSize: 16,
  },
  emptyContainer: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontFamily: fonts.robotoRegular,
  },
});
