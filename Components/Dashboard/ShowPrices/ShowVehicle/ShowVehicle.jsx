import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ShowVehicle = () => {
  const navigation = useNavigation();

  const onNavigateLookForRide = () => {
    navigation.navigate("lookingforride");
  };
  return (
    <Pressable style={{ width: "100%" }} onPress={onNavigateLookForRide}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/6c39/c344/6842997a36ea8546ed6bc9872ca9d015?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qIsO~FlCf0CY6so-yw3WzH4wxW7IB82Uxm5HjKvRIeaNJzH4CiW9FeIScedd6-DK2EBLhDgEQp4g3q0haJlacsof5pdKwiz02nGhladaKXlKD-vjGR3ivGo89XPYzyRl30F0eFphhxXth4uMDvSMXTND57B7VOlLJ0VxAFQlY0jfSDuD-JH8S5qNgvW9tjgstLP-DwgnbYfAnlc1bklQD28RTe-tjWrBBSaKhtUqgRmqidlTSuh5mR6uZxsbS5yXo57wEYHpqhruJsGVZ1FDXfQDvmbIRuXTdi7amlhZ0RKgBsgtm4v8JT1ldol6XGlW4RMPdnrFtJIPgTZVM7pXcA__",
          }}
        />
        <View style={styles.textCard}>
          <View style={styles.textWithPersonCard}>
            <Text style={styles.vehicleType}>Scooty</Text>
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Ionicons name="person-outline" size={13} color="#E02E88" />
              <Text style={{ fontSize: 12, color: "gray" }}>1</Text>
            </View>
          </View>
          <Text style={styles.captionText}>Beat the traffic & Pay less</Text>
        </View>
        <Text style={styles.price}>₹70</Text>
      </View>
    </Pressable>
  );
};

export default ShowVehicle;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  textCard: {
    width: "68%",
  },
  textWithPersonCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 30,
  },
  vehicleType: { fontWeight: "bold", fontSize: 14, color: "#e02e88" },
  captionText: {
    color: "#888",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
