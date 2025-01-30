import { View } from "react-native";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import PaymentModal from "../Modal/PaymentModal";

export default function PaymentMethod() {
  return (
    <AppBarLayout title="Payment Method" isPositionAppbar={true}>
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <PaymentModal />
      </View>
    </AppBarLayout>
  );
}
