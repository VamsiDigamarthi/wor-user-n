import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/colors";

export const infoModalStyles = StyleSheet.create({
  aadharModalStyles: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  insideCardStyle: {
    paddingBottom: 20,
    padding: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalCloseBtn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  btnTextStyle: {
    fontSize: 15,
  },
  insideModalCard: {
    width: "100%",
    // backgroundColor: "yellow",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
});
