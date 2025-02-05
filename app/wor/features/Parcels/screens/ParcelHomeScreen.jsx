import { Platform, ScrollView, StyleSheet, } from "react-native";
import ParSendReceiveCard from "../Components/ParSendReceiveCard";
import { useParcelHomeScreenHook } from "../Hooks/ParcelHomeScreenHook";
import ParcSendReceInputCard from "../Components/ParcSendReceInputCard";
import SelectParcelType from "../Components/SelectParcelType";
import ParcelSpecification from "../Components/ParcelSpecification";
import ParcelBtnCard from "../Components/ParcelBtnCard";
import CustomBtn from "../../../utiles/CustomBtn";
import ParSendRecDetailsDisplayCard from "../Components/ParSendRecDetailsDisplayCard";
import ParProtectDelivery from "../Components/ParProtectDelivery";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { COLORS } from "../../../../../Constants/colors";

const ParcelHomeScreen = () => {
  const {
    dropDetails,
    handleProtectedParcel,
    isProtectedParcel,
    onNavigateParcelPickUpLocationScreen,
  } = useParcelHomeScreenHook();

  return (
    <AppBarLayout title="Parcel" isPositionAppbar={true}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent,{paddingTop : Platform.OS=="ios" ? 110 : 100,}]}>
        <ParSendReceiveCard />
        {/* <View style={styles.tripDetailsCard}>
          <Text style={styles.tripDetailsText}>Trip Details: 1234567890</Text>
        </View> */}
        {dropDetails ? (
          <>
            <ParSendRecDetailsDisplayCard parcelDetails={dropDetails} />
            <ParProtectDelivery
              handleProtectedParcel={handleProtectedParcel}
              isChecked={isProtectedParcel}
            />
          </>
        ) : (
          <ParcSendReceInputCard />
        )}
        <SelectParcelType />
        <ParcelSpecification />
      </ScrollView>
      <ParcelBtnCard>
        <CustomBtn
          title="Continue"
          borderColor={dropDetails ? "#fff" : "#EA4C89"}
          btnBg={dropDetails ? "#EA4C89" : "#f7f7f7"}
          btnColor={dropDetails ? "#fff" : "#EA4C89"}
          onPress={() => dropDetails ? onNavigateParcelPickUpLocationScreen : null}
        />
      </ParcelBtnCard>
    </AppBarLayout>
  );
};

export default ParcelHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollViewContent: {
    padding: 10,
    gap: 15,
    flexGrow: 1,
    paddingBottom: 120,
    paddingTop: 100,
    backgroundColor:COLORS.mainBackgroundColor
  },
  tripDetailsCard: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#f1e0e8",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tripDetailsText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
