import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../Constants/colors";
const screenWidth = Dimensions.get("window").width;
export const commonStyles = StyleSheet.create({
  rowWithGap: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  rowWithJcSb: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowWithJcCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const positionStyles = StyleSheet.create({
  fixedBtnPosition: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
  },
  fixedBtnPositionBg: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    gap: 10,
  },
});

export const allAppBarContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.bottomSheetBg,
  },
});
