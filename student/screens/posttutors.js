import React, { Component, Profiler } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TextInput,TouchableOpacity,
  KeyboardAvoidingView,Alert

} from "react-native";
import * as Icon from "@expo/vector-icons";
import { Button, Block, Text,Divider,Input } from "../components";
import { theme,mocks } from "../constants";

import Setings from "./Setings"

class posttutors extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  async handletut(){
    let user = await AsyncStorage.getItem('token');
  }
  state = {
    
    selectedcat: "BBA",
    selectedcat1:"",
    Department: [
      {
        loc: "BBA"
      },
      {
       loc:"Computer Science"
      },
      {
        loc: "Architecture"
      },
      {
        loc: "Physics"
      },
      {
        loc: "Mathematics"
      },
    ],
  
    profile: {},
    loading: false,
    errors:[],
      tutor:null,
      email:null,
      name:null,
      emailValidate:false
  };
  _onPressButtonpost1() {
    const { tutor,email,name} = this.state;
    const errors = [];
 if (!tutor) errors.push("tutor")
 if(!email) errors.push("email")
 if(!name) errors.push("name")


this.setState({ errors, loading:false });





 em=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      
        if(em.test(email))
        {
        this.setState({emailValidate:true}) 
      }
      else{
        errors.push("email")
    }

      if (!errors.length) {
        fetch('http://192.168.0.14:5000/auth/post_tutor', {
        method: 'POST',
        headers: { Accept: 'application/json',
         'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user },
        body: JSON.stringify({ 'name' : name,
          'email': this.state.email, 'department': this.state.selectedcat,
        'description': this.state.tutor }),
      })
      .then((response) => response.json())

        Alert.alert(
          "",
          "Ad posted",
          [
            {
              text: "OK",
              onPress: () =>  this.props.navigation.navigate('Tutors'),
              
            }
            

          ],
        );
      }
     else {
        Alert.alert("",'Please fill in the correct details to proceed');
    }

  }
  

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  } //for giving raw values

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  async onValueChangeCat1(value) {
    this.setState({ selectedcat1: value });
  }

  render() {
    const { profile,navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrorst = key => (errors.includes(key) ? styles.hasErrorst: null);

    return (
      <Block style={styles.Container} flex={1}>  
      <Block center style={{ marginTop:0, marginBottom:105}}>
      <Button style={styles.buttonh} gradient onPress={() => navigation.navigate("mytutorpost")}>
      <Text center semibold white>
        My Posts</Text>
    </Button>
      
       <Text h1 bold style={{ marginTop:5, 
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth}}>
            Post as a Tutor!
          </Text>
         
            </Block>
           <ScrollView>
           <Block margin={[0, 50]}>
              
            
              <Input 
                label="Name"
                error={hasErrorst("name")}
                style={[styles.input1, hasErrorst("name")]}
                defaultValue={this.state.name}
                placeholder="Your name"
                onChangeText={text => this.setState({ name: text })}
              />

              <Input
               label="Email"
               placeholder="abc@example.com"
               style={[styles.input1, hasErrorst("email")]}
                error={hasErrorst("email")}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              



                <Block center row margin={[10, 0]} style={{marginTop:10}}>
                  <Block style={{ marginBottom: 3,color:"gray" }}>
                    <Text  style={{ color:"gray" }}>
                     Department
                    </Text>
                    <View styles={styles.viewStyle}>
           
            <View style={{  fontSize: 14 }}>
              <Picker
                itemStyle={styles.itemStyle}
                mode="dropdown"
                style={styles.pickerStyle}
                selectedValue={this.state.selectedcat}
                onValueChange={this.onValueChangeCat.bind(this)}
              >
                {this.state.Department.map((loca, i8) => (
                  <Picker.Item key={i8}
                    color="#b22222"
                    label={loca.loc}
                    value={loca.loc}
                    index={i8}
                  />
                ))}
              </Picker>
            </View>
          </View>
                  </Block>
                </Block>
    




              
          
              <KeyboardAvoidingView style={{flex:1}} enabledKeyboardOffset={30}>
              <Block style={styles.Container}>
              <ScrollView contentContainerStyle={{alignItems:"center"}}>
              
              <View style={styles.formcontainer}>
         
    
              <Input
              tutor
              label="Share important details for students."
              error={hasErrorst("tutor")}
              style={[styles.input, hasErrorst("tutor")]}
              defaultValue={this.state.tutor}
              onChangeText={text => this.setState({ tutor: text })}
            />
              

             
              </View>
              
              </ScrollView>
              </Block>
              </KeyboardAvoidingView>

                    
              </Block>
               
              <Block center bottom flex={0.5} margin={[10, theme.sizes.padding * 1]}>
              <Button style={styles.button} gradient onPress= {() => this._onPressButtonpost1(this.props.navigation)} >
                <Text center semibold white>
                 Submit
                </Text>
              </Button>
            </Block>
        

              </ScrollView>
  <Setings  navigation={this.props.navigation} style4={{backgroundColor:"blue"}}/>
              </Block>
  
        

      
    );
  }
}

posttutors.defaultProps = {
    profile: mocks.profile
  };

export default posttutors;

const styles = StyleSheet.create({
   Container: 
   {
      backgroundColor:"#f5f5f5"
    },
    formcontainer:
    {
      width:"100%",
      marginTop:5,
      
   },
   hasErrorst: {
    borderBottomColor: theme.colors.accent
  },
   input1:
    {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color:"#b22222",
    backgroundColor:"#f5f5f5"
  },
  hasErrorst: {
    borderBottomColor: theme.colors.accent
  },
    input:
    {
      paddingHorizontal:3,
      paddingVertical:3,
      backgroundColor:"#f5f5f5",
      height:50,
      fontSize:14,
      borderColor:"gray",
      borderWidth:2,
      marginVertical:3,
      color:"white",
      marginTop:7,
      marginLeft:0,
      color:"black"
  },
   
    button:
    {
        width:70
    },
    buttonh:
    {
        width:390
    },
 
    Container:
    {
      backgroundColor:"#f5f5f5"
    },
    text:
    {
      justifyContent: "center"
    }
  });
