import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,ScrollView
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class SignUp extends Component {
  state = {
    registration: null,
    username: null,
    password: null,
    semester:null,
    confirmPassword:null,
    errors: [],
    nameValidate:true,
    loading: false,
    passwordValidate:true,
    messagepassword:"",
    semval:"",
    usernamemessage:"",
    emailmessage:"",
    cpm:""
  };

  handleSignUp() {
    const { navigation } = this.props;
    const { registration, username, password,semester,confirmPassword } = this.state;
    const errors = [];
    var user_err = 0
    Keyboard.dismiss();
    this.setState({ loading: true });

     registerfromapi=()=>{
       
      fetch('http://192.168.0.14:5000/auth/register',{
       method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', },
         body: JSON.stringify({ 'email' : registration,
          'username': username, 'semester': semester, 'password': confirmPassword }), })
           .then((response) => response.json()) 
           .then((response) => {
             console.log(response)
             user_err=response.error
             if(user_err === 1 ){
              Alert.alert("","the username already exists")
            errors.push("username")
            }
            else if(user_err === 2 ){
              Alert.alert("","email already taken")
            errors.push("email")
            }
           else if (user_err === 0) {
              Alert.alert(
                "Success!",
                "You can get an access to your account",
                [
                  {
                    text: "Continue",
                    onPress: () => {
                      navigation.navigate("Login");
                    }
                  }
                ],
                { cancelable: false }
              );
            }


             this.setState({error:response.error,loading:false})

               }) 
  
          }  

    // check with backend API or with some static data
    if (!registration)errors.push("registration");
    if (!username) {errors.push("username"); this.setState.username=" "};
    if (!password) errors.push("password");
    if (!semester) errors.push("semester");
    if (!confirmPassword) errors.push("confirmPassword");

    if (password !== confirmPassword) {
      Alert.alert("","Passwords didn't match");
      errors.push("confirmPassword");
  }
 emailr=/^(FA|SP|fa|sp)([01]?\d|20)-[a-zA-Z]{3}-[0-9]{3}@cuilahore.edu.pk$/
         if(emailr.test(registration))
        {
      
        this.setState.emailmessage=""; 
      }
      else{
        errors.push("registration")
       // Alert.alert("","Password minimum eight characters, at least one letter and one number")
      this.setState.emailmessage="Use your university email address"; 
    
    }


  pasw=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      
        if(pasw.test(password))
        {
        this.setState({passwordValidate:true})
        this.setState.messagepassword=""; 
      }
      else{
        errors.push("password")
       // Alert.alert("","Password minimum eight characters, at least one letter and one number")
       this.setState.messagepassword="Password minimum eight characters, at least one letter and one number"; 
       this.setState({passwordValidate:false})
    }
      
  alph=/[a-zA-Z]$/
      
        if(alph.test(username))
        {
        this.setState({nameValidate:true})
        
        this.setState.usernamemessage=""
      }
      else{
        errors.push("username")
        this.setState.usernamemessage="follow the format in placeholder"
        this.setState({nameValidate:false})
    }
    sem=/^[1-8]{1}\b/
      
    if(sem.test(semester))
    {
    this.setState({nameValidate:true})
    
    this.setState.semval=""
  }
  else{
    errors.push("semester")
    this.setState.semval="Semester value shall only exist between 1-8"
    
}
console.log(!errors.length,user_err)
if (!errors.length){

  registerfromapi();

}

    this.setState({ errors, loading: false });


  }

  
  

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      
      <KeyboardAvoidingView style={styles.signup} >
      
        <Block padding={[18, theme.sizes.base * 2]} style={styles.Container}>
          <Text h1 bold>
            Sign Up
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Block middle padding={[30, 0]}>
            <Input
              registration
              placeholder="FA00-BCS-000@cuilahore.edu.pk"
              label="University email address"
              error={hasErrors("registration")}
              style={[styles.input, hasErrors("registration")]}
              defaultValue={this.state.registration}
              onChangeText={text => this.setState({ registration: text })}
            />
            <Text caption gray2>{this.setState.emailmessage}</Text>

            <Input
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              placeholder="username"
              onChangeText={text => this.setState( {username:text})}
            />
            <Text caption gray2>{this.setState.usernamemessage}</Text>
            <Input
              secure
              name="passwords"
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Text caption gray2>{this.setState.messagepassword}</Text>
     
            <Input
           
              name="confirmPassword"
              label="Confirm Password"
              error={hasErrors("confirmPassword")}
              style={[styles.input, hasErrors("confirmPassword")]}
              defaultValue={this.state.confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text })}
            /><Text caption gray2>{this.setState.cpm}</Text>
           
            <Input
            label="Semester"
            error={hasErrors("semester")}
            keyboardType="phone-pad"
            maxlength="1"
            style={[styles.input, hasErrors("semester")]}
            defaultValue={this.state.semester}
            onChangeText={text => this.setState({ semester: text })}
          />
          <Text caption gray2>{this.setState.semval}</Text>
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
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
          </ScrollView>
        </Block>
        
      </KeyboardAvoidingView>
    
      
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#f5f5f5"
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