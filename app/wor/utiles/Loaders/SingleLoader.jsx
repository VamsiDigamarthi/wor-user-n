import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { View, StyleSheet } from "react-native";

const SkeletonLoader = () => {
  return (
    <View style={styles.SkeletonLoader}>
      <ContentLoader
        speed={2}
        width="95%" // Adjusted to take the full width of the container
        height={100} // Adjusted height
        viewBox="0 0 400 60"
        backgroundColor="#b1aaaa"
        foregroundColor="#ecebeb"
      >
        <Rect x="20" y="10" rx="3" ry="3" width="100%" height="15" />
        {/* Adjusted width */}
        <Rect x="20" y="40" rx="3" ry="3" width="100%" height="15" />
        <Rect x="20" y="70" rx="3" ry="3" width="100%" height="15" />

        {/* Adjusted width */}
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  SkeletonLoader: {
    width: "100%",
    height: 100, // Updated to match loader height
    paddingHorizontal: 10, // Added padding for spacing
    marginBottom: 15, // Added margin to separate loaders
  },
});

export default SkeletonLoader;
