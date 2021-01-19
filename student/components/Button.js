import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../constants";

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>//children..text on
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={ 0.7}//lighters the text when tapped or touch is active
        {...props}// on tap in login password see and forgot pw access
      >
        {children} 
      </TouchableOpacity>//children..forgotpw and see pw, terms of services all touchable
    );
  }
}

Button.defaultProps = {
  startColor: theme.colors.bluish,
  endColor: theme.colors.newcolor,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.3, 0.9],
  opacity: 0.8,
  color: theme.colors.white
};

export default Button;

const styles = StyleSheet.create({
  button: {//styling of button
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    marginVertical: theme.sizes.padding / 3
  },
 bluish: { backgroundColor:theme.colors.bluish },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 }
});
