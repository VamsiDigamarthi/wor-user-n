import RazorpayCheckout from "react-native-razorpay";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../features/ridebooking/home/redux/profileSlice";

export const usePayments = () => {
  const { token, loading } = useSelector((state) => state.token);

  // console.log(token);

  const { profile } = useSelector((state) => state.profileSlice);

  const dispatch = useDispatch();

  async function addMoney(amount) {
    try {
      const response = await API.post(
        "/payment/addwalletonly",
        {
          amount: parseInt(amount),
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message == "Funds added successfully") {
        dispatch(onProfileSection({ token }));

        Toast.show({
          text1: "Added Money Successful",
          text2: `Available Balance ${response?.data?.totalWalletBalance}`,
          type: "success",
          position: "bottom",
        });
      }

      if (response.data.message === "Add money to wallet failed") {
        Toast.show({
          text1: "Failed to Add Money",
          text2: "Please contact our Team if Money Deducted",
          type: "error",
          position: "bottom",
        });
      }
    } catch (error) {
      Toast.show({
        text1: "Something Went Wrong",
        text2: error?.message,
        position: "bottom",
        type: "error",
      });
    }
  }

  async function verifyPayment(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount
  ) {
    try {
      const response = await API.post("/payment/verify-payment", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      if (response.data.status === "Payment Verified") {
        addMoney(amount);
      }

      if (response.data.status == "Payment Verification Failed") {
        Toast.show({
          text1: "Failed To Add Money",
          text2: "Your Money Didint Deducted",
          position: "bottom",
          type: "error",
        });
      }
    } catch (error) {
      Toast.show({
        text1: "Something Went Wrong",
        text2: error?.message,
        position: "bottom",
        type: "error",
      });
    }
  }

  const addToWallet = async (amount) => {
    if (!amount) {
      Toast.show({
        text1: "Please Enter Valid Amount !",
        type: "error",
        position: "top",
      });

      return;
    }

    try {
      const response = await API.post("/payment/create-order", {
        amount: amount,
        currency: "INR",
      });

      const { order_id } = response.data;

      const options = {
        key: "rzp_live_zbmR4QaoePLouz",
        amount: amount,
        currency: "INR",
        name: "Adding Money To Wallet",
        description: `Add ₹${amount} to wallet`,
        order_id: order_id,
        prefill: {
          email: profile?.email || "donation@gmail.com",
          contact: profile?.mobile || "8978106223",
        },

        theme: {
          color: "#ea4c89",
        },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          //   Alert.alert(`Adding Money`);

          console.log(
            data.razorpay_order_id,
            data.razorpay_payment_id,
            data.razorpay_signature
          );

          verifyPayment(
            data.razorpay_order_id,
            data.razorpay_payment_id,
            data.razorpay_signature,
            amount
          );

          // Toast.show({
          //   text1: "Payment Success",
          //   position: "top",
          //   type: "success",
          // });
        })
        .catch((error) => {
          Toast.show({
            text1: error?.message || "Payment Failed",
            position: "top",
            type: "error",
          });
          // Alert.alert("Error", `Payment failed: ${error.description}`);
        });
    } catch (error) {
      Alert.alert("Error", "Failed to initiate payment.");
    }
  };

  const makeDonation = async (amount, email, mobile) => {
    if (!amount) {
      Toast.show({
        text1: "Please Enter Valid Amount !",
        type: "error",
        position: "top",
      });

      return;
    }

    try {
      const response = await API.post("/payment/create-order", {
        amount: amount,
        currency: "INR",
      });

      const { order_id } = response.data;

      const options = {
        key: "rzp_live_zbmR4QaoePLouz",
        amount: amount,
        currency: "INR",
        name: "Donation to Women Rider Foundation",
        description: `Add ₹${amount} to wallet`,
        order_id: order_id,
        prefill: {
          email: email || "donation@gmail.com",
          contact: mobile,
        },

        theme: {
          color: "#ea4c89",
        },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          Alert.alert(`Thank You for Your Donation`);
          // Toast.show({
          //   text1: "Payment Success",
          //   position: "top",
          //   type: "success",
          // });
        })
        .catch((error) => {
          Toast.show({
            text1: error?.message || "Payment Failed",
            position: "top",
            type: "error",
          });
          // Alert.alert("Error", `Payment failed: ${error.description}`);
        });
    } catch (error) {
      Alert.alert("Error", "Failed to initiate payment.");
    }
  };

  return {
    makeDonation,
    addToWallet,
    profile,
    token,
  };
};
