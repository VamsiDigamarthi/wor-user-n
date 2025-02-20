import { StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/colors";
import { TouchableOpacity } from "react-native";

const WalletMoneyCard = ({
  isHeightChange,
  isOpenAddMoney = false,
  isCheckBox = false,
}) => {
  return (
    <View style={styles.container}>
      <SingleWallet
        isHeightChange={isHeightChange}
        isOpenAddMoney={isOpenAddMoney}
        isCheckBox={isCheckBox}
      />
      {isOpenAddMoney && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: COLORS.cardBackground,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="plus" size={17} color="gray" />
          </View>
          <Text style={{ color: COLORS.subHeading, fontSize: 17 }}>
            Add Money to Wallet
          </Text>
        </View>
      )}
    </View>
  );
};

export default WalletMoneyCard;

const SingleWallet = ({ isHeightChange, isCheckBox }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#fff5f9",
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.cardBackground,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: isCheckBox ? "column" : "row",
          gap: 2,
          alignItems: isCheckBox ? "flex-start" : "center",
          height: isHeightChange ?? 50,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons name="wallet-outline" size={20} color="#EA4C89" />
          <Text style={{ color: COLORS.heading, fontSize: 17 }}>Wallet</Text>
        </View>
        {isCheckBox && (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#EA4C89",
              marginLeft: 28,
            }}
          >
            <Text style={{ fontSize: 11, color: COLORS.subHeading }}>
              Available Balance :
            </Text>{" "}
            $100
          </Text>
        )}
      </View>
      {isCheckBox ? (
        <TouchableOpacity
          style={[styles.checkbox]}
          //  onPress={onToggle}
        >
          {/* {isChecked && <View style={styles.checkedMark} />} */}
        </TouchableOpacity>
      ) : (
        <Text style={{ fontSize: 17, fontWeight: "600", color: "#EA4C89" }}>
          $100
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 10,
    // height: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#c7c8c9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
