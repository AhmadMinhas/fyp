import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

const VALID_EMAIL = "FA16-BCS-054@cuilahore.edu.pk";

export default class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

   
    if (email !== VALID_EMAIL) {
      errors.push("email");
    }

    this.setState({ errors, loading: false });

    if (VALID_EMAIL) {
      Alert.alert(
        "",
        "Please check your email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check your email address.",
        [{ text: "Try again" }],
        { cancelable: false }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.forgot} >
        <Block padding={[0, theme.sizes.base * 2]} style={styles.Container}>
          <Text h1 bold>
            Forgot your password?
          </Text>
          <Block middle>
            <Input
              label="University email address"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Submit
                </Text>
              )}
            </Button>

            <Button color="#f5f5f5" onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  Container:{
    backgroundColor:"#f5f5f5"}
});
