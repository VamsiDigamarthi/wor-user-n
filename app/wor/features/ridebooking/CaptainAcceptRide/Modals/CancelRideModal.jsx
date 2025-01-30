import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import RadioItem from "../../../DrawerScreens/About/components/RadioItem";
import { cancelData } from "../cancelData";
import CustomBtn from "../../../../utiles/CustomBtn";
import { cancelRide } from "../../LookingforRide/components/services/lookingForRideServices";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CancelRideModal = ({ openCancelModal, closeCancelModal }) => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);

  const [selectedValue, setSelectedValue] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const handleSelect = (id) => {
    setSelectedValue(id);
  };

  const handleCancelBtn = async () => {
    if (!selectedValue) {
      setErrMsg("Please Select Reason");
    }

    const data = await cancelRide({
      token,
      orderId: completeRideDetails?._id,
      reason: selectedValue,
    });

    if (data) {
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthenticatedStack" }],
      });
    }
  };

  return (
    <ModalUI
      openCloseState={openCancelModal}
      closeModalFun={closeCancelModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <View style={styles.innerCard}>
          <Text style={styles.heading}>Why do you want to cancel ?</Text>
          <Text style={styles.subHeading}>
            Please provide the reason for cancellation
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15, gap: 5 }}>
          {cancelData?.map((item) => (
            <RadioItem
              key={item.id}
              id={item.id}
              label={item.label}
              checked={selectedValue === item.label}
              onSelect={handleSelect}
            />
          ))}
        </View>

        {errMsg && (
          <Text style={{ fontSize: 11, fontWeight: "500", color: "red" }}>
            {errMsg}
          </Text>
        )}
        <View style={{ paddingHorizontal: 20, paddingVertical: 15, gap: 10 }}>
          <CustomBtn
            title="Okay, Cancel"
            btnBg="#f7f7f7"
            btnColor="#000"
            onPress={handleCancelBtn}
          />
          <CustomBtn
            title="Keep Waiting"
            btnBg="#e02e88"
            btnColor="#fff"
            onPress={closeCancelModal}
          />
        </View>
      </View>
    </ModalUI>
  );
};

export default CancelRideModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
  },
  innerCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
  },
  subHeading: {
    fontSize: 14,
    color: "gray",
  },
});
