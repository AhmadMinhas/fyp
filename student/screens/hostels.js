import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  Alert
  ,Image,
  TouchableOpacity,Dimensions
} from "react-native";
import axios from "react-native-axios"
import Setings from "./Setings"


import * as Icon from "@expo/vector-icons";
import {ImageBrowser} from '../components';

import { Button, Block, Text,Input } from "../components";
import { theme, mocks } from "../constants";

const height = Dimensions.get('window').height;
const { width } = Dimensions.get('window')
class hostelview extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
    title:"Hostel's Ad",
        headerRight: (
    
          <TouchableOpacity style={{  backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };



  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      Room:[
        {
          loc: "1"
        },
        {
         loc:"2"
        },
        {
          loc: "3"
        },
        {
          loc: "4"
        },
        {
          loc: "5"
        },
        {
          loc: "6"
        },
        {
          loc: "7"
        },
  
      ],
      selectedcat1:"3",
    
      address: null, 
      phonenum:null,
      phoneval:"",
      phonevalue:"",
      text:"",
      errors: [],
    }
  }

imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }


  renderImage(item, i) {
    //this.setState({photos:item})
    return(
      
      <Image 
     
        source={{uri: item.file}}
        key={i}
        style={styles.image}
      />
      
    )
  }
 


  async handlehos(){
    let user = await AsyncStorage.getItem('token');
    return user
  }
  
  _onPressButtonpost1() {
    const { address,phonenum,photos } = this.state;
    const errors = [];

    if (!address)errors.push("address");
    if (!phonenum) errors.push("phonenum"); 


    phoner=/^03[0-9]\d{8}$|^[0-9]\d{8}$/
    if(phoner.test(phonenum))
    {
    this.setState.phoneval=""
  }
  else{
    errors.push("phonenum")
    this.setState.phoneval="phone number shall contain 11 digits"
    
}

    this.setState({ errors, loading: false });

    if (!errors.length){
         const formData = new FormData();
         formData.append("rooms", this.state.selectedcat1);
      formData.append("contact", phonenum);
      formData.append("address", address);
      console.log(formData,"formmm")
         formData.append("imagefile1", {
          uri:  photos[0].uri,
         type: 'image/jpeg', 
         name: 'photo.jpeg',
       });
       formData.append("imagefile2", {
        uri:  photos[1].uri,
       type: 'image/jpeg', 
       name: 'photo.jpeg',
     });
     formData.append("imagefile3", {
      uri:  photos[2].uri,
     type: 'image/jpeg', 
     name: 'photo.jpeg',
   });
   formData.append("imagefile4", {
    uri:  photos[3].uri,
   type: 'image/jpeg', 
   name: 'photo.jpeg',
 });
     
     
     
     


       console.log(formData,"oooooo")
axios({
url    : 'http://192.168.0.14:5000/auth/post_ads',
method : 'POST',
data   : formData,
headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',
         'Authorization': 'Bearer ' + user
     }
 })
 .then(function (response) {
         console.log("response :", response);
})
.catch(function (error) {
         console.log("error from image :");
})
Alert.alert(
  "",
  "Ad posted",
  [
    {
      text: "OK",
      onPress: () =>  this.props.navigation.navigate('viewadshostel'),
      
    }
    

  ],
);

       
    }
      else {
        Alert.alert("",'Please fill in the details correctly, thanks');
    }}
  async onValueChangeCat1(value) 
  {
    this.setState({ selectedcat1: value });
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrorsh = key => (errors.includes(key) ? styles.hasErrorsh : null);

 if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={4} callback={this.imageBrowserCallback}/>);
    }
    return (
      <Block style={styles.Container} flex={1}>  
     <View style={{ marginTop:0,elevation:10, shadowColor:"black",backgroundColor:"#e6f9ff",
     shadowOffset:{width:0,height:2},
     shadowRadius:6,marginVertical:"2%",
     shadowOpacity:0.9,alignItems:"center",}}>
       <Text h1 bold style={{paddingVertical:"2%"}}>
            Help others by posting details!
          </Text>
            </View>
           
           
           <ScrollView style={{marginTop:height/24}}>
              <Block margin={[0, 50]}>
               
                <Block center row margin={[0, 0]}>
                  <Block margin={[0,0]}>
                    <Text  style={{ marginBottom: 5,color:"gray" }}>
                      Vacant Rooms
                    </Text>
                    
                   <View    style = {{backgroundColor : '#e6f5ff',
             height:40,
              width: 100,
              borderWidth:2,
              borderRadius:5,
              borderColor:"gray"}}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.selectedcat1}
                        onValueChange={this.onValueChangeCat1.bind(this)}
                      >
                        {this.state.Room.map((loca1, i5) => (
                          <Picker.Item key={i5}
                            color="#000066"
                            label={loca1.loc}
                            value={loca1.loc}
                            index={i5} />
                        ))}
                      </Picker>
                    </View>
                  </Block>
                 
                </Block>


                <Block  margin={[10, 0]}>
              <KeyboardAvoidingView style={{flex:1}} enabledKeyboardOffset={30}>
              <Block style={styles.Container}>
              <ScrollView contentContainerStyle={{alignItems:"center"}}>
              
              <View style={styles.formcontainer}>
              <Input
              address
              label="Address"
              error={hasErrorsh("address")}
              style={[styles.input, hasErrorsh("address")]} 
              placeholder="123-A Block, XYZ Town,Lahore" 
              returnKeyType="next" 
              onChangeText={text => this.setState({address: text })} 
              />
              
              <Input
              phonenum
              label="Contact Information"
              error={hasErrorsh("phonenum")}
              style={[styles.input, hasErrorsh("phonenum")]}
               defaultValue={this.state.phonenum}
              onChangeText={text => this.setState({phonenum: text })} 
              returnKeyType="next" placeholder="03XXXXXXXXX" 
              keyboardType="phone-pad" 
              />
             
        <Text caption gray2>{this.setState.phoneval}</Text>
              
             </View>
              
              </ScrollView>
              </Block>
              </KeyboardAvoidingView>
              </Block>
              </Block>
               

              <View>
              <TouchableOpacity  onPress={() => this.setState({imageBrowserOpen: true})}>
              <Block flex={false} row style={{justifyContent:"center",}} >
              <Icon.MaterialIcons style={{marginRight:"3%"}} name="image" size={30} color="blue" />
              <Text h2 center style={{color:"blue"}}>
                Choose Photos
              </Text>
          </Block>
            </TouchableOpacity>   
            <Text h4 center style={{color:"blue"}}>{this.setState.filemessage}</Text>
            
            <Block row margin={[theme.sizes.padding * 0.5, 40]} style={styles.tag}>
              <ScrollView   horizontal={true}>
              {this.state.photos.map((item,i) => this.renderImage(item,i))}
              {console.log(this.state.photos,"plissss")}
              </ScrollView>
               </Block>
            </View>
       <Block center bottom  style={{marginTop:height/20}}>
              <Button style={styles.button} gradient onPress= {() => this._onPressButtonpost1(this.props.navigation)}>
                <Text center semibold white>
                 Post Ad
                </Text>
              </Button>
            </Block>
              </ScrollView>
              
              <Setings navigation={this.props.navigation} style2={{backgroundColor:"blue"}}/>
        
      </Block>
      
    );
  }
}



export default hostelview;

const styles = StyleSheet.create({
   Container: {
      backgroundColor:"#e6e6ff"
    },

    formcontainer:{
      width:"100%",
      
      
   },
   more: {
    width: 55,
    height: 55
  },
   sp:{marginLeft:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    

    marginVertical: 3,
    
   },
   image: {
    width: width / 2.4,
    height: width / 2.4,
    marginRight: theme.sizes.base,
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
   
  },
   tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
   
    flexDirection: 'row',
  },
    input:{
      paddingHorizontal:2,
      paddingVertical:5,
      backgroundColor:"#e6f9ff",
      height:40,
      fontSize:14,
      borderColor:"black",
      borderStartWidth:2,
      marginVertical:5,
      color:"white",
      marginBottom: 25
  },
    button:{width:130},
    buttonh:{width:390, position:"absolute"},
    Container:{
      backgroundColor:"#e6f9ff"
    },
    text:{
      justifyContent: "center"
    },
    input:{
      paddingHorizontal:3,
      paddingVertical:2,
      backgroundColor:"#e6f9ff",
      height:50,
      fontSize:14,
      borderColor:"gray",
      borderWidth:2,
      marginVertical:2,
      color:"white",
      marginTop:7,
      marginLeft:0,
      color:"black",
      marginBottom:15
     
  },
  hasErrorsh: {
    borderBottomColor: theme.colors.accent},
    phone:{
       paddingHorizontal:2,
       paddingVertical:5,
       backgroundColor:"gray",
       fontSize:22,
       borderColor:"black",
       borderStartWidth:2,
       marginVertical:5
          },
  });
