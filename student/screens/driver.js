import MapView, { Polyline, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,TextInput,
  ScrollView,
  TouchableOpacity,View, KeyboardAvoidingView
} from "react-native";
import { Button, Block, Text,Cardcar ,Input} from "../components";
import { theme } from "../constants";
import * as Icon from "@expo/vector-icons";

export default class carpooling extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
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
    latitude2:31.430204,
    longitude2:74.3587
    };
   }

   

   componentDidMount() {
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
    latitude: this.state.latitude2,
    longitude: this.state.longitude2,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
   });

async onChangeDestination(destination){
  const api_key="AIzaSyDh0WSUUvpcSzv59oWTVlb15023KEXMxDU"
  this.setState({destination});
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input={${destination}}&location=${
      this.state.latitude},${this.state.longitude}&radius=2000`;
}
  
   
  render() {
    var x=this.state.latitude.toString()
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
      <MapView
         provider={PROVIDER_GOOGLE}
         style={{ ...StyleSheet.absoluteFillObject }}
         region={this.getMapRegion()}>
         <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
         <Marker coordinate={this.getMapRegion()} />
          <Marker coordinate={this.getMapRegion1()}/>
         </MapView>
     
         <Block >
        
        <TextInput style={styles.dest} placeholder="Enter pickup point" value={x}></TextInput>
        <TextInput style={styles.dest} placeholder= "Enter Drop off point" value={this.state.destination} onChangeText={destination=>this.onChangeDestination(destination)}></TextInput>
        <Block center bottom><Button  onPress={() => navigation.navigate("DriverRide")} style={styles.button} gradient>
        <Text center semibold white> Add Ride </Text></Button>
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
        marginTop:10, backgroundColor:"white" , width:"95%", padding:6, bottom:0}
});
