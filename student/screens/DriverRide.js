import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  Alert,Modal,TouchableWithoutFeedback
  ,Image,
  TouchableOpacity,Dimensions
} from "react-native";
import Setings from "./Setings"
import call from "react-native-phone-call"


import * as Icon from "@expo/vector-icons";
import {ImageBrowser} from '../components';

import { Button, Block, Text,Input,Cardcar } from "../components";
import { theme, mocks } from "../constants";

const height = Dimensions.get('window').height;
const { width } = Dimensions.get('window')
class DriverRide extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
    title:"Add Ride",
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

      //photos: [],
      Vehicle:[
        {
          loc: "Car"
        },
        {
         loc:"Bike"
        },
      ],
      Dropoff:[
        {
          loc: "University"
        },
        {
         loc:"Home"
        },
      ],
      selectedcat1:"car",
      selected:"University",
      categories: [],
      //address: null, 
      phonenum:null,
      vehiclenum:null,
      phoneval:"",
      phonevalue:"",
      text:"",
      errors: [],
      showmodal:false,data:[]
    }
  }

  componentDidMount() {
  
   this.setState({
   categories: this.props.categories 
   });}

 


  async handlehos(){
    let user = await AsyncStorage.getItem('token');
    return user
  }
  
  _onPressButtonpost1() {
    const { address,phonenum,selected,selectedcat1,vehiclenum } = this.state;
    const errors = [];

    //if (!address)errors.push("address");
    if (!phonenum||!selected||!selectedcat1||!vehiclenum) errors.push("phonenum","selected","selectedcat1","vehiclenum"); 




    phoner=/^03[0-9]\d{8}$|^[0-9]\d{8}$/
    if(phoner.test(phonenum))
    {
    this.setState.phoneval=""
  }
  else{
    errors.push("phonenum")
    this.setState.phoneval="phone number shall contain 11 digits"
    
}

    this.setState({ errors, loading: false, });

     if (!errors.length){
    //   fetch('http://192.168.0.14:5000/auth/post_ads', {
    //     method: 'POST',
    //     headers: { Accept: 'application/json',
    //      'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + user },
    //     body: JSON.stringify({ 'address' : address,
    //       'contact': phonenum, 'rooms': this.state.selectedcat1 }),
    //   })
    //   .then((response) => response.json())
    //   .then((json) =>{
    //     if(json.error === 0){
    //     Alert.alert(
    //       "",
    //       "Ad posted",
    //       [
    //         {
    //           text: "OK",
    //           onPress: () =>  this.props.navigation.navigate(''),
              
    //         }
            

    //       ],
    //     );
    //   }
    //   else {
    //     Alert.alert(
    //       "",
    //       "somthing went wrong",
    //       [
    //         {
    //           text: "OK",
    //           onPress: () =>  this.props.navigation.navigate(''),
              
    //         }
            

    //       ],
    //     );
    //   }
    //   })

    // }
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
      };
      
      fetch("http://192.168.0.14:5000/auth/all_riders_uni", requestOptions)
      .then((response) => response.json())
      .then(result =>this.setState({data : result}))
       .catch(error => console.log('error', error));
       
      
      
    this.setState({showmodal:true})

     }
       else {
       Alert.alert("",'Please fill in the details correctly, thanks');
     }
  }
  async onValueChangeCat1(value) 
  {
    this.setState({selectedcat1:value});
  }
  async onValueChange(value) 
  {
    this.setState({selected:value});
  }
  makeCall = (number) => {
    const args = {
        number: number, // String value with the number to call
        prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
   call(args).catch(console.error)
  }
  render() {
    const { navigation } = this.props;
    const { loading, errors,categories} = this.state;
    const hasErrorsh = key => (errors.includes(key) ? styles.hasErrorsh : null);

      if(this.state.showmodal){
       return (
         
         <Cardcar
         style={{ 
          backgroundColor:"#eff8fb",
          marginTop:"2%",
          marginHorizontal:"5%",
          flexGrow:0.95,width:"90%"
          }}
         animationType="slide"
       >
       <TouchableWithoutFeedback style={{backgroundColor:"#C5CCD6",borderTopLeftRadius:25,borderTopRightRadius:25, borderColor:"white"}} onPress={() => this.setState({ showmodal: false })}><Icon.AntDesign name="closecircleo" size={30} style={{marginLeft:"90%"}}/>
       </TouchableWithoutFeedback>
       <ScrollView><Block>
       {this.state.data.map((category) =>       
        {
          const reg=/^\d+$/
          if(reg.test(category.rider_id))
          { 

            
            return(
       <Cardcar key={category.id} style={{flex:0.6, backgroundColor:"white", marginTop:"5%"}}>
       <Block row style={{borderBottomWidth:StyleSheet.hairlineWidth,borderColor:theme.colors.gray, marginHorizontal:"3%",paddingBottom:"1%"}} >
       <Image style={styles.avatar} source={require('../assets/images/bok1.png')} />
      
         <Block row style={{justifyContent:"space-between", width:"75%",marginRight:"5%"}}> 
     
                    <Text bluish center h1 style={{fontFamily:"alpha_echo",marginVertical:"1%"}}>
                     @{category.username} 
                    </Text>
                    {/*<Text gray h1>{category.Price}</Text>*/}
          </Block> 
                  </Block>
  <View style={{marginTop:"2%"}}>
   <Text caption style={styles.text}>{"Pickup Location"}</Text>
       <Text style={{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:theme.colors.gray,marginHorizontal:"5%"}}>{category.pickup}</Text>
        <Text caption style={styles.text}>Drop-off Location</Text>
       <Text style={{borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:theme.colors.gray,marginHorizontal:"5%"}}>{category.destination}</Text>
       </View>  
       <Block row justifyContent="space-around">
       <Button style={{width: '38%', height: 50, backgroundColor: "green"}} onPress={()=> this.makeCall(category.email)}>
       <Block flex={false} row style={{justifyContent:"center"}}>
       <Icon.Ionicons style={{marginRight:"8%"}} size={20} name="md-call" color="white"/>
       <Text h4 center style={{color:"white"}}>Call</Text>
       </Block>
       </Button>
{console.log(category,"riderrr")}
       <Button style={{width: '38%', height: 50,backgroundColor:"blue"}} onPress={()=> {this.props.navigation.navigate('ViewLoc',{lat:category.pick_lat,long:category.pick_long,locName:category.pickup})}}>
       <Block flex={false} row style={{justifyContent:"center"}}>
       <Icon.Entypo style={{marginRight:"8%"}} size={20} name="location-pin" color="white"/>
       <Text h4 center style={{color:"white"}}>View Location</Text>
       </Block>
       </Button>

       
     </Block>
     <TouchableOpacity onPress={() =>{}}>
     <Icon.SimpleLineIcons name="arrow-down" size={18} color="#9DA3B4" style={{marginHorizontal:"46%",marginBottom:0,padding:0,justifyContent:"center",textAlign:"center"}}/>
     </TouchableOpacity>
     
       </Cardcar>
       )}
            else return <Text>No Ride Available</Text>
          })}
     </Block>
       </ScrollView>
           
         </Cardcar>
        
       );
       
     }

    return (
      <Block style={styles.Container} flex={1}>  
     <View style={{ marginTop:0,elevation:10, shadowColor:"black",backgroundColor:"#e6f9ff",
     shadowOffset:{width:0,height:2},
     shadowRadius:6,marginVertical:"2%",
     shadowOpacity:0.9,alignItems:"center",}}>
     <View style={styles.imageContainer}><Image fadeDuration={2000} source={require('../assets/d1.jpg')} style={styles.image}
     resizeMode="cover"
     /></View>
       <Text h1 bold style={{paddingVertical:"1%"}}>
            Welcome {"Username"}
          </Text>
            </View>
           
           
           <ScrollView style={{marginTop:height/24}}>
              <Block margin={[0, 10]}>
               
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                  
                    <Text  style={{ marginVertical:"3%",color:"gray",fontSize:25,fontFamily:"alpha_echo" }}>
                      Car Type
                    </Text>
                    
                   <View    style = {{backgroundColor : '#e6f5ff',
             height:40,
              width: 120,
              borderWidth:2,
              borderRadius:5,
              borderColor:"gray"}}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.selectedcat1}
                        onValueChange={this.onValueChangeCat1.bind(this)}
                      >
                        {this.state.Vehicle.map((loca1, i5) => (
                          <Picker.Item key={i5}
                            color="#000066"
                            label={loca1.loc}
                            value={loca1.loc}
                            index={i5} />
                        ))}
                      </Picker>
                    </View>
                
                 
                </View>

               
                <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:"5%"}}>
                  
                <Text  style={{ marginVertical:"3%",color:"gray",fontSize:25,fontFamily:"alpha_echo" }}>
                  Drop Off
                </Text>
                
               <View    style = {{backgroundColor : '#e6f5ff',
         height:40,
          width: 120,
          borderWidth:2,
          borderRadius:5,
          borderColor:"gray"}}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    {this.state.Dropoff.map((loca2, i6) => (
                      <Picker.Item key={i6}
                        color="#000066"
                        label={loca2.loc}
                        value={loca2.loc}
                        index={i6} />
                    ))}
                  </Picker>
                </View>
            
             
            </View>
                 
               


                
              <KeyboardAvoidingView style={{flex:1}} enabledKeyboardOffset={30}>
              
              <ScrollView contentContainerStyle={{alignItems:"center",marginHorizontal:"8%"}}>
              
              <View style={styles.formcontainer}>
              <Input
              phonenum
              label="Vehicle Number"
              error={hasErrorsh("vehiclenum")}
              placeholder="ABC-1234"
              style={[styles.input, hasErrorsh("vehiclenum")]}
               defaultValue={this.state.vehiclenum}
              onChangeText={text => this.setState({vehiclenum: text })} 
              returnKeyType="next" 
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
           
              </KeyboardAvoidingView>
              </Block>
           
               
       <Block center bottom  style={{marginTop:height/120}}>
              <Button style={styles.button} gradient onPress= {() => this._onPressButtonpost1(this.props.navigation)}>
                <Text center semibold white>
                Next
                </Text>
              </Button>
            </Block>
              </ScrollView>
              
              <Setings navigation={this.props.navigation} style3={{backgroundColor:"blue"}}/>
                
      </Block>
      
    );
  }
}


DriverRide.defaultProps = {
  categories: mocks.categories
};
export default DriverRide;

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
    width: width / 2.8,
    height: width / 2.8,
    marginRight: theme.sizes.base,
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.8,
   
  },
  avatar:{
    height: theme.sizes.base * 2,
    width: theme.sizes.base * 2,
    borderRadius: theme.sizes.radius*10,
    backgroundColor:"#f5f5f5",
    justifyContent:"center",
    marginRight:"3%"
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
      paddingHorizontal:10,
      paddingVertical:2,
      backgroundColor:"#e6f9ff",
      height:40,
      fontSize:14,
      borderColor:"black",
      borderStartWidth:2,
      marginVertical:2,
      color:"white",
      marginBottom: 0
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
      paddingHorizontal:10,
      paddingVertical:1,
      backgroundColor:"#e6f9ff",
      height:50,
      fontSize:14,
      borderColor:"gray",
      borderWidth:2,
      marginVertical:0,
      color:"white",
      marginTop:7,
      marginLeft:0,
      color:"black",
      marginBottom:0
     
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
          image:{
            width:"100%",
            height:"100%",
          
        },
        imageContainer:{
          //borderRadius:150,
          borderRadius:Dimensions.get('window').width*0.7/ 2,
          borderWidth:3,
          // width:300,
          // height:300,
         // marginLeft:Dimensions.get('window').width*0,
          width:Dimensions.get('window').width*0.3,
          height:Dimensions.get('window').width*0.3, //FOR MAKING IT SQUARE
          borderColor:"black",
          overflow:"hidden",justifyContent:"center",
          marginVertical:Dimensions.get('window').height / 150
      
        },
        modal: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
           backgroundColor: 'rgba(0,0,0,0.2)',
          //     height:"100%"
        },
      
        modalInner: {
          //flex: 1,
          //backgroundColor:"green",
          marginVertical: 0,
          //
          width: '90%',
          //     padding: "10%",
          //     paddingHorizontal:"6%",
          //     justifyContent: 'space-around',
          //    // alignItems: 'center',
          
          //     shadowColor: '#000',
          //     shadowOffset: {
          //       width: 0,
          //       height: 2,
          //     },
          //     shadowOpacity: 0.25,
          //     shadowRadius: 3.84,
          elevation: 5,
        },
  });