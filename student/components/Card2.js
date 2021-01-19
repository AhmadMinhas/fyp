import React, { Component } from "react";
import { StyleSheet,TouchableOpacity, View,Alert} from "react-native";

import Block from "./Block";
import * as Icon from "@expo/vector-icons";
import { theme } from "../constants";

export default class Card2 extends Component {
    _onPressButton() {
        Alert.alert(
          "",
          "Do you want to download these notes?",
          [
            { text: "YES", onPress: () => Alert.alert("","download starting") },
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            
          ],
          { cancelable: false }
        );
      }
    
      _onPressButton1() {
        
        Alert.alert(
          "",
          "Do you want to report these notes?",
          [
            { text: "YES", onPress: () => Alert.alert("","These notes are reported to admin!")  },
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            
          ],
          { cancelable: false }
        );
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

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base ,
    marginBottom: theme.sizes.base*0.75
  }
  
});
