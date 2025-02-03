import { useEffect, useState } from "react";
import { Linking } from "react-native";

export const useUpiApps = () => {
  const [installedUpiApps, setInstalledUpiApps] = useState([]);

  const upiApps = {
    "Google Pay": "tez://upi/pay",
    PhonePe: "phonepe://upi/pay",
    Paytm: "paytmmp://upi/pay",
    BHIM: "bhim://upi/pay",
    "Amazon Pay": "amazonpay://upi/pay",
    "WhatsApp UPI": "whatsapp://upi/pay",
    "Airtel Thanks": "airtel://upi/pay",
    "Axis Pay": "axisbank://upi/pay",
    "ICICI iMobile": "icicibank://upi/pay",
    "SBI Yono": "sbiyono://upi/pay",
    Cred: "cred://upi/pay",
    vi: "navi://upi/pay",
    Mobikwik: "mobikwik://upi/pay",
    Freecharge: "freecharge://upi/pay",
    "Pockets by ICICI": "pockets://upi/pay",
    "Kotak Mahindra Bank": "kotak://upi/pay",
    "HDFC Bank": "hdfcbank://upi/pay",
    "Yes Bank": "yesbank://upi/pay",
    "Bank of Baroda": "bob://upi/pay",
    "Punjab National Bank": "pnb://upi/pay",
    "Canara Bank": "canarabank://upi/pay",
    "Union Bank": "unionbank://upi/pay",
    "IDFC First Bank": "idfcbank://upi/pay",
    "IndusInd Bank": "indusind://upi/pay",
    "Federal Bank": "federalbank://upi/pay",
    "Equitas Small Finance Bank": "equitas://upi/pay",
    "PayZapp by HDFC": "payzapp://upi/pay",
    Jiomoney: "jiomoney://upi/pay",
    FamPay: "fampay://upi/pay",
    Slice: "slice://upi/pay",
    Lazypay: "lazypay://upi/pay",
    Simpl: "simpl://upi/pay",
    ZestMoney: "zestmoney://upi/pay",
    "Ola Money": "olamoney://upi/pay",
    "Flipkart UPI": "flipkart://upi/pay",
    MyJio: "myjio://upi/pay",
    "RBL Bank": "rblbank://upi/pay",
    "Standard Chartered Bank": "scbank://upi/pay",
    "DBS Bank": "dbsbank://upi/pay",
    "AU Small Finance Bank": "aubank://upi/pay",
    "Bandhan Bank": "bandhanbank://upi/pay",
    "CSB Bank": "csbbank://upi/pay",
    "DCB Bank": "dcbbank://upi/pay",
    "IDBI Bank": "idbibank://upi/pay",
    "Indian Bank": "indianbank://upi/pay",
    "Indian Overseas Bank": "iob://upi/pay",
    "Karur Vysya Bank": "kvb://upi/pay",
    "South Indian Bank": "sib://upi/pay",
    "TJSB Bank": "tjsbbank://upi/pay",
    "UCO Bank": "ucobank://upi/pay",
    "Vijaya Bank": "vijayabank://upi/pay",
  };
  useEffect(() => {
    const checkInstalledUpiApps = async () => {
      const installedApps = [];

      for (const [appName, deepLink] of Object.entries(upiApps)) {
        try {
          const supported = await Linking.canOpenURL(deepLink);
          if (supported) {
            installedApps.push(appName);
          }
        } catch (error) {
          console.error(`Error checking ${appName}:`, error);
        }
      }

      setInstalledUpiApps(installedApps);
    };

    checkInstalledUpiApps();
  }, []);

  console.log(installedUpiApps);

  return { installedUpiApps };
};
