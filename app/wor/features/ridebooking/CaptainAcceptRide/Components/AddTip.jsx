import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTipToServer, decrementTip, incrementTip } from "../tipSlice";

const AddTip = () => {
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
  // console.log(error, isTipAdded);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>Add Tip</Text>
      <View style={styles.rowCard}>
        <View style={styles.moneyCard}>
          {completeRideDetails?.addTip === 0 && (
            <Pressable
              onPress={decrement}
              style={{
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "600" }}>-</Text>
            </Pressable>
          )}
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            ₹
            {completeRideDetails?.addTip === 0
              ? tip
              : completeRideDetails?.addTip}
          </Text>
          {completeRideDetails?.addTip === 0 && (
            <Pressable
              style={{
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={increment}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>+</Text>
            </Pressable>
          )}
        </View>
        {isTipAdded || completeRideDetails?.addTip ? (
          <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
            Tip Added
          </Text>
        ) : (
          <Pressable onPress={handleSubmitTip}>
            <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>
              Add
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default AddTip;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moneyCard: {
    // width: 120,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
    paddingHorizontal: 10,
    // paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
