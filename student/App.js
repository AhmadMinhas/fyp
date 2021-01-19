import React  from "react";
import { StyleSheet } from "react-native";
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation";
import { Block } from "./components";

// import all used images
const images = [
  require("./assets/icons/back.png"),
];

const fetchFonts = () => { //function, that loads async
  return Font.loadAsync({ //load async returns a promise
    '2Dumb': require('./assets/fonts/2Dumb.ttf'),
    '3Dumb': require('./assets/fonts/3Dumb.ttf'),
    'alpha_echo': require('./assets/fonts/alpha_echo.ttf'),
    'OpenSans-Bold':require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default class App extends React.Component {

  state = {
    isLoadingComplete: false
  };


  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this.handleResourcesAsync , fetchFonts} //kicks off fetching fonts
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}//app loaded
        />
      );
    }

    return (
      <Block white >
        <Navigation/>
      
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
