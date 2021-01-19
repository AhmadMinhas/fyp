import React from "react";
import { Switch, Platform } from "react-native";

import { theme } from "../constants";

const GRAY_COLOR = "rgba(168, 182, 200, 0.30)"; //for thumb color

export default class SwitchInput extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    let thumbColor;

    if (Platform.OS === "android") {
      thumbColor = GRAY_COLOR;
    }

    return (
      <Switch
        thumbColor={thumbColor}
        trackColor={{
          // false: gray,
          true: theme.colors.accent
        }}
        value={value} //to assign changes otherwise it will stay stuck
        {...props}//for toggling
      />
    );
  }
}
