import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import PreferenceItem from "../../../Components/Dashboard/PreferenceCom/PreferenceItem/PreferenceItem";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

const Preference = ({navigation}) => {
  const data = [
    {
      name: "Email",
      values: [
        {
          label: "Allow emails for promotions and offers",
        },
        {
          label: "Allow email for invoice",
        },
      ],
    },
    {
      name: "SMS & WhatsApp",
      values: [
        {
          label: "Allow SMS for promotions and offers",
        },
        {
          label: "Allow WhatsApp for promotions",
        },
        {
          label: "Allow WhatsApp for invoice",
        },
      ],
    },
    {
      name: "Push Notifications",
      values: [
        {
          label: "Allow push notifications for promotions",
        },
        {
          label: "Allow push notifications for invoice",
        },
      ],
    },
  ];

  return (

<>
  

      
<CustomeAppbar title="Preference" onBack={() => navigation.goBack()} />
      <View  style={{height:100}}/>
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <PreferenceItem key={index} name={item.name} values={item.values} />
      ))}
    </ScrollView>
      </>
  
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 25,
  },
});
