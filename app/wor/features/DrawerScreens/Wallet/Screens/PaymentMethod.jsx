import { Platform, View } from "react-native";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import PaymentModal from "../Modal/PaymentModal";
import { COLORS } from "../../../../../../Constants/colors";

export default function PaymentMethod() {
  return (
    <AppBarLayout title="Payment Method" isPositionAppbar={true}>
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingTop : Platform.OS=="ios" ? 110 : 100,
          backgroundColor:COLORS.mainBackgroundColor
        }}
      >
        <PaymentModal />
      </View>
    </AppBarLayout>
  );
}
