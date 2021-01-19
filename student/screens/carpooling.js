import MapView, { Polyline, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,TextInput,AsyncStorage,
  ScrollView,Linking,
  TouchableOpacity,View, KeyboardAvoidingView,TouchableWithoutFeedback,
} from "react-native";
import { Button, Block, Text,Cardcar ,Input} from "../components";
import { theme } from "../constants";
import * as Icon from "@expo/vector-icons";

export default class carpooling extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
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
     latitude: 31.5204,
     longitude: 74.3587,
     error: null,
     routeCoordinates: [],
     distanceTravelled: 0,  
    valueprevLatLng: {},
    destination:"",
    pick:"Pick up point: COMSATS",
    drop:"Enter drop off location",
    latitude2:31.5204,
    showTerms:false,
    longitude2:74.3587,
    location:"Your Current Location"
    };
   }

   
   

  
   componentDidMount() {
    let user = AsyncStorage.getItem('token');
    console.log(user,".......")
    //console.log(this.props.navigation.state.params.lat,">>>>")
    navigator.geolocation.getCurrentPosition(
    position => {
   const { latitude, longitude } = position.coords;
   const { routeCoordinates,distanceTravelled  } = this.state;
   const newCoordinate = {
    latitude,
    longitude
   };
   this.setState({
    latitude,
    longitude,
    routeCoordinates: routeCoordinates.concat([newCoordinate]),
   
   });
   
},
    error => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
     );

     navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const { routeCoordinates } = this.state;
        const newCoordinate = {  latitude,  longitude  };
        this.setState({
         latitude,
         longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate])
        });
      },
      error => console.log(error),
      { 
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }

      
     );

     
   }
   getMapRegion = () => ({
     
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
   });
   getMapRegion1 = () => ({
    latitude: parseFloat(this.props.navigation.state.params&&this.props.navigation.state.params.lat?this.props.navigation.state.params.lat: this.state.latitude),
    longitude: parseFloat(this.props.navigation.state.params&&this.props.navigation.state.params.long?this.props.navigation.state.params.long: this.state.longitude),
    latitudeDelta: 0.0091,
    longitudeDelta: 0.009
   });



   handleRider(){
 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + user
    );
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"pickup":"new muslim town","destination":this.props.navigation.state.params.locName,"des_long":this.props.navigation.state.params.long,"des_lat":this.props.navigation.state.params.lat,"pic_long":this.state.longitude,"pic_lat":this.state.latitude});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://192.168.0.14:5000/auth/add_rider", requestOptions)
      .then(response => response.json()
    )
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      this.setState({showTerms:true}) 
  }    

async onChangeDestination(destination){
  const api_key="AIzaSyDh0WSUUvpcSzv59oWTVlb15023KEXMxDU"
  this.setState({destination});
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input={${destination}}&location=${
      this.state.latitude},${this.state.longitude}&radius=2000`;
}
  
openGps = () => {
  var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  var url = scheme 
  Linking.openURL(url);
}
  render() {
    const Dropoff = {
     latitude:  this.props.navigation.state.params?parseFloat(this.props.navigation.state.params.lat):this.state.latitude,
      longitude:this.props.navigation.state.params?parseFloat(this.props.navigation.state.params.long):this.state.longitude,
    };
    const current = {
      latitude:this.state.latitude,
      longitude: this.state.longitude
    };
    var x=this.state.latitude.toString()
    var y=this.state.longitude.toString()
    const {navigation} = this.props;
    if(this.state.showTerms){
      return (<View style={{elevation:10, shadowColor:"black",backgroundColor:"#e6f9ff",
      shadowOffset:{width:0,height:2},
      shadowRadius:6,marginVertical:"8%",
      shadowOpacity:0.9,}}>
    <Text caption style={{fontSize:18,fontFamily:"OpenSans-Bold",textAlign:"center",justifyContent:"center",marginBottom:"10%"}}>Driver Will contact you soon,Please Wait</Text>
    <View style={{marginHorizontal:"30%"}}>
    <Button gradient onPress={() => {this.setState({showTerms:false})}}>
            <Text center semibold white>
              CANCEL RIDE
            </Text>
          </Button></View>
    </View>)}
    return (
      <View style={styles.container}>
      <MapView
         provider={PROVIDER_GOOGLE}
         style={{ ...StyleSheet.absoluteFillObject }}
         region={this.getMapRegion()}>
         <Polyline coordinates={[current,Dropoff]} strokeWidth={3} />
         <Marker coordinate={this.getMapRegion()} />
          <Marker coordinate={this.getMapRegion1()}/>
         </MapView>

         <Block >
        
        <TextInput style={styles.dest} placeholder="Enter pickup point" value={this.state.location}></TextInput>
        <TouchableOpacity style={styles.dest,{...styles.dest,flexDirection:"row",alignItems:"center"}} onPress={()=>{this.props.navigation.navigate("RiderDestinationFiltering")}}>
        
        <Text style={{fontSize:15,color:"gray"}}>{this.props.navigation.state.params?this.props.navigation.state.params.locName:this.state.drop}</Text>
        </TouchableOpacity>
        <Block center bottom><Button  onPress={() => this.handleRider(this.props.navigation)} style={styles.button} gradient>
        <Text center semibold white> Find Ride </Text></Button>
        </Block>
    
        </Block>
   </View>
    );
  }
}

const styles = StyleSheet.create({
 
  container:{
        flex:1,
        
      },
      categories: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        
      },button:{width:150},
      dest:{ backgroundColor:theme.colors.gray2,height:40,borderWidth:0.5, marginLeft:5,marginRight:5 ,
        marginTop:10, backgroundColor:"white" , width:"95%", padding:6, bottom:0,color:"gray"}
});