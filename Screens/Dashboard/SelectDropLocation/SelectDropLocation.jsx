import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React from "react";
import DropLocation from "../../../Components/Dashboard/DropLocation/DropLocation";
import AllServices from "../../../Components/Dashboard/Home/AllServices/AllServices";
import SliderComponent from "../../../Utils/SliderComponent/SliderComponent";
import { useNavigation } from "@react-navigation/native";

const SelectDropLocation = () => {
  const navigation = useNavigation();

  const onNavigatePrice = () => {
    navigation.navigate("ShowPrice");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <DropLocation />
        <AllServices />
        <SliderComponent />
        <Image
          style={styles.images}
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/7911/de63/52b2a75265856d69f141a38e4434558f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAocZw5Rc3jB8VsL64WqRmTcZsABcJV4rNDw4rdVJ3gZKC8iLxUAiPZul0RJnCgirjIrvjJT1FBxkNXOYwoJW0UvlmRhI9BtAmQUzZGPg15wqw1Uz~E6EEbDAKAofy7aCQ2ZGsg-A48C~9n0ozfB1b2gTGC8wsuHz05K3Z9q4zwvfbJy3tJbiEnWNFDaEGvo2MAst9ckOtdE~W6YjEH41GSjdlx1UtPSVuqH4HODgwRnxUGgqYayCpkkiLiHQB1w5lesRCndmYVgGQG3m2v1Q9TSI09LwJxAk5066FcD9mt2SrVTwBNeTMK8rZYluvhUnGYX-fDOgCFjsdSN7Yj5SA__",
          }}
        />
        <Button title="Price" onPress={onNavigatePrice} />
      </ScrollView>
    </View>
  );
};

export default SelectDropLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f9",
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 20,
  },
  images: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
