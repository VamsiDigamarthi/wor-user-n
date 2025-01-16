import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeWorImage = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://s3-alpha-sig.figma.com/img/7911/de63/52b2a75265856d69f141a38e4434558f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAocZw5Rc3jB8VsL64WqRmTcZsABcJV4rNDw4rdVJ3gZKC8iLxUAiPZul0RJnCgirjIrvjJT1FBxkNXOYwoJW0UvlmRhI9BtAmQUzZGPg15wqw1Uz~E6EEbDAKAofy7aCQ2ZGsg-A48C~9n0ozfB1b2gTGC8wsuHz05K3Z9q4zwvfbJy3tJbiEnWNFDaEGvo2MAst9ckOtdE~W6YjEH41GSjdlx1UtPSVuqH4HODgwRnxUGgqYayCpkkiLiHQB1w5lesRCndmYVgGQG3m2v1Q9TSI09LwJxAk5066FcD9mt2SrVTwBNeTMK8rZYluvhUnGYX-fDOgCFjsdSN7Yj5SA__",
      }}
      style={styles.backImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.goTitle}>#go Women Rider</Text>
        <Text style={styles.madeText}>Made for women</Text>
        <Text style={styles.madeText}>Crafted in Hyderbad</Text>
      </View>
    </ImageBackground>
  );
};

export default HomeWorImage;

const styles = StyleSheet.create({
  backImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f5f2f2a9",
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  goTitle: {
    color: "#e02e88",
    fontSize: 30,
    fontWeight: "bold",
  },
  madeText: {
    color: "gray",
  },
});
