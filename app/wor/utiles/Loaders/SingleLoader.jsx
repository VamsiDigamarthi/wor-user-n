import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { View, StyleSheet } from "react-native";

const SkeletonLoader = () => {
  return (
    <View style={styles.SkeletonLoader}>
      <ContentLoader
        speed={2}
        width="100%" // Adjusted to take the full width of the container
        height={60} // Adjusted height
        viewBox="0 0 400 60"
        backgroundColor="#b1aaaa"
        foregroundColor="#ecebeb"
      >
        <Rect x="20" y="10" rx="3" ry="3" width="90%" height="10" />
        {/* Adjusted width */}
        <Rect x="20" y="30" rx="3" ry="3" width="80%" height="10" />
        {/* Adjusted width */}
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  SkeletonLoader: {
    width: "100%",
    height: 70, // Updated to match loader height
    paddingHorizontal: 10, // Added padding for spacing
    marginBottom: 15, // Added margin to separate loaders
  },
});

export default SkeletonLoader;
