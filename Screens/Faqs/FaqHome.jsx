import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CustomeAppbar from "../../Utils/CustomeAppbar/CustomeAppbar";
import FaqBtnCard from "../../Components/Faqs/FaqBtnCard";
import FaqAnswerCard from "../../Components/Faqs/FaqAnswerCard";
import FaqRatingCard from "../../Components/Faqs/FaqRatingCard";
import Data from "../../Constants/FaqData.json";
export default function FaqHome({ navigation, route }) {
  const { title } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    let newData = Data.filter((e) => {
      return e.maintitle == title;
    });

    setData(newData[0].data);
  }, []);

  //  const [data, setData] = useState([])
  //  const [qa, setQa] = useState([])
  //  const [id ,setId] = useState(title)
  // useEffect(()=>{
  //     const newData = Data.filter((e)=>{
  //         return e.maintitle == id
  //     })
  //     setData(newData[0]?.data)
  //     // console.log(data);
  // }, [])

  function SetAns(question , answer){      
      navigation.navigate("FaqAnswer" , {data:{question , answer, title}})
  }

  return (
    <View style={styles.conatiner}>
      <CustomeAppbar title="FAQs" onBack={() => navigation.goBack()} />
      <View style={{ height: 100 }} />

      <Text style={{fontWeight:"bold"}}>{title}</Text>

      {data?.map((e, index) => {
        const key = Object.keys(e)[0];
        const value = e[key];
        return <FaqBtnCard key={index} title={key} onclick={()=>SetAns(key , value)} />
      })}

      {/* <FaqAnswerCard
        question="Hey man its Bullshit ?"
        answer="Yeah Man  its all Bullshit"
      />

      <FaqRatingCard /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 26,
    gap: 20,
    position: "relative",
  },
});
