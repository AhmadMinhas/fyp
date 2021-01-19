import React, { Component } from "react";
import { StyleSheet ,View} from "react-native";

import Block from "./Block";
import { theme } from "../constants";

const Cardcar=(props)=>{
  return (
      <View style={{...styles.card,...props.style}}>
      {props.children}
      </View>
  )
}
export default Cardcar;

export const styles = StyleSheet.create({
  card: {
    shadowColor:"black",
    shadowOffset:{width:0,height:2},
    shadowRadius:6,
    shadowOpacity:0.9,
    backgroundColor:"white",
     marginBottom:0,
     marginTop:"100%",
     elevation:15,
     padding:7,
    flex:0.9,
     borderRadius:10
}
});
