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
    latitude2:31.430204,
    longitude2:74.3587
    };
   }

   

   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
     const { latitude, longitude } = position.coords;
    // const { routeCoordinates,distanceTravelled  } = this.state;
     const newCoordinate = {
      latitude,
      longitude
     };
     this.setState({
      latitude,
      longitude,
     // routeCoordinates: routeCoordinates.concat([newCoordinate]),
     
     });
  },
    error => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
     );

    //  navigator.geolocation.watchPosition(
    //   position => {
    //    //  latitude = this.props.navigation.state.params&&this.props.navigation.state.params.location.latitude?this.props.navigation.state.params.location.latitude: this.state.latitude;
    //    // longitude = this.props.navigation.state.params&&this.props.navigation.state.params.location.longitude?this.props.navigation.state.params.location.longitude:this.state.longitude,
    //     // routeCoordinates = this.state;
    //   //  const newCoordinate = {  latitude,  longitude  };
    //     //this.setState({
    //     // latitude,
    //      //longitude,
    //      // routeCoordinates: routeCoordinates.concat([newCoordinate])
    //     });
     // },
      error => console.log(error),
      { 
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }

      
     //);

     
   }
   getMapRegion = () => ({
    
    latitude:parseFloat(this.props.navigation.state.params&&this.props.navigation.state.params.lat?this.props.navigation.state.params.lat: this.state.latitude),
    longitude:parseFloat(this.props.navigation.state.params&&this.props.navigation.state.params.long?this.props.navigation.state.params.long:this.state.longitude),
    latitudeDelta: 0.009,
   
    longitudeDelta: 0.009
   });
   getMapRegion1 = () => ({
    latitude: this.state.latitude,
    longitude:this.state.longitude,
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
 
   const User = {
      latitude:  parseFloat(this.props.navigation.state.params.lat),
      longitude:parseFloat(this.props.navigation.state.params.long),
    };
    const Driver = {
      latitude:this.state.latitude,
      longitude: this.state.longitude
    };
console.log(this.props.navigation.state.params,"latttt")
    
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
      <MapView
         provider={PROVIDER_GOOGLE}
         style={{ ...StyleSheet.absoluteFillObject }}
         region={this.getMapRegion1()}>
        <Polyline coordinates={[User, Driver]} strokeWidth={5} />
         <Marker coordinate={this.getMapRegion()} pinColor="blue" />
    <Marker  coordinate={this.getMapRegion1()} pinColor="green" title="Rider"/>
         </MapView>
     
         <View style={{flex:1}}>
         <Text style={styles.dest}>Your Current Location</Text>
        <Text style={styles.dest}>{this.props.navigation.state.params.locName}</Text>
    
        <View style={{flexDirection:"row",justifyContent:"space-around",flex:0.9,marginTop:"100%"}}>
        <Button style={styles.button} gradient>
        <Text center semibold white> Start Ride </Text></Button>
        <Button  onPress={() => navigation.navigate("DriverRide")} style={styles.button} gradient>
        <Text center semibold white>Back</Text></Button>
        </View>
    
        </View>
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
      dest:{ backgroundColor:theme.colors.gray2,height:40,borderWidth:0.5,
        marginTop:10, backgroundColor:"white" , width:"95%", padding:6, bottom:0,marginHorizontal:"2%"}
});