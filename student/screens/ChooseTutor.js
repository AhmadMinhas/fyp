import React, { Component } from "react";
import {
  Image,//LOGO
  StyleSheet, TouchableOpacity
} from "react-native";
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Setings from "./Setings"
import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import * as Icon from "@expo/vector-icons";

class ChooseTutor extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

  render() {
    const { navigation } = this.props;

    return (
      <Block style={styles.Container}>
      <Block center bottom ><Image style= {styles.image} source={require('../assets/teach.png')} /></Block>
      
        <Block center bottom  style= {styles.text}>
        
        
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Teach and Learn
            </Text>
          
        </Block>

        
        <Block bottom flex={0.3} margin={[50, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("posttutors")}>
            <Text center semibold white>
              Teacher
            </Text>
          </Button>
          <Button gradient onPress={() => navigation.navigate("Tutors")}>
            <Text center semibold white>
              Student
            </Text>
          </Button>
         
          
        </Block>
        <HideWithKeyboard><Setings navigation={this.props.navigation} style4={{backgroundColor:"blue"}}/></HideWithKeyboard> 
      </Block>
    );
  }
}



export default ChooseTutor;

const styles = StyleSheet.create({
    stepsContainer: {
      backgroundColor:"#e6e6ff",
      position: "absolute",
      bottom: theme.sizes.base * 3,
      right: 0,
      left: 0
    },
  image:
    {
      marginTop:"16%",
      alignItems:"center",
      padding:10,
      width:"55%",
      height:"80%",
      resizeMode:"contain"
    },
    Container:{
      backgroundColor:"#e6f9ff"
    },
    text:{
      justifyContent: "center"
    }
  });