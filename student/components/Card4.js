import React, { Component } from "react";
import { StyleSheet,TouchableOpacity, View,Alert} from "react-native";

import Block from "./Block";
import * as Icon from "@expo/vector-icons";
import { theme } from "../constants";

export default class Card4 extends Component {

    
    _onPressButton1() {
        
        Alert.alert(
          "",
          "Do you want to report this ad?",
          [
            { text: "YES", onPress: () => Alert.alert("","Ad reported, Admin will review it!")  },
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
        <View style={styles.alternativeLayoutButtonContainer}>
         
        <TouchableOpacity right onPress={this._onPressButton1} style={styles.sp}  >
                <Icon.MaterialIcons size={25} name="report-problem" color={theme.colors.accent} />
        </TouchableOpacity>
        </View>
        </Block>
        
            
     
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.base ,
    marginBottom: theme.sizes.base*0.75
  },
  sp:{marginLeft:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   },
});
