import React, { Component } from "react";
import { StyleSheet,TouchableOpacity, View,Alert,Modal,Text,ScrollView,TextInput,Input} from "react-native";

import Block from "./Block";
import CardC from"./CardC";
import * as Icon from "@expo/vector-icons";
import { theme,mocks } from "../constants";

export default class Card1  extends Component {
    state = {
      
        categories: [],
        TextInputcomments: '',
        buttonColor: 'gray',
        buttonColor1: 'gray',
        showTerms: false
      };
      onButtonPress = () => {
        if(this.state.buttonColor=='gray')
        {
          this.setState({ buttonColor: 'blue' }) // grey
        }
        else {
          this.setState({ buttonColor: 'gray' }) // red
        }
      } 

      _onPressButton2() {
        
        Alert.alert(
          "",
          "Do you want to report this post?",
          [
            { text: "YES", onPress: () => Alert.alert("","Ad reported, Post will review it!")  },
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            
          ],
          { cancelable: false }
        );
      }

      componentDidMount() {
        this.setState({ categories: this.props.categories });
      }

     


        


  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
        
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
        
        
        </Block>
        
            
     
    );
  }
}
Card1.defaultProps = {
  categories: mocks.categories
};

export const styles = StyleSheet.create({
  card: {
    shadowColor:"black",
      shadowOffset:{width:0,height:2},
      shadowRadius:6,
      shadowOpacity:0.9,
      backgroundColor:"white",
       marginBottom:10,
       elevation:15,
       padding:20,
       borderRadius:10
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base/ 4,
    marginRight: theme.sizes.base * 0.625,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:0,
    marginTop:30
  },

  sp:{marginLeft:"10%"},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   },
   text:{textDecorationLine: "underline", fontSize:25, marginBottom:15},
   input: {
   width:285,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base *2

  },
  icon:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    
  }
});
