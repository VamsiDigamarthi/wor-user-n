import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { fonts } from "../../../../fonts/Fonts";
import { useSelector } from "react-redux";
import { API } from "../../../../../../Constants/url";

function getDayDifferenceFromNow(dateString) {
  const givenDate = new Date(dateString);
  const today = new Date();

  // Remove time part for accurate day difference
  const given = new Date(
    givenDate.getFullYear(),
    givenDate.getMonth(),
    givenDate.getDate()
  );
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = now - given;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function RefHistory() {
  const { token } = useSelector((state) => state.token);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.get("/auth/get-ref-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data, "---------------");

        setData(response.data);
      } catch (error) {
        console.log(error);

        setError(error.message);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Referral history</Text>

      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {data?.map((e, index) => (
          <HistoryCard key={index} data={e} />
        ))}
      </ScrollView>
    </View>
  );
}

function HistoryCard({ data }) {
  return (
    <View style={styles.mainCard}>
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>{data?.referredUserId?.name}</Text>
        <Text style={styles.amount}>₹{data?.rewardAmount}</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.smalltext}>
          {getDayDifferenceFromNow(data.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    padding: 8,
    position: "relative",
    bottom: 80,
    height: 240,
    gap: 10,
  },
  mainCard: {
    gap: 5,
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smalltext: {
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
  },
  amount: {
    color: "green",
    fontFamily: fonts.robotoBold,
  },
});
