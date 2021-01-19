import React,{useState} from 'react'
import {Button, StyleSheet, Text,View,TextInput, Modal} from 'react-native'
import { Cardcar } from '../components';
 const GoalInput = (props) => {
    
         //the above code remains  in JS, runs in a virtual machine. converse with native code using a bridge
    return (
      <Cardcar style={{flex:0.9}}>
        <View style={styles.inputContainer}>
        <TextInput  
        
        placeholder="Course Goal"
        autoFocus={true}
        returnKeyType="done"
        
        />
        <View style={{flexDirection:"row", justifyContent:"space-around",width:"80%"}}>
        <View style={{width:"40%"}}><Button  title="Cancel" color="red" /></View>
        <View style={{width:"40%",padding:10}}><Button title="ADD"/></View>
        </View>
        </View>
        </Cardcar>
    )
}
//View is, react native compile it to native code
export default GoalInput;

const styles=StyleSheet.create({

    inputContainer:{
       flex:0.6,
        justifyContent:"center",
        alignItems:"center"
      
      },
      input:{
        width:"80%",
        borderColor:"black",
        borderWidth:1,
        padding:10, //padding inside textbox
 marginBottom:10     },
      list:{
        borderWidth:1,
        backgroundColor:"gray",
        padding:20,
        marginVertical:10 //around the border
      }

})