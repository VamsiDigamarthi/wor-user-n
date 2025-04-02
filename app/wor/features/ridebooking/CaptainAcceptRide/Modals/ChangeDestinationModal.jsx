import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import WhereToGo from "../../selectdroplocation/Components/WhereToGo";
import MicModal from "../../selectdroplocation/MicModal";
import { changeDestinaton } from "../Services/changeDestination.serv";
import { useDispatch, useSelector } from "react-redux";
import { setCompleteRideDetails } from "../../sharedLogics/rideDetailsSlice";
import { checkUserLocation } from "../../../../../../HOC/redux/LocationBarrier";
import LocationBarrierModal from "../../../../../../HOC/LocationBarrierModal";
import { setLocationBarrierModal } from "../../../../../../HOC/redux/locationBarrierSlice";
import NewLocationBarrierModal from "../../../../../../HOC/NewLocationBarrierModal";

const ChangeDestinationModal = ({
  openDestinationModal,
  closeDestinationModal,
  destinationName,
  destinationCoordinates,
}) => {
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [isMicModalOpenClose, setIsMicModalOpenClose] = useState(false);
  const [micVoiceText, setMicVoiceText] = useState("");

  const [locationBarrierModal, setLocationBarrierModal] = useState(false);

  const handleLocationBarrierModal = () => {
    setLocationBarrierModal(!locationBarrierModal);
  };

  const handleReturnPlaceName = async (place) => {
    let locationBarrier = await checkUserLocation({
      location: place?.location,
    });
    if (!locationBarrier) {
      handleLocationBarrierModal();
      return;
    }

    const data = await changeDestinaton({
      token,
      orderId: completeRideDetails._id,
      place,
    });

    closeDestinationModal();
    if (!data) return;
    dispatch(setCompleteRideDetails(data));
  };

  return (
    <>
      <ModalUI
        openCloseState={openDestinationModal}
        closeModalFun={closeDestinationModal}
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        closebtn={false}
      >
        <View style={styles.container}>
          <WhereToGo
            title={destinationName}
            passParams={true}
            micVoiceText={micVoiceText}
            setMicVoiceText={setMicVoiceText}
            setIsMicModalOpenClose={setIsMicModalOpenClose}
            isDisplayAddHomePlace={false}
            height={400}
            handleReturnPlaceName={handleReturnPlaceName}
          />
        </View>
        <MicModal
          micVoiceText={micVoiceText}
          setMicVoiceText={setMicVoiceText}
          isMicModalOpenClose={isMicModalOpenClose}
          setIsMicModalOpenClose={setIsMicModalOpenClose}
        />
      </ModalUI>
      <NewLocationBarrierModal
        isOpenLocationBarrierModal={locationBarrierModal}
        handleCloseModal={handleLocationBarrierModal}
      />
    </>
  );
};

export default ChangeDestinationModal;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
