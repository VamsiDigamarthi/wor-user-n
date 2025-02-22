import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { addTipToServer, decrementTip, incrementTip } from "../tipSlice";
import { fonts } from "../../../../fonts/Fonts";

export default function AddTipNew() {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { tip, error, isTipAdded, status } = useSelector(
    (state) => state.tipSlice
  );

  const decrement = () => dispatch(decrementTip());
  const increment = () => dispatch(incrementTip());

  const handleSubmitTip = () => {
    dispatch(addTipToServer({ token, tip, orderId: completeRideDetails._id }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.gradientBg}
        source={require("../../../../../../assets/gradient.png")}
      >
        <Text style={styles.text}>
          Add tip to your rider to make them little happy
        </Text>
      </ImageBackground>

      <View style={styles.rowCard}>
        <Text style={{ fontFamily: fonts.robotoMedium }}>Add tip to Rider</Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={styles.moneyCard}>
            {completeRideDetails?.addTip === 0 && (
              <Pressable onPress={decrement} style={styles.Pressable}>
                <Text style={styles.insideText}>-</Text>
              </Pressable>  
            )}
            <Text style={styles.addedText}>
              ₹
              {completeRideDetails?.addTip === 0
                ? tip
                : completeRideDetails?.addTip}
            </Text>
            {completeRideDetails?.addTip === 0 && (
              <Pressable onPress={increment} style={styles.Pressable}>
                <Text style={styles.addedText}>+</Text>
              </Pressable>
            )}
          </View>

          {isTipAdded || completeRideDetails?.addTip ? (
            <Text style={[styles.addedText, { color: "gray" }]}>Tip Added</Text>
          ) : (
            <Pressable onPress={handleSubmitTip}>
              <Text style={[styles.addedText, { color: "red" }]}>Add</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#fff",
    height: 150, // Adjusted height to fit the content better
    elevation: 2, // Optional: Adds a shadow for better UI
  },
  gradientBg: {
    height: 70,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    justifyContent: "center",
  },
  text: {
    width: "80%",
    color: "#111111",
    fontSize: 14,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
  moneyCard: {
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: "gray",
    height:30,
    // borderStyle: "dashed", 
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor:"#F5F5F5",
    width: 100,
    justifyContent: "center",
  },
  rowCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
  },
  addedText: {
    fontSize: 10,
    fontFamily: fonts.robotoSemiBold,
    color: "#111111",
  },
  Pressable: {
    // width: 30,
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
    // backgroundColor:"red ",

  },
  insideText: {
    fontSize: 20,
    fontFamily: fonts.robotoSemiBold,
  },
});
