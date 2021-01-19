import React, { Component } from "react";
import { StyleSheet,TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import Block from "./Block";
import { theme } from "../constants";

export default class CardC extends Component {

    state = {
        buttonColor: 'gray',
        buttonColor1: 'gray',
      };

      onButtonPressC = () => {
        if(this.state.buttonColor=='gray')
        {
          this.setState({ buttonColor: 'red' }) // grey
        }
        else {
          this.setState({ buttonColor: 'gray' }) // red
        }
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
    padding: theme.sizes.base + 1,
    marginBottom: theme.sizes.base*0.2
  },
  tag: {
    justifyContent:"flex-end",
    paddingHorizontal: theme.sizes.base,
    marginRight: theme.sizes.base * 0.625
  },
});
