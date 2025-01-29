import { View, Text } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import OfferCard from "../Components/OfferCard";
import UhOhCard from "../Components/UhOhCard";

export default function OfferModal({ onClose }) {
  const [coupons, setCoupons] = useState([0]);

  return (
    <ModalUI
      // openCloseState={shceduleOrderModal}
      closeModalFun={onClose}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={{ width: "100%", padding: 10 }}>
        {coupons.length > 0 && (
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Offers</Text>
        )}

        {coupons.length ? (
          <View style={{ marginTop: 10, gap: 10 }}>
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </View>
        ) : (
          <UhOhCard />
        )}
      </View>
    </ModalUI>
  );
}
