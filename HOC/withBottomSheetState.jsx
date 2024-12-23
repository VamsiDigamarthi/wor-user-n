// import React, { useState, useRef, useCallback } from "react";
// import CustomBottomSheet from "../Utils/BottomSheetForMap/BottomSheet";
// import MainSelectingScreens from "../Screens/Dashboard/Home/BottosheetScreens/MainSelectingScreens";
// import LiveLocation from "../Screens/Dashboard/Home/BottosheetScreens/LiveLocation";
// import SpamCallSheet from "../Screens/Dashboard/Home/BottosheetScreens/SpamCallSheet";
// import PoliceStatons from "../Screens/Dashboard/Home/BottosheetScreens/PoliceStatons";
// import ChatWithCaptain from "../Screens/Dashboard/Home/BottosheetScreens/components/ChatUi/ChatWithCaptain";

// const withBottomSheetState = (WrappedComponent) => {
//   return (props) => {
//     const bottomSheetRef = useRef(null);
//     const [screen, setScreen] = useState("main");

//     const handleOpenSafetySheet = useCallback(() => {
//       bottomSheetRef.current?.present();
//     }, []);

//     const changeScreen = (newScreen) => {
//       setScreen(newScreen);
//     };

//     return (
//       <>
//         <WrappedComponent
//           {...props}
//           screen={screen}
//           changeScreen={changeScreen}
//           handleOpenSafetySheet={handleOpenSafetySheet}
//         />
//         <CustomBottomSheet
//           bottomSheetRef={bottomSheetRef}
//           bgcolor="#fff5f9"
//           snapPoints={["50%", "70%"]}
//           manualCloseSheet={() => setScreen("main")}
//         >
//           {screen === "main" && <MainSelectingScreens onPress={changeScreen} />}
//           {screen === "liveloc" && <LiveLocation onPress={changeScreen} />}
//           {screen === "spam" && <SpamCallSheet onPress={changeScreen} />}
//           {screen === "police" && <PoliceStatons onPress={changeScreen} />}
//           {screen === "chat" && <ChatWithCaptain onPress={changeScreen} />}
//         </CustomBottomSheet>
//       </>
//     );
//   };
// };

// export default withBottomSheetState;
