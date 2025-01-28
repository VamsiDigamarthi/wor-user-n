import { View, Text, StyleSheet } from "react-native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import TopCard from "./Components/TopCard";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";

export default function SavedLocations() {
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
      </View>
    </AppBarLayout>
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
    fontWeight: "bold",
  },
});
