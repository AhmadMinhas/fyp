import React, { Component } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";


class Welcome extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    showTerms: false
  };

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              You need to be the part of university to get the access.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              You can only use your registration number and password for this application
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. You would not be allowed to post irrelevant stuff.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. Incase of 3 reports user will be banned to get an access to the application
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. This application will provide all the necessary facilities a student requires in university.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. Do not post false information causing any problem.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7.In case of any problem please report to admin through your university email.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Verbal, physical, written or other abuse will not be allowed on this application.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              9. Do not post spam messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
                I understand
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  
  render() {
    const { navigation } = this.props;

    return (
      <Block style={styles.Container}>
      <Block center bottom flex={1}><Image style= {styles.image} source={require('../assets/deg.png')} /></Block>
      
        <Block center bottom flex={0.4}>
        
          <Text center style={{ fontFamily:"alpha_echo" ,fontSize:26}}>
            Student's Facilitation System
          </Text>
          <Text h3 style={{ marginTop: theme.sizes.padding / 2, fontFamily:"2Dumb" }}>
            Learn, Earn and Socialize.
          </Text>
        </Block>

        
        <Block bottom flex={0.7} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Login")}>
            <Text center semibold white>
              Login
            </Text>
          </Button>
          <Button color="#f5f5f5" shadow onPress={() => navigation.navigate("SignUp")}>
            <Text center semibold>
              Signup
            </Text>
          </Button>
          <Button color="#f5f5f5" onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              Terms of service
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}



export default Welcome;

const styles = StyleSheet.create({

image://logo
  {
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    width:"60%",
    height:200,
    
  },
  Container:{
    backgroundColor:"#f5f5f5"
  }
});
