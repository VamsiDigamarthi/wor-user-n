import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../../Constants/colors";
import { useState } from "react";
import ModalUI from "../../../../../Utils/Modal/Modal";

const EmergencyContactNumber = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const onOpenAddContactHandler = () => {
    setIsAddContactOpen(!isAddContactOpen);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <Text
          style={{ fontSize: 18, fontWeight: "600", color: COLORS.heading }}
        >
          You Can Add Upto 5 Numbers
        </Text>
        <View
          style={{
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: COLORS.borderColor,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.borderColor,
          }}
        >
          <SingleNumber />
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <AntDesign name="pluscircleo" size={20} color={COLORS.subHeading} />
          <Pressable onPress={onOpenAddContactHandler}>
            <Text style={{ fontSize: 14, color: COLORS.subHeading }}>
              Add 2 more contact
            </Text>
          </Pressable>
        </View>
      </View>
      <ModalUI
        openCloseState={isAddContactOpen}
        closeModalFun={onOpenAddContactHandler}
      >
        <View style={{ gap: 10 }}>
          <Text>Add New Contact</Text>
          <Text>Enter Phone Number</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Pressable>
            <Text style={{ fontSize: 16, color: COLORS.heading }}>
              Continue
            </Text>
          </Pressable>
        </View>
      </ModalUI>
    </View>
  );
};

export default EmergencyContactNumber;

const SingleNumber = () => {
  return (
    <View style={styles.singleCard}>
      <View style={styles.singlefirstCard}>
        <View style={styles.thirdCard}>
          <View style={styles.fourth}></View>
          <View>
            <Text style={{ fontSize: 12, color: COLORS.heading }}>
              My Number
            </Text>
            <Text style={{ fontSize: 17, color: COLORS.subHeading }}>
              +91 9876543210
            </Text>
          </View>
        </View>
        <Pressable>
          <AntDesign name="delete" size={20} />
        </Pressable>
      </View>
      <View style={styles.fifth}>
        <View style={styles.sixth}>
          <Text>Night ride shared (9pm - 6am)</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={18}
            color={COLORS.subHeading}
          />
        </View>
        <View style={styles.seventh}>
          <Text>All ride shared automatically</Text>
          <Text>Night ride shared automatically (9PM-6AM)</Text>
          <Text>I wll shared rides manually</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCard: {
    width: "100%",
    gap: 10,
  },
  singleCard: {
    gap: 10,
    alignItems: "center",
    elevation: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  singlefirstCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  thirdCard: {
    width: "85%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  fourth: {
    width: 50,
    height: 50,
    borderRadius: 55,
    backgroundColor: "#fff",
    elevation: 1,
  },
  fifth: {
    width: "99%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 1,
    backgroundColor: "#d2d4d6",
  },
  sixth: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderRadius: 20,
    // backgroundColor: "#fff",
    backgroundColor: "#ebeced",
  },
  seventh: {
    backgroundColor: "#fff",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: COLORS.cardBackground,
  },
});
