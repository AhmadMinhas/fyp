import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,ScrollView,
  AsyncStorage,
  Image
} from "react-native";
import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";


export default class Login extends Component {

  static navigationOptions = {
    header: null
  };

  state = {
    email: null,
    password: null,
    errors: [],
    loading: false,
  };
    

async handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];
    var token = {};
    user = await AsyncStorage.getItem('token');
    Keyboard.dismiss();
    this.setState({ loading: true });
    if (!email)errors.push("email");
    if(!password)errors.push("password");
     loginfromapi= async () =>{

      fetch('http://192.168.0.14:5000/auth/login',{
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', },
        body: JSON.stringify({ 'email' : email, 'password': password }),})
        .then((response) => response.json())
        .then((response) => {
          console.log(response.error)
          this.setState({ errors, loading: false });
          if (response.error === 1){
            errors.push("email");
            errors.push("password");
            Alert.alert("","username or password is incorrect!")
          }

          else if (response.error === 0) {  
            
            AsyncStorage.setItem('token',response.token);
            navigation.navigate("Home");
          }
          
          else if (response.error === -1){
            Alert.alert("","username or password not going to API")
          }

        }
        )
    }
    if(!errors.length){
      loginfromapi();
    }
    this.setState({ errors, loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} >
  <Block padding={[40, theme.sizes.base * 2]} style={styles.Container}>
  <Block center bottom ><Image style= {styles.image} source={require('../assets/deg.png')} /></Block>
     
         <Text h3 center bold style={{marginBottom:70, marginTop:5}}>
            Log into your account
          </Text>

          <ScrollView>
          <Block middle >
            <Input
              label="University email address"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

            <Button color="#f5f5f5"  onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
                
              >
                Forgot your password?
              </Text>
            </Button>
          </Block>
          </ScrollView>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color:"#747474",
    backgroundColor:"#f5f5f5"
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
  ,
    image://logo
  {
    justifyContent:"center",
    position:"absolute",
    padding:20,
    width:"50%",
    height:100
    
  },
  Container:{
    backgroundColor:"#f5f5f5"
  },
});
